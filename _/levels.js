var levels;

levels = [
    {
        map: [
            [ "wall", "wall",  "wall",  "wall",   "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall" ],
            [ "wall", "wall",  "green", "green",  "green", "green", "wall",  "wall",  "wall",  "wall",  "wall",  "wall" ],
            [ "wall", "wall",  "green", "hero",   "green", "green", "wall",  "wall",  "green", "green", "green", "green" ],
            [ "wall", "wall",  "green",   "green",  "green", "green", "wall",  "wall",  "green", "green", "green", "wall" ],
            [ "wall", "wall",  "wall",  "wall",   "green", "wall",  "wall",  "wall",  "green", "green", "green", "wall" ],
            [ "wall", "key", "green", "wall",   "green", "green", "green", "green",  "green", "green", "green", "wall" ],
            [ "wall", "green", "green", "wall",   "green", "green", "green", "wall",  "wall",  "wall",  "wall",  "wall" ],
            [ "wall", "green", "green", "secret", "green", "green", "green","wall",  "wall",  "wall",  "wall",  "wall" ],
            [ "wall", "wall",  "wall",  "wall",   "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall" ]
        ],
        items: [
            {
                id: 1,
                type: "book",
                info: " a book",
                classname: "book",
                pos: {
                    row: 1,
                    col: 5
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "book",
                    html: "<div class='columns'> \
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> \
                            <p><img src='_/img/figures/figure1-1.png' alt=''></p> \
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> \
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\
                            <p><img src='_/img/figures/figure1-2.png' alt=''></p> \
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> \
                        </div>"
                },
                data: {

                },
                actions: {

                }
            },
            {
                id: 2,
                type: "puzzle",
                info: " a closed door",
                classname: "door",
                pos: {
                    row: 5,
                    col: 7
                },
                requires: [5],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "puzzle_01",
                    html: "<div class='display'>LOCKED</div> \
                            <div class='panel'><img src='_/img/dialogs/panel_01.png' alt=''></div> \
                            <div class='controls'> \
                            <div class='togglebutton' role='button' aria-pressed='false' tabindex='0' onkeydown='currentPuzzle.actions.toggleButton(event)'></div> \
                            <div class='togglebutton' role='button' aria-pressed='false' tabindex='0' onkeydown='currentPuzzle.actions.toggleButton(event)'></div> \
                            <div class='togglebutton' role='button' aria-pressed='false' tabindex='0' onkeydown='currentPuzzle.actions.toggleButton(event)'></div> \
                            <div class='togglebutton' role='button' aria-pressed='false' tabindex='0' onkeydown='currentPuzzle.actions.toggleButton(event)'></div> \
                        </div>"
                },
                data: {
                    current: 0,
                    sequence: [2,0,1,3],
                    selected: []
                },
                actions: {
                    onReady: function($dlg) {
                        setTimeout( function() { $dlg.find("[tabindex=0]:visible:eq(0)").focus(); }, 300 );
                        $dlg.off("keydown").on("keydown", function(event) {
                            var $puzzle, $focusable, current;
                            $focusable = $dlg.find("[tabindex=0]");
                            current = currentPuzzle.data.current;
                            switch(event.keyCode) {
                                case 38: // up
                                    if (current > 0) {
                                        current--;
                                    } else {
                                        current = $focusable.length - 1;
                                    }
                                    break;
                                case 40: // down
                                    if (current < $focusable.length - 1) {
                                        current++;
                                    } else {
                                        current = 0;
                                    }
                                    break;
                                default:
                                    event.preventDefault();
                                    break;
                            }
                            currentPuzzle.data.current = current;
                            $focusable.eq(current).focus();
                        });
                    },
                    toggleButton: function (event) {
                        var $puzzle, $btn, ind;
                        switch (event.keyCode) {
                            case 13:
                            case 32:
                                $btn = $(event.currentTarget).attr({
                                    "aria-pressed": true,
                                    "disabled": "disabled"
                                });
                                $puzzle = $btn.parents('.puzzle_01');
                                ind = $puzzle.find(".togglebutton").index($btn);
                                currentPuzzle.data.selected.push(ind);
                                currentPuzzle.actions.validatePuzzle($puzzle);
                                break;
                        }
                    },
                    validatePuzzle: function($puzzle) {
                        var $buttons, $display;
                        $buttons = $puzzle.find(".togglebutton");
                        $display = $puzzle.find(".display");
                        if ($buttons.filter("div[aria-pressed='false']").length == 0) {
                            if (currentPuzzle.data.selected.toString() == currentPuzzle.data.sequence.toString()) {
                                $display.addClass("unlocked").html("UNLOCKED");
                                $buttons.attr({
                                    "aria-pressed": false
                                });
                                nextTile.data.solved = true;
                                nextTile.toggleClass("door green");
                            } else {
                                $display.addClass("blinking").html("ERROR").on("animationend", function(e) {
                                    $(this).removeClass("blinking").html("LOCKED");
                                });
                                currentPuzzle.data.selected = [];
                                $buttons.attr({
                                    "aria-pressed": false
                                }).removeAttr("disabled");
                            }
                        }
                    }
                }
            },
            {
                id: 3,
                type: "item",
                info: " a key",
                classname: "key",
                pos: {
                    row: 5,
                    col: 1
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "",
                    html: ""
                },
                data: {

                },
                actions: {

                }
            },
            {
                id: 4,
                type: "puzzle",
                info: " a chest",
                classname: "chest",
                pos: {
                    row: 3,
                    col: 2
                },
                requires: [3],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "chest",
                    html: "<img class='panel_01' src='_/img/dialogs/panel_01.png' alt='an engraved panel' tabindex='0' \
                        onkeydown='currentPuzzle.actions.getPanel(event)''>"
                },
                actions: {
                    onReady: function($dlg) {
                        setTimeout( function() { $dlg.find("[tabindex=0]:visible:eq(0)").focus(); }, 300 );
                        $dlg.on("keydown", function(event) {
                            switch(event.keyCode) {
                                default:
                                    event.preventDefault();
                                    break;
                            }
                        });
                    },
                    getPanel: function(event) {
                        switch (event.keyCode) {
                            case 13:
                            case 32:
                                inventory.push( _.findWhere(levels[currentLevel].items, {id: 5}) );
                                updateInventory();
                                $(event.currentTarget).hide();
                                currentPuzzle.dialog.html = "";
                                break;
                        }
                    }
                }
            },
            {
                id: 5,
                type: "item",
                info: " an engraved panel",
                classname: "panel_01",
                pos: {},
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "",
                    html: ""
                },
                data: {},
                actions: {}
            },
            {
                id: 6,
                type: "exit",
                info: " the exit",
                classname: "exit",
                pos: {
                    row: 2,
                    col: 11
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "exit",
                    html: "<div > \
                            <h2>Congratulations!</h2>\
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget iaculis sem. Cras leo diam, ornare ut ornare nec, tempus nec ligula. Aenean sed diam non velit gravida efficitur. Nunc aliquam quam at ligula venenatis tristique. Quisque tincidunt in nisi pulvinar pellentesque. Praesent vel porta massa. Curabitur egestas et neque sed dapibus. Praesent condimentum mi ac ligula porttitor, non imperdiet urna semper. Etiam mi orci, finibus sed turpis eget, vehicula feugiat quam. Curabitur sollicitudin aliquam ligula, at porttitor mi efficitur vel.</p> \
                            <p>Integer aliquam augue nec tortor rhoncus, ultrices gravida tellus cursus. Donec elementum luctus purus quis auctor. Sed tristique dapibus eros, sit amet iaculis nibh mollis nec. Etiam efficitur aliquam felis, sit amet hendrerit metus tempor ut. Phasellus elementum posuere tellus vel luctus. Nunc ac cursus leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla id condimentum ligula. Phasellus quis ligula massa. Nullam fringilla orci libero, id ultrices urna consequat eu. Sed imperdiet eget felis sit amet aliquam. Vivamus ac arcu ac lectus pulvinar pulvinar id ut sapien.</p> \
                        </div> \
                        <div><button onkeydown='currentPuzzle.actions.gotoNextLevel(event)' tabindex='0'>Next Level</button></div>"
                },
                data: {},
                actions: {
                    onReady: function($dlg) {
                        setTimeout( function() { $dlg.find("[tabindex=0]:visible:eq(0)").focus(); }, 300 );
                    },
                    gotoNextLevel: function(event) {
                        switch (event.keyCode) {
                            case 13:
                            case 32:
                                currentLevel++;
                                buildMap(".map", levels[currentLevel]);
                                closeDialog();
                                logAction("you moved to the next level");
                                break;
                            default:
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                        }
                    }
                }
            },
            {
                id: 7,
                type: "item",
                info: " a pink gem stone",
                classname: "gem pink",
                pos: {
                    row: 7,
                    col: 6
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "",
                    html: ""
                },
                data: {},
                actions: {}
            },
            {
                id: 8,
                type: "item",
                info: " a blue gem stone",
                classname: "gem blue",
                pos: {
                    row: 5,
                    col: 2
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "",
                    html: ""
                },
                data: {},
                actions: {}
            },
            {
                id: 7,
                type: "item",
                info: " a yellow gem stone",
                classname: "gem yellow",
                pos: {
                    row: 2,
                    col: 8
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "",
                    html: ""
                },
                data: {},
                actions: {}
            }
        ]
    },
    {
        map: [
            ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "wall"],
            ["wall", "green", "hero", "green", "green", "green", "green", "green", "green", "green", "green", "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green"],
            ["wall", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "wall"],
            ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"]
        ],
        items: [
            {
                id: 1,
                type: "exit",
                info: " the exit",
                classname: "exit",
                pos: {
                    row: 6,
                    col: 11
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "exit",
                    html: "<div > \
                            <h2>Congratulations!</h2>\
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget iaculis sem. Cras leo diam, ornare ut ornare nec, tempus nec ligula. Aenean sed diam non velit gravida efficitur. Nunc aliquam quam at ligula venenatis tristique. Quisque tincidunt in nisi pulvinar pellentesque. Praesent vel porta massa. Curabitur egestas et neque sed dapibus. Praesent condimentum mi ac ligula porttitor, non imperdiet urna semper. Etiam mi orci, finibus sed turpis eget, vehicula feugiat quam. Curabitur sollicitudin aliquam ligula, at porttitor mi efficitur vel.</p> \
                            <p>Integer aliquam augue nec tortor rhoncus, ultrices gravida tellus cursus. Donec elementum luctus purus quis auctor. Sed tristique dapibus eros, sit amet iaculis nibh mollis nec. Etiam efficitur aliquam felis, sit amet hendrerit metus tempor ut. Phasellus elementum posuere tellus vel luctus. Nunc ac cursus leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla id condimentum ligula. Phasellus quis ligula massa. Nullam fringilla orci libero, id ultrices urna consequat eu. Sed imperdiet eget felis sit amet aliquam. Vivamus ac arcu ac lectus pulvinar pulvinar id ut sapien.</p> \
                        </div> \
                        <div><button>Next Level</button></div>"
                },
                data: {},
                actions: {
                    gotoNextLevel: function(event) {
                        switch (event.keyCode) {
                            case 13:
                            case 32:
                                currentLevel++;
                                buildMap(".map", levels[currentLevel]);
                                break;
                        }
                    }
                }
            }
        ]
    }
];
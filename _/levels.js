var levels;

levels = [
    {
        map: [
            ["wall", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "wall"],
            ["wall", "gem yellow", "wall", "green", "green", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
            ["wall", "wall", "wall", "green", "hero", "wall",  "green", "green", "green", "green", "green", "wall"],
            ["wall", "green", "wall",  "green", "green", "wall",  "green", "wall",  "wall",  "wall",  "green", "wall"],
            ["wall", "green", "wall", "green", "green", "wall",  "green", "wall",  "green", "green", "green", "wall"],
            ["wall", "gem blue", "wall", "green", "green", "wall",  "green", "wall",  "green", "wall",  "wall",  "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "wall",  "green", "green", "green", "green"],
            ["wall", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"]
        ],
        items: [
            {
                id: 1,
                type: "exit",
                info: " the exit",
                classname: "exit",
                pos: {
                    row: 7,
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
                            <p>Integer aliquam augue nec tortor rhoncus, ultrices gravida tellus cursus. Donec elementum luctus purus quis auctor. Sed tristique dapibus eros, sit amet iaculis nibh mollis nec. Etiam efficitur aliquam felis, sit amet hendrerit metus tempor ut. Phasellus elementum posuere tellus vel luctus. </p> \
                        </div> \
                        <div><button onkeydown='currentPuzzle.actions.gotoNextLevel(event)' tabindex='0'>Next Level</button></div>",
                    hint: ""
                },
                data: {},
                actions: {
                    onReady: function($dlg) {
                        setTimeout( function() {
                            $dlg.find("[tabindex=0]:visible:eq(0)").focus();
                            $dlg.off("keydown.game").on("keydown.game", function(event) {
                                switch(event.keyCode) {
                                    case 27: // escape
                                        event.preventDefault();
                                        event.stopPropagation();
                                        break;
                                }
                            });
                        }, 300 );
                        playSound("win", 1, 0);
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
                id: 2,
                type: "puzzle",
                info: " a closed door",
                classname: "door",
                pos: {
                    row: 7,
                    col: 9
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "puzzle_02",
                    html: "<p>This door must be cotrolled remotely...</p>",
                    hint: ""
                },
                data: {},
                actions: {
                    onReady: function($dlg) {
                        setTimeout( function() { $dlg.find("[tabindex=0]:visible:eq(0)").focus(); }, 300 );
                    }
                }
            },
            {
                id: 3,
                type: "switch",
                info: " a lever",
                classname: "lever off",
                pos: {
                    row: 1,
                    col: 10
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "",
                    html: "",
                    hint: ""
                },
                data: {
                    controls: 2,
                    off: true,
                    timer: 4000
                },
                actions: {
                    toggleSwitch: function($switch) {

                        if (!window.switchTimer) {

                            toggleState();

                            if( !$switch.data("data").off ) {
                                window.switchTimer = window.setTimeout( function() {
                                    toggleState();
                                    window.clearTimeout(window.switchTimer);
                                    window.switchTimer = null;
                                }, $switch.data("data").timer);
                            }
                        }

                        function toggleState() {
                            var door_tile, door_elem;

                            door_tile = _.findWhere(levels[currentLevel].items, {id: $switch.data("data").controls} );
                            door_elem = $('.map .row').eq(door_tile.pos.row).find('.tile').eq(door_tile.pos.col);

                           $switch.data("data").off = !$switch.data("data").off;
                            $switch.toggleClass("off", $switch.data("data").off);

                            if ( $switch.data("data").off ) {
                                door_elem.toggleClass("green door").addClass(" blink_three");
                            } else {
                                door_elem.toggleClass("green door").removeClass(" blink_three");
                            }
                        }

                    }

                }
            },
            {
                id: 4,
                type: "item",
                info: " a key",
                classname: "key",
                pos: {
                    row: 7,
                    col: 8
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "",
                    html: "",
                    hint: ""
                },
                data: {},
                actions: {}
            },
            {
                id: 5,
                type: "puzzle",
                info: " a chest",
                classname: "chest",
                pos: {
                    row: 5,
                    col: 3
                },
                requires: [4],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "chest",
                    html: "<div class='hint'></div> \
                            <img class='panel_01' src='_/img/dialogs/panel_01.png' alt='an engraved panel' tabindex='0' \
                        onkeydown='currentPuzzle.actions.getPanel(event)''>",
                    hint: "The chest is locked. You need a golden key to open it."
                },
                actions: {
                    onReady: function($dlg) {
                        setTimeout( function() { $dlg.find("[tabindex=0]:visible:eq(0)").focus(); }, 300 );
                        $dlg.off("keydown.game").on("keydown.game", function(event) {
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
                                inventory.push( _.findWhere(levels[currentLevel].items, {id: 8}) );
                                updateInventory();
                                playSound("getItem", .5, 0);
                                $(event.currentTarget).hide();
                                currentPuzzle.dialog.html = "";
                                break;
                        }
                    }
                }
            },
            {
                id: 6,
                type: "secret",
                info: " a secret",
                classname: "secret",
                pos: {
                    row: 4,
                    col: 1
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "",
                    html: "",
                    hint: ""
                },
                data: {
                    hidden: {
                        type: "item",
                        info: " a gem",
                        classname: "gem pink"
                    }
                },
                actions: {}
            },
            {
                id: 7,
                type: "secret",
                info: " a secret",
                classname: "secret",
                pos: {
                    row: 5,
                    col: 1
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "",
                    html: "",
                    hint: ""
                },
                data: {
                    hidden: {
                        type: "green",
                        info: "",
                        classname: "green"
                    }
                },
                actions: {}
            },
            {
                id: 8,
                type: "item",
                info: " an engraved panel",
                classname: "panel_01",
                pos: {},
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "",
                    html: "",
                    hint: ""
                },
                data: {},
                actions: {}
            }
        ]
    },
    {
        map: [
            [ "wall", "wall",  "wall",  "wall",   "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall" ],
            [ "wall", "wall",  "green", "green",  "green", "green", "wall",  "wall",  "wall",  "wall",  "wall",  "wall" ],
            [ "wall", "wall",  "green", "hero",   "green", "green", "wall",  "wall",  "green", "green", "green", "green" ],
            [ "wall", "wall",  "green", "green",  "green", "green", "wall",  "wall",  "green", "green", "green", "wall" ],
            [ "wall", "wall",  "wall",  "wall",   "green", "wall",  "wall",  "wall",  "green", "green", "green", "wall" ],
            [ "wall", "green", "green", "wall",   "green", "green", "green", "green", "green", "green", "green", "wall" ],
            [ "wall", "green", "green", "wall",   "green", "green", "green", "wall",  "wall",  "wall",  "wall",  "wall" ],
            [ "wall", "green", "green", "green",  "green", "green", "green", "wall",  "wall",  "wall",  "wall",  "wall" ],
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
                        </div>",
                    hint: ""
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
                    html: "<div class='hint'></div> \
                            <div class='display'>LOCKED</div> \
                            <div class='panel'><img src='_/img/dialogs/panel_01.png' alt=''></div> \
                            <div class='controls'> \
                            <div class='togglebutton' role='button' aria-pressed='false' tabindex='0' onkeydown='currentPuzzle.actions.toggleButton(event)'></div> \
                            <div class='togglebutton' role='button' aria-pressed='false' tabindex='0' onkeydown='currentPuzzle.actions.toggleButton(event)'></div> \
                            <div class='togglebutton' role='button' aria-pressed='false' tabindex='0' onkeydown='currentPuzzle.actions.toggleButton(event)'></div> \
                            <div class='togglebutton' role='button' aria-pressed='false' tabindex='0' onkeydown='currentPuzzle.actions.toggleButton(event)'></div> \
                        </div>",
                    hint: "The door is locked. You need to enter a key combination to open it."
                },
                data: {
                    current: 0,
                    sequence: [2,0,1,3],
                    selected: []
                },
                actions: {
                    onReady: function($dlg) {
                        setTimeout( function() { $dlg.find("[tabindex=0]:visible:eq(0)").focus(); }, 300 );
                        $dlg.off("keydown.game").on("keydown.game", function(event) {
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
                        var $puzzle, isEnabled, $btn, ind;
                        isEnabled = !$(event.currentTarget).prop("disabled") || true;
                        if ( !$(event.currentTarget).prop("disabled") ) {
                            switch (event.keyCode) {
                                case 13:
                                case 32:
                                    $btn = $(event.currentTarget).attr({ "aria-pressed": true }).prop({ "disabled": true });
                                    $puzzle = $btn.parents('.puzzle_01');
                                    ind = $puzzle.find(".togglebutton").index($btn);
                                    playSound("click", .5, 0);
                                    currentPuzzle.data.selected.push(ind);
                                    currentPuzzle.actions.validatePuzzle($puzzle);
                                    break;
                            }
                        }
                    },
                    validatePuzzle: function($puzzle) {
                        var $buttons, $display;
                        $buttons = $puzzle.find(".togglebutton");
                        $display = $puzzle.find(".display");
                        if ($buttons.filter("div[aria-pressed='false']").length == 0) {
                            if (currentPuzzle.data.selected.toString() == currentPuzzle.data.sequence.toString()) {
                                $display.addClass("unlocked").html("UNLOCKED");
                                $buttons.attr({ "aria-pressed": false });
                                nextTile.data.solved = true;
                                nextTile.toggleClass("door green");
                            } else {
                                $display.addClass("blinking").html("ERROR").on("animationend", function(e) {
                                    $(this).removeClass("blinking").html("LOCKED");
                                });
                                $buttons.attr({ "aria-pressed": false }).prop({ "disabled": false });
                                playSound("error", .5, 0);
                                currentPuzzle.data.selected = [];
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
                    row: 7,
                    col: 1
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "",
                    html: "",
                    hint: ""
                },
                data: {},
                actions: {}
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
                    html: "<div class='hint'></div> \
                            <img class='panel_01' src='_/img/dialogs/panel_01.png' alt='an engraved panel' tabindex='0' \
                        onkeydown='currentPuzzle.actions.getPanel(event)''>",
                    hint: "The chest is locked. You need a golden key to open it."
                },
                actions: {
                    onReady: function($dlg) {
                        setTimeout( function() { $dlg.find("[tabindex=0]:visible:eq(0)").focus(); }, 300 );
                        $dlg.off("keydown.game").on("keydown.game", function(event) {
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
                                playSound("getItem", .5, 0);
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
                    html: "",
                    hint: ""
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
                        <div><button onkeydown='currentPuzzle.actions.gotoNextLevel(event)' tabindex='0'>Next Level</button></div>",
                    hint: ""
                },
                data: {},
                actions: {
                    onReady: function($dlg) {
                        setTimeout( function() {
                                $dlg.find("[tabindex=0]:visible:eq(0)").focus();
                                $dlg.off("keydown.game").on("keydown.game", function(event) {
                                    switch(event.keyCode) {
                                        case 27: // escape
                                            event.preventDefault();
                                            event.stopPropagation();
                                            break;
                                    }
                                });
                            }, 300 );
                        playSound("win", 1, 0);
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
                    html: "",
                    hint: ""
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
                    html: "",
                    hint: ""
                },
                data: {},
                actions: {}
            },
            {
                id: 9,
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
                    html: "",
                    hint: ""
                },
                data: {},
                actions: {}
            },
            {
                id: 10,
                type: "secret",
                info: " a secret",
                classname: "secret",
                pos: {
                    row: 7,
                    col: 3
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "",
                    html: "",
                    hint: ""
                },
                data: {
                    hidden: {
                        type: "green",
                        info: "",
                        classname: "green"
                    }
                },
                actions: {}
            }
        ]
    }
];
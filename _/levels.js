var levels;

levels = [
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
                            <p><u>Monday, April 1</u></p>\
                            <p>Today the main water pipe burst. It was quickly fixed. However, because of the water damage, we had to rewire all buttons on the combination lock to the next room.</p>\
                            <p>I thought leaving the same combination would make it easier to remember:</p>  \
                            <p><img src='_/img/figures/figure1-2.png' alt=''></p> \
                            <p>Unfortunately, the labels don't match the buttons anymore! To avoid confusion, I had to draw lines with a marker to connect the buttons to the proper labels.</p> \
                            <p><u>Friday, April 19</u></p>\
                            <p>As it turns out, marker lines get easily erased, so I asked my colleague, Tom, to create a metal plate with the connecting lines permanently etched on it.</p>\
                            <p><img src='_/img/figures/figure1-1.png' alt=''></p> \
                            <p>The plate is detachable and can be stored away when not in use.</p>\
                            <p>I hope nobody will mix up the buttons anymore!</p>\
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
                                playSound("success", 1, 0);
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
                        onkeydown='currentPuzzle.actions.getItem(event)''>",
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
                    getItem: function(event) {
                        switch (event.keyCode) {
                            case 13:
                            case 32:
                            
                                if(!currentPuzzle.solved) {
	                                inventory.push( _.findWhere(levels[currentLevel].items, {id: 5}) );
	                                updateInventory();
	                                playSound("getItem", .5, 0);
	                                $(event.currentTarget).hide();
	                                currentPuzzle.dialog.html = "";
	                                currentPuzzle.solved = true;
	                                nextTile.addClass("open");
	                            }
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
                            <h2>LESSON 1: Ensure all controls and buttons are labelled</h2>\
                            <p>You just learned the importance of properly labelling interactive controls, like buttons. \
                                Please remember that simply placing some text or images next to them is not enough. \
                                People who use screen readers might not perceive the connection.</p>\
                            <p>To make those controls accessible, each one of them must be properly associated with a \
                                corresponding label. Since engraved metal plates don't work well on the Web, you'll need to \
                                learn special techniques to make those connections.</p> \ \
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
                        var newUrl;
                        switch (event.keyCode) {
                            case 13:
                            case 32:
                                currentLevel++;
                                document.title = "Accessibility Game, Level " + (currentLevel + 1);
                                buildMap(".map", levels[currentLevel]);
                                closeDialog();
                                inventory = [];
                                updateInventory();
                                logAction("you moved to the next level");
                                if (window.history.pushState) {
                                    urlParams.set("level", currentLevel + 1);
                                    newUrl = window.location.pathname + "?" + urlParams.toString();
                                    window.history.pushState({path: newUrl}, '', newUrl);
                                }
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
    },
    {
        map: [
            ["wall", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "wall"],
            ["hero", "green", "wall", "green", "wall", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
            ["wall", "wall", "wall", "green", "wall", "green",  "green", "green", "green", "green", "gem pink", "wall"],
            ["wall", "green", "wall",  "green", "wall", "wall",  "green", "wall",  "wall",  "wall",  "green", "wall"],
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
                            <h2>LESSON 2: Fast moving or self-updating content should be easily paused, or slowed down</h2>\
                            <p>Not everyone can interact with websites or devices at the same speed. Some people with cognitive disabilities, or mobility impairments \
                            might require more time to complete a task.</p> \
                            <p>It is important to always provide a way to slow down, or completely stop any moving or self-updating content on the Web. This would include auto-scrolling text, \
                            automated slide shows and carousels, audio and video content, etc.</p> \
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
                        var newUrl;
                        switch (event.keyCode) {
                            case 13:
                            case 32:
                                currentLevel++;
                                document.title = "Accessibility Game, Level " + (currentLevel + 1);
                                buildMap(".map", levels[currentLevel]);
                                closeDialog();
                                inventory = [];
                                updateInventory();
                                logAction("you moved to the next level");
                                if (window.history.pushState) {
                                    urlParams.set("level", currentLevel + 1);
                                    newUrl = window.location.pathname + "?" + urlParams.toString();
                                    window.history.pushState({path: newUrl}, '', newUrl);
                                }
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
                info: " a switch",
                classname: "lever off",
                pos: {
                    row: 1,
                    col: 10
                },
                requires: [8],
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

                        var timerRatio = 1;

                        currentPuzzle = $switch.data();

                        if (!window.switchTimer) {

                            toggleState();

                            _.each(currentPuzzle.requires, function(elem, ind, list) {
                                var found =  _.findWhere(inventory, {id: elem});
                                if( found ) {
                                    currentPuzzle.requires.splice(ind, 1);
                                }
                            });

                            if( !$switch.data("data").off ) {

                                if(currentPuzzle.requires.length > 0) {
                                    startTimer();
                                } else {
                                    $switch.addClass("frozen");
                                    window.switchTimer = window.setTimeout( startTimer, $switch.data("data").timer * 2);
                                }

                            }
                        }
                        function startTimer() {
                            $switch.removeClass("frozen");
                            window.switchTimer = window.setTimeout( function() {
                                toggleState();
                                window.clearTimeout(window.switchTimer);
                                window.switchTimer = null;
                            }, $switch.data("data").timer * timerRatio);
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

                            playSound("click", .5, 0);
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
                    col: 4
                },
                requires: [4],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "chest",
                    html: "<div class='hint'></div> \
                            <img class='nitrogen' src='_/img/dialogs/nitrogen.png' alt='a freeze spray' tabindex='0' \
                        onkeydown='currentPuzzle.actions.getItem(event)''>",
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
                    getItem: function(event) {
                        switch (event.keyCode) {
                            case 13:
                            case 32:
                                if(!currentPuzzle.solved) {
	                                inventory.push( _.findWhere(levels[currentLevel].items, {id: 8}) );
	                                updateInventory();
	                                playSound("getItem", .5, 0);
	                                $(event.currentTarget).hide();
	                                currentPuzzle.dialog.html = "";
	                                currentPuzzle.solved = true;
	                            }
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
                        classname: "gem yellow"
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
                info: " a freeze spray",
                classname: "nitrogen",
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
                id: 9,
                type: "book",
                info: " a book",
                classname: "book",
                pos: {
                    row: 3,
                    col: 5
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "book",
                    html: "<div class='columns'> \
                            <p><u>Wednesday, May 8</u></p>\
                            <p>After pestering Tom for two months, I finally persuaded him to create a self-closing mechanism for my cabinet doors.</p> \
                            <p>Amazing craftsmanship as usual! However, the mechanism is too powerful. It shuts the door before I can take out or put anything in. \
                            Last night I nearly lost my fingers!</p>\
                            <p>I don't want to ask Tom to look at it again. He's a nice guy, but it will likely take him another two months to fix it.</p> \
                            <p>Instead, I came up with this ingenious solution: I'm going to use a freeze spray \
                            to slow down the mechanism before opening the cabinet!</p>\
                        </div>",
                    hint: ""
                },
                data: {

                },
                actions: {

                }
            }
        ]
    },
    {
        map: [
            ["wall", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
            ["wall", "wall", "wall", "green", "green", "green", "green", "green", "green", "green", "green", "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "green", "green", "wall", "green", "wall"],
            ["wall", "wall", "wall", "green", "green", "green", "green", "green", "green", "wall", "wall", "wall"],
            ["wall", "wall", "wall", "green", "wall", "wall", "wall", "green", "wall", "wall", "wall", "wall"],
            ["wall", "green", "green", "green", "wall", "wall", "bubble", "bubble", "bubble", "bubble", "bubble", "wall"],
            ["wall", "green", "green", "green", "wall", "wall", "bubble", "bubble", "bubble", "bubble", "bubble", "wall"],
            ["hero", "green", "green", "green", "wall", "wall", "bubble", "bubble", "green", "bubble", "bubble", "wall"],
            ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "green", "wall", "wall", "wall"]
        ],
        items: [
            {
                id: 1,
                type: "book",
                info: " a book",
                classname: "book",
                pos: {
                    row: 1,
                    col: 3
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "book",
                    html: "<div class='columns'> \
                            <p><u>Tuesday, June 4</u></p>\
                            <p>Tom is a nice guy and a brilliant engineer, but sometimes he drives me crazy! How many times \
                                I have to tell him, that all those machines and devices that he creates for me have to be easily \
                                operated not just by hands, but also by voice, an elbow... a long stick, for pity's sake! </p>\
                                This morning I tired to open his Rube Goldberg machine holding a molten core specimen with my both hands. \
                                After 10 minutes of futile attempts I was ready to stuff that piece of core up his... </p>\
                            <p><u>Wednesday, June 5</u></p>\
                            <p>I think I finally know how to teach Tom a lesson! For the last couple of months I have been experimenting \
                            with a new material for a weather balloon. It is extremely strong and can only be pierced by something\
                            sharp and pointy, like an arrow. I filled the entire room next to the exit with air balloons made of that thing.\
                            I wish I could see his face when he tries to exit the lab!</p>\
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
                type: "secret",
                info: " a secret",
                classname: "secret",
                pos: {
                    row: 1,
                    col: 9
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
                id: 3,
                type: "item",
                info: " a yellow gem stone",
                classname: "gem yellow",
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
                data: {},
                actions: {}
            },
            {
                id: 4,
                type: "secret",
                info: " a secret",
                classname: "secret",
                pos: {
                    row: 2,
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
                    hidden: {
                        type: "item",
                        info: " a gem",
                        classname: "gem blue"
                    }
                },
                actions: {}
            },
            {
                id: 5,
                type: "secret",
                info: " a secret",
                classname: "secret",
                pos: {
                    row: 2,
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
                id: 6,
                type: "item",
                info: " a pink gem stone",
                classname: "gem pink",
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
                data: {},
                actions: {}
            },
            {
                id: 7,
                type: "item",
                info: " a key",
                classname: "key",
                pos: {
                    row: 2,
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
                id: 8,
                type: "door",
                info: " a closed door",
                classname: "door",
                pos: {
                    row: 4,
                    col: 7
                },
                requires: [7],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "puzzle_02",
                    html: "<p>You need a golden key to open this door.</p>",
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
                id: 10,
                type: "exit",
                info: " the exit",
                classname: "exit down",
                pos: {
                    row: 8,
                    col: 8
                },
                requires: [],
                unlocked: false,
                solved: false,
                dialog: {
                    classname: "exit",
                    html: "<div > \
                            <h2>LESSON 3: Do not rely on one input device only.</h2>\
                            <p>All web content must be operable regardless of the input device used. That means that if users can expand an accordion or \
                                select a date from a popup calendar with a mouse, they should be able to do exactly the same with a keyboard, \
                                joystick, or any other input device.</p> \
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
                        var newUrl = "";
                        switch (event.keyCode) {
                            case 13:
                            case 32:
                                currentLevel = 0;
                                document.title = "Accessibility Game, Level " + (currentLevel + 1);
                                buildMap(".map", levels[currentLevel]);
                                closeDialog();
                                inventory = [];
                                updateInventory();
                                logAction("you moved to the next level");
                                if (window.history.pushState) {
                                    urlParams.set("level", currentLevel + 1);
                                    newUrl = window.location.pathname + "?" + urlParams.toString();
                                    console.log(newUrl);
                                    window.history.pushState({path: newUrl}, '', newUrl);
                                }
                                break;
                            default:
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                        }
                    }
                }
            }
        ]
    }
];
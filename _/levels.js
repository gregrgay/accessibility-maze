var levels;

levels = [
    {
        map: [
            [ "wall", "wall",  "wall",  "wall",   "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall" ],
            [ "wall", "wall",  "green", "green",  "green", "green", "wall",  "wall",  "wall",  "wall",  "wall",  "wall" ],
            [ "wall", "wall",  "green", "hero",   "green", "green", "wall",  "wall",  "green", "green", "green", "exit" ],
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
                type: "item",
                classname: "book",
                pos: {
                    row: 1,
                    col: 5
                },
                requires: [],
                solved: true,
                dialog: {
                    classname: "book",
                    html: "<div class=\"columns\"> \
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> \
                            <p><img src=\"_/img/figures/figure1-1.png\" alt=\"\"></p> \
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> \
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\
                            <p><img src=\"_/img/figures/figure1-2.png\" alt=\"\"></p> \
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
                classname: "door",
                pos: {
                    row: 5,
                    col: 7
                },
                requires: [5],
                solved: false,
                dialog: {
                    classname: "puzzle_01",
                    html: "<div class=\"display\">LOCKED</div> \
                            <div class=\"controls\"> \
                            <div class=\"togglebutton\" role=\"button\" aria-pressed=\"false\" tabindex=\"0\" onkeydown=\"currentPuzzle.actions.toggleButton(event)\"></div> \
                            <div class=\"togglebutton\" role=\"button\" aria-pressed=\"false\" tabindex=\"0\" onkeydown=\"currentPuzzle.actions.toggleButton(event)\"></div> \
                            <div class=\"togglebutton\" role=\"button\" aria-pressed=\"false\" tabindex=\"0\" onkeydown=\"currentPuzzle.actions.toggleButton(event)\"></div> \
                            <div class=\"togglebutton\" role=\"button\" aria-pressed=\"false\" tabindex=\"0\" onkeydown=\"currentPuzzle.actions.toggleButton(event)\"></div> \
                        </div>"
                },
                data: {
                    sequence: [2,0,1,3],
                    selected: []
                },
                actions: {
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
                classname: "key",
                pos: {
                    row: 5,
                    col: 1
                },
                requires: [],
                solved: false,
                dialog: {
                    classname: "chest",
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
                classname: "chest",
                pos: {
                    row: 3,
                    col: 2
                },
                requires: [3],
                solved: false,
                dialog: {
                    classname: "chest",
                    html: ""
                }
            }
        ]
    }
];
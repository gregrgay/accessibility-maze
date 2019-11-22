{
    "gameinfo": [
        {
            "image": "_/img/intro_01.png",
            "content": "<p>One day, I decided to go to the library to work on my accessibility paper.</p>"
        },
        {
            "image": "_/img/intro_02.png",
            "content": "<p>I was walking through the stacks when I saw a piece of a paper. I immediately recognized the writing on it was Professor X’s.</p>"
        },
        {
            "image": "_/img/intro_03.png",
            "content": "<p>The paper was a note saying Professor X had discovered a secret labyrinth hidden beneath the library. Prof. X said he had heard this labyrinth leads to an ancient book containing solutions to every accessibility problem imaginable.</p>"
        },
        {
            "image": "_/img/intro_04.png",
            "content": "<p>According to Prof. X, the entrance to the labyrinth lies behind this clock and it opens only when the clock strikes midnight.</p>"
        },
        {
            "image": "_/img/intro_05.png",
            "content": "<p>But the clock is broken. The hands don’t move. So how did Prof. X open the passageway? Let me try moving the hands myself...</p>"
        },
        {
            "image": "_/img/intro_06.png",
            "content": "<p>It worked! Let’s see what’s inside.</p>"
        }
    ],
    "levels": [
        {
            "floorplan": [
                ["wall", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
                ["wall", "wall",  "green", "green", "green", "green", "wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
                ["wall", "wall",  "green", "green", "green", "green", "wall",  "wall",  "green", "green", "green", "exit"],
                ["wall", "wall",  "green", "green", "green", "green", "wall",  "wall",  "green", "green", "green", "wall"],
                ["wall", "wall",  "wall",  "wall",  "green", "wall",  "wall",  "wall",  "green", "green", "green", "wall"],
                ["wall", "green", "green", "wall",  "green", "green", "green", "green", "green", "green", "green", "wall"],
                ["wall", "green", "green", "wall",  "green", "green", "green", "wall",  "wall",  "wall",  "wall",  "wall"],
                ["wall", "green", "green", "green", "green", "green", "green", "wall",  "wall",  "wall",  "wall",  "wall"],
                ["wall", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"]
            ],
            "items": [
                {
                    "class": "blob",
                    "collectable": false,
                    "row": 2,
                    "col": 3
                },
                {
                    "class": "gem blue",
                    "collectable": true,
                    "row": 5,
                    "col": 2
                },
                {
                    "class": "gem pink",
                    "collectable": true,
                    "row": 7,
                    "col": 6
                },
                {
                    "class": "gem yellow",
                    "collectable": true,
                    "row": 2,
                    "col": 8
                },
                {
                    "class": "key",
                    "collectable": true,
                    "row": 7,
                    "col": 1
                },
                {
                    "class": "secret",
                    "collectable": false,
                    "row": 7,
                    "col": 3,
                    "data": {
                        "attempts": 3,
                        "treasure": {
                            "class": "green",
                            "collectable": false
                        }
                    }
                }
            ],
            "inventory": [],
            "lesson": "<h1>Lesson 1: Ensure all controls and buttons are properly labelled</h1><p>You just learned the importance of properly labelling interactive controls, like buttons. Please remember that simply placing some text or images next to them is not enough. People who use screen readers might not perceive the connection.</p><p>To make those controls accessible, each one of them must be properly associated with a corresponding label. Since engraved metal plates don't work well on the Web, you'll need to learn special techniques to make those connections.</p>"
        },
        {
            "floorplan": [
                ["wall",  "wall",  "wall",  "wall", "wall",   "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
                ["wall",  "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "wall"],
                ["green", "green", "wall",  "green", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
                ["wall",  "wall",  "wall",  "green", "wall",  "green", "green", "green", "green", "green", "green", "wall"],
                ["wall",  "green", "wall",  "green", "wall",  "wall",  "green", "wall",  "wall",  "wall",  "green", "wall"],
                ["wall",  "green", "wall",  "green", "green", "wall",  "green", "wall",  "green", "green", "green", "wall"],
                ["wall",  "green", "wall",  "green", "green", "wall",  "green", "wall",  "green", "wall",  "wall",  "wall"],
                ["wall",  "green", "green", "green", "green", "green", "green", "wall",  "green", "green", "green", "exit"],
                ["wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"]
            ],
            "items": [
                {
                    "class": "blob",
                    "collectable": false,
                    "row": 2,
                    "col": 0
                }
            ],
            "inventory": [],
            "lesson": "<h1>Lesson 2</h1>"
        }
    ]
}
{
    "gameinfo": {
	    "about": "",
	    "howto": "",
	    "credits": "",
	    "terms": ""
    },
    "intro": [
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
		            "class": "book",
                    "collectable": false,
                    "row": 1,
                    "col": 5,
                    "data": {
	                    "content": "<div class='columns'><p><u>Monday, April 1</u></p><p>Today the main water pipe burst. It was quickly fixed. However, because of the water damage, we had to rewire all buttons on the combination lock to the next room.</p><p>I thought leaving the same combination would make it easier to remember:</p><p><img src='_/img/book/figure1-2.png' alt=''></p><p class='column_break_after'>Unfortunately, the labels don't match the buttons anymore! To avoid confusion, I had to draw lines with a marker to connect the buttons to the proper labels.</p><p><u>Friday, April 19</u></p><p>As it turns out, marker lines get easily erased, so I asked my assistant, Tom, to create a metal plate with the connecting lines permanently etched on it.</p><p><img src='_/img/book/figure1-1.png' alt=''></p><p>The plate is detachable and can be stored away when not in use.</p><p>I hope nobody will mix up the buttons anymore!</p></div>"
                    }
	            },
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
		            "class": "book",
                    "collectable": false,
                    "row": 3,
                    "col": 5,
                    "data": {
	                    "content": "<div class='columns'><p><u>Wednesday, May 8</u></p><p>After pestering Tom for two months, I finally persuaded him to create a self-closing mechanism for my cabinet doors.</p><p>Amazing craftsmanship as usual! However, the mechanism is too powerful. It shuts the door before I can take out or put anything in. Last night I nearly lost my fingers!</p><p>I don't want to ask Tom to look at it again. He's a nice guy, but it will likely take him another two months to fix it.</p><p>Instead, I came up with this ingenious solution: I'm going to use a freeze spray to slow down the mechanism before opening the cabinet!</p></div>"
                    }
	            },
                {
                    "class": "blob",
                    "collectable": false,
                    "row": 2,
                    "col": 0
                },
                {
                    "class": "gem blue",
                    "collectable": true,
                    "row": 6,
                    "col": 1
                },
                {
                    "class": "gem pink",
                    "collectable": true,
                    "row": 3,
                    "col": 10
                },
                {
                    "class": "secret",
                    "collectable": false,
                    "row": 5,
                    "col": 1,
                    "data": {
                        "attempts": 3,
                        "treasure": {
                            "class": "green",
                            "collectable": false
                        }
                    }
                },
                {
                    "class": "secret",
                    "collectable": false,
                    "row": 4,
                    "col": 1,
                    "data": {
                        "attempts": 3,
                        "treasure": {
                            "class": "gem yellow",
                            "collectable": true
                        }
                    }
                }
            ],
            "inventory": [],
            "lesson": "<h1>Lesson 2</h1>"
        },
        {
            "floorplan": [
                ["wall", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",   "wall",   "wall",   "wall",   "wall",   "wall"],
	            ["wall", "wall",  "wall",  "green", "green", "green", "green",  "green",  "green",  "green",  "green",  "wall"],
	            ["wall", "green", "green", "green", "green", "green", "green",  "green",  "green",  "wall",   "green",  "wall"],
	            ["wall", "wall",  "wall",  "green", "green", "green", "green",  "green",  "green",  "wall",   "wall",   "wall"],
	            ["wall", "wall",  "wall",  "green", "wall",  "wall",  "wall",   "green",  "wall",   "wall",   "wall",   "wall"],
	            ["wall", "green", "green", "green", "wall",  "wall",  "bubble", "bubble", "bubble", "bubble", "bubble", "wall"],
	            ["wall", "green", "green", "green", "wall",  "wall",  "bubble", "bubble", "bubble", "bubble", "bubble", "wall"],
	            ["hero", "green", "green", "green", "wall",  "wall",  "bubble", "bubble", "green",  "bubble", "bubble", "wall"],
	            ["wall", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",   "wall",   "exit down",  "wall",   "wall",   "wall"]
            ],
            "items": [
	            {
		            "class": "book",
                    "collectable": false,
                    "row": 1,
                    "col": 3,
                    "data": {
	                    "content": "<div class='columns'><p><u>Tuesday, June 4</u></p><p>This morning I tired to open Tom's particle skimmer holding a molten core specimen with my both hands. After 10 minutes of futile attempts I was ready to stuff that piece of core up his... </p><p class='column_break_after'>Well, Tom is a nice guy and a brilliant engineer, but his attitude sometimes drives me crazy! How many times I have to tell him, that all those machines and devices that he creates for me have to be easily operated not just by hands, but also by something else, like a foot, an elbow... a long stick, for pity's sake! </p><p><u>Wednesday, June 5</u></p><p>I think I need to teach Tom a lesson and I might just know how! For the last couple of months I have been experimenting with a new insulation material. It is extremely strong and can only be pierced by something sharp and pointy, like an arrow.</p><p>I filled the entire room next to the exit with air balloons made of that thing. I'd like to see him try and make his way to the exit using his bare hands!</p></div>"
                    }
	            },
                {
                    "class": "blob",
                    "collectable": false,
                    "row": 7,
                    "col": 0
                },
                {
                    "class": "gem yellow",
                    "collectable": true,
                    "row": 1,
                    "col": 10
                },
                {
                    "class": "gem pink",
                    "collectable": true,
                    "row": 5,
                    "col": 1
                },
                {
                    "class": "key",
                    "collectable": true,
                    "row": 2,
                    "col": 1
                },
                {
                    "class": "door",
                    "collectable": false,
                    "row": 4,
                    "col": 7,
                    "data": {
	                    "key": 25,
		                "puzzle": -1
		            }
                },
                {
                    "class": "secret",
                    "collectable": false,
                    "row": 2,
                    "col": 2,
                    "data": {
                        "attempts": 3,
                        "treasure": {
                            "class": "green",
                            "collectable": false
                        }
                    }
                },
                {
                    "class": "secret",
                    "collectable": false,
                    "row": 1,
                    "col": 9,
                    "data": {
                        "attempts": 3,
                        "treasure": {
                            "class": "green",
                            "collectable": false
                        }
                    }
                },
                {
                    "class": "secret",
                    "collectable": false,
                    "row": 2,
                    "col": 10,
                    "data": {
                        "attempts": 3,
                        "treasure": {
                            "class": "gem blue",
                            "collectable": true
                        }
                    }
                }
            ],
            "inventory": [],
            "lesson": "<h1>Lesson 2</h1>"
        }
    ]
}
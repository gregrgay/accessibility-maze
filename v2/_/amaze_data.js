{
    "gameinfo": {
	    "about": "<h1>About</h1><div class='message'><p>The Accessibility Maze was developed by the Digital Education Strategies team at The Chang School of Continuing Education, at Ryerson University. Funding is provided by The Chang School, and the Government of Ontario.</p><p>The purpose of the game is to introduce those new to web accessibility, to potential barriers on the Web that may prevent some people from accessing content. You will experience the challenges of navigating the Web that some people with disabilities encounter.</p></div>",
	    "howto": "<h1>How to Play</h1><div class='message'><p>The goal of the Accessibility Maze is to navigate through the maze, solving puzzles to move between levels, and collecting gems to be exchanged for a reward after completing the game.</p><p>Once in the maze, use your keyboard's arrow keys to move up and down, or left and right, through the squares in the maze.</p><p>Press the arrow keys while next to an object, to activate that object.</p><p>Use the Escape (ESC) key to dismiss any dialog boxes that may open after reading their content.</p><p>Your position in the game is maintained when returning to the menu, so you can continue where you left off in the game by clicking Resume Game. Choosing New Game will start the game over from the beginning.\n</p></div>",
	    "contacts": "<h1>Contact Us</h1><div class='message'><p>Questions or comments about the game can be directed to <a href='mailto:dehelp@ryerson.ca'>dehelp@ryerson.ca</a>.</p></div>",
        "accessibility": "<h1>Accessibility</h1><div class='message'><p>Every effort has been made to make the Accessibility Maze accessible to screen readers.</p><p>The background music can be disabled using the Audio button at the top of the maze, once it opens.</p><p>Next to the audio button, is another button that returns the player to the menu on the opening screen of the game.</p><p>Listen for shortcuts during game play, announced by screen reader.</p></div>",
	    "terms": "<h1>Terms of Use</h1><div><p>Unless otherwise noted this resource is available for public use under <a href=\"https://creativecommons.org/licenses/by-nc/4.0/\" target=\"postop\">Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)</a>.</p><p>Under the terms of Creative Commons license, you are free to share and adapt this resource under the following terms: If you share the content from this resource, you must identify the creators of the resource (Centennial College, George Brown College, and Ryerson University) in a reasonable manner. Also, you may not use the material for commercial purposes.</p></div>"
    },
    "intro": [
        {
            "image": "_/img/intro/intro_01.png",
            "content": "<p>Professor X. and I were doing a research on the misterious Accessibility Master. Rumors had it that he had discovered a great secret that would make the entire world accessible.</p><p>Unfortunately, the Master's \"discovery\" was never published and he himself disappeared without a trace. Nobody has heard from him since.</p>"
        },
        {
            "image": "_/img/intro/intro_02.png",
            "content": "<p>Last night, Professor X. called to tell me that he had found the secret of the Accessibility Master's disappearance. I had some other commitments, so I promised to see him next morning.</p>"
        },
        {
            "image": "_/img/intro/intro_03.png",
            "content": "<p>I could hardly sleep that night thinking about the reason for the Professor's call. The excitement I'd heard in Professor's voice raised my curiosity. What in the world had he found?</p>"
        },
        {
            "image": "_/img/intro/intro_04.png",
            "content": "<p>Next morning, I rushed to the library.</p>"
        },
        {
            "image": "_/img/intro/intro_05.png",
            "content": "<p>The Professor X. was not there yet. Suddenly, I saw a note on the floor. I immediately recognized the Professor's writing.</p>"
        },
        {
            "image": "_/img/intro/intro_06.png",
            "content": "<p>The note said that the Professor had discovered a secret labyrinth built by the Accessibility Master beneath the library.</p>"
        },
        {
            "image": "_/img/intro/intro_07.png",
            "content": "<p>According to the Professor, the entrance to the labyrinth was hidden behind the old clock, and it unlocked only at midnight.</p>"
        },
        {
            "image": "_/img/intro/intro_08.png",
            "content": "<p>But the clock is broken. The hands don't move. So how did the Professor open the passageway? Let me try moving the hands myself...</p>"
        },
        {
            "image": "_/img/intro/intro_09.png",
            "content": "<p>It worked! Let's see what's inside.</p>"
        }
    ],
    "levels": [
    {
        "floorplan": [
            ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "wall", "green", "green", "green", "wall"],
            ["wall", "green", "green", "blob", "green", "green", "green", "green", "green", "green", "green", "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "wall", "green", "green", "green", "wall"],
            ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "green", "green", "green", "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "wall", "green", "green", "green", "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "wall"],
            ["wall", "green", "green", "green", "green", "green", "green", "wall", "green", "green", "green", "wall"],
            ["wall", "wall", "wall", "exit down", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"]
        ],
        "items": [
            {
                "class": "blue gem",
                "collectable": true,
                "row": 2,
                "col": 7
            },
            {
                "class": "pink gem",
                "collectable": true,
                "row": 5,
                "col": 4
            },
            {
                "class": "yellow gem",
                "collectable": true,
                "row": 6,
                "col": 8
            },
            {
                "class": "book",
                "collectable": false,
                "row": 1,
                "col": 9,
                "data": {
                    "content": "<div class='columns'><p><u>Saturday, March 23</u></p><p>I decided to use my cat's name for the combination lock in this room.</p><p>I always have his picture on my desk. It would be a good reminder if I ever forget the password.</p></div>"
                }
            },
            {
                "class": "key",
                "collectable": true,
                "row": 7,
                "col": 9
            },
            {
                "class": "chest",
                "collectable": false,
                "row": 5,
                "col": 10,
                "data": {
                    "requires": 93,
                    "treasure": {
                        "class": "cat_photo",
                        "name": "cat's photo"
                    }
                }
            },
            {
                "class": "puzzle2",
                "collectable": false,
                "row": 6,
                "col": 7,
                "data": {
                    "requires": 70,
                    "solved": false,
                    "hint": "The door is locked. You need to enter a key combination to open it."
                }
            }
        ],
        "inventory": [],
        "lesson": "<h1>All visual content must have text alternatives</h1><p>Pending...</p>"
    },
    {
            "floorplan": [
                ["wall", "wall",  "wall",  "blob",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
                ["wall", "wall", "green", "green", "green", "green", "wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
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
                    "class": "blue gem",
                    "collectable": true,
                    "row": 5,
                    "col": 2
                },
                {
                    "class": "pink gem",
                    "collectable": true,
                    "row": 7,
                    "col": 6
                },
                {
                    "class": "yellow gem",
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
                },
                {
                    "class": "chest",
                    "collectable": false,
                    "row": 3,
                    "col": 2,
                    "data": {
                        "requires": 85,
                        "treasure": {
                            "class": "panel_01",
                            "name": "engraved metal plate"
                        }
                    }
                },
                {
                    "class": "puzzle1",
                    "collectable": false,
                    "row": 5,
                    "col": 7,
                    "data": {
                        "requires": 38,
                        "solved": false,
                        "hint": "The door is locked. You need to enter a key combination to open it."
                    }
                }
            ],
            "inventory": [],
            "lesson": "<h1>Ensure all controls and buttons are properly labelled</h1><p>You just learned the importance of properly labelling interactive controls, like buttons. Please remember that simply placing some text or images next to them is not enough. People who use screen readers might not perceive the connection.</p><p>To make those controls accessible, each one of them must be properly associated with a corresponding label. Since engraved metal plates don't work well on the Web, you'll need to learn special techniques to make those connections.</p>"
        },
        {
            "floorplan": [
                ["wall",  "wall",  "wall",  "wall", "wall",   "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
                ["wall",  "green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "wall"],
                ["blob",  "green", "wall",  "green", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall"],
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
	                    "content": "<div class='columns'><p><u>Wednesday, May 8</u></p><p>After pestering Tom for two months, I finally persuaded him to create a self-closing mechanism for my cabinet doors.</p><p>Amazing craftsmanship as usual! However, the mechanism is too powerful. It shuts the door before I can take out or put anything in. Last night I nearly lost my fingers!</p><p>I don't want to ask Tom to look at it again. He's a nice guy, but it will likely take him another two months to fix it.</p><p>Instead, I came up with this ingenious solution: I'm going to use a freeze spray to slow down the closing mechanism!</p></div>"
                    }
	            },
                {
                    "class": "blue gem",
                    "collectable": true,
                    "row": 6,
                    "col": 1
                },
                {
                    "class": "pink gem",
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
                            "class": "yellow gem",
                            "collectable": true
                        }
                    }
                },
                {
                    "class": "key",
                    "collectable": true,
                    "row": 7,
                    "col": 8
                },
                {
                    "class": "chest",
                    "collectable": false,
                    "row": 5,
                    "col": 4,
                    "data": {
                        "requires": 92,
                        "treasure": {
                            "class": "nitrogen",
                            "name": "can of freeze spray"
                        }
                    }
                },
                {
                    "class": "switch",
                    "collectable": false,
                    "row": 1,
                    "col": 10,
                    "data": {
                        "controls": 93,
                        "requires": 64,
                        "timeout": 3000
                    }
                },
                {
                    "class": "door",
                    "collectable": false,
                    "row": 7,
                    "col": 9,
                    "data": {
                        "locked": true,
                        "requires": -1,
                        "puzzle": null
                    }
                }
            ],
            "inventory": [],
            "lesson": "<h1>Fast moving or self-updating content should be easily paused, or slowed down</h1><p>Not everyone can interact with websites or devices at the same speed. Some people with cognitive disabilities, or mobility impairments might require more time to complete a task.</p><p>It is important to always provide a way to slow down, or completely stop any moving or self-updating content on the Web. This would include auto-scrolling text, automated slide shows, audio and video content, etc.</p>"
        },
        {
            "floorplan": [
                ["wall", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",   "wall",   "wall",      "wall",   "wall",   "wall"],
	            ["wall", "wall",  "wall",  "green", "green", "green", "green",  "green",  "green",     "green",  "green",  "wall"],
	            ["wall", "green", "green", "green", "green", "green", "green",  "green",  "green",     "wall",   "wall",  "wall"],
	            ["wall", "wall",  "wall",  "green", "green", "green", "green",  "green",  "green",     "wall",   "wall",   "wall"],
	            ["wall", "wall",  "wall",  "green", "wall",  "wall",  "wall",   "green",  "wall",      "wall",   "green",   "wall"],
	            ["wall", "green", "green", "green", "wall",  "wall",  "bubble", "bubble", "bubble",    "bubble", "bubble", "wall"],
	            ["wall", "green", "green", "green", "wall",  "wall",  "bubble", "bubble", "bubble",    "bubble", "bubble", "wall"],
	            ["blob", "green", "green", "green", "wall",  "wall",  "bubble", "bubble", "bubble",    "bubble", "bubble", "wall"],
	            ["wall", "wall",  "wall",  "wall",  "wall",  "wall",  "wall",   "wall",   "exit down", "wall",   "wall",   "wall"]
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
                    "class": "yellow gem",
                    "collectable": true,
                    "row": 1,
                    "col": 10
                },
                {
                    "class": "pink gem",
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
                        "locked": true,
	                    "requires": 25,
		                "puzzle": null
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
                    "row": 4,
                    "col": 10,
                    "data": {
                        "attempts": 3,
                        "treasure": {
                            "class": "blue gem",
                            "collectable": true
                        }
                    }
                }
            ],
            "inventory": [],
            "lesson": "<h1>Do not rely on one input device only.</h1><p>All web content must be operable regardless of the input device used. That means that if users can open a website navigation menu or select a date from a popup calendar with a mouse, they should be able to do exactly the same with a keyboard, joystick, or any other input device.</p>"
        }
    ],
    "outro": [
        {
            "image": "_/img/intro/outro_01.png",
            "content": "<p>Finally! The last door is open! Accessibility secrets are ours!</p>"
        },
        {
            "image": "_/img/intro/outro_02.png",
            "content": "<p>Wait&hellip; But the room is empty! Where are all the accessibility secrets?! And who the hell are you?</p>"
        },
        {
            "image": "_/img/intro/outro_03.png",
            "content": "<p>Hello my friends! I am the Accessibility Master. I'll bet you were expecting to discover some accessibility magic here.</p>"
        },
        {
            "image": "_/img/intro/outro_03.png",
            "content": "<p>Well, there is no magic that can make the world accessible.</p><p>But there are things you and I can do to get closer to that goal.</p>"
        },
        {
            "image": "_/img/intro/outro_03.png",
            "content": "<p>Here, take this guideline. It will help you in your new quest.</p>"
        }
    ]
}
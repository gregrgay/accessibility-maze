{
    "gameinfo": {
	    "about": "<h1>About</h1><div class='message'><p>The Accessibility Maze was developed by the Digital Education Strategies team at The Chang School of Continuing Education, at Ryerson University. Funding is provided by The Chang School, and the Government of Ontario.</p><p>The purpose of the game is to introduce those new to web accessibility, to potential barriers on the Web that may prevent some people from accessing content. You will experience the challenges of navigating the Web that some people with disabilities encounter.</p></div>",
	    "howto": "<h1>How to Play</h1><div class='message'><p>The goal of the Accessibility Maze is to navigate through the maze, solving puzzles to move between levels, and collecting gems to be exchanged for a reward after completing the game.</p><p>Once in the maze, use your keyboard's arrow keys to move up and down, or left and right, through the squares in the maze.</p><p>Press the arrow keys while next to an object, to bump up against the object and activate it.</p><p>Use the Escape (ESC) key to dismiss any dialog boxes, puzzles, or diary pages that may open, after reading their content.</p><p>Your position in the game is maintained when returning to the menu, so you can continue where you left off in the game by clicking Resume Saved. Choosing New Game will start the game over from the beginning.\n</p></div>",
	    "contacts": "<h1>Contact Us</h1><div class='message'><p>Questions or comments about the game can be directed to <a href='mailto:dehelp@ryerson.ca'>dehelp@ryerson.ca</a>.</p></div>",
        "accessibility": "<h1>Accessibility</h1><div class='message'><p>Every effort has been made to make the Accessibility Maze accessible to screen readers.</p><p>The background music can be disabled using the Audio button at the top of the maze, once it opens.</p><p>Next to the audio button, is another button that returns the player to the menu on the opening screen of the game.</p><p>Listen for shortcuts during game play, announced by screen readers.</p></div>",
	    "terms": "<h1>Terms of Use</h1><div><p>Unless otherwise noted this resource is available for public use under <a href=\"https://creativecommons.org/licenses/by-sa/4.0/\" target=\"postop\">Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)</a>.</p><p>Under the terms of Creative Commons license, you are free to share and adapt this resource under the following terms: If you share the content from this resource, you must identify the creators of the resource (Ryerson University) in a reasonable manner. </p></div>"
    },
    "intro": [
        {
            "image": "_/img/intro/intro_01.png",
            "content": "<p>Professor X and I were doing research on the mysterious Accessibility Master. Rumors had it that he had found a great secret that would make the entire world accessible.</p><p>Unfortunately, the Master's work was never published and he himself disappeared without a trace. Nobody has heard from him since.</p>"
        },
        {
            "image": "_/img/intro/intro_02.png",
            "content": "<p>Last night, Professor X called to tell me that he had found the secret of the Accessibility Master's disappearance. I had some other commitments that evening, so I promised to see him the next morning.</p>"
        },
        {
            "image": "_/img/intro/intro_03.png",
            "content": "<p>I could hardly sleep that night thinking about the reason for the Professor's call. The excitement I'd heard in the Professor's voice raised my curiosity. What in the world had he found?</p>"
        },
        {
            "image": "_/img/intro/intro_04.png",
            "content": "<p>The next morning, I rushed to the library.</p>"
        },
        {
            "image": "_/img/intro/intro_05.png",
            "content": "<p>The Professor was not there yet. Suddenly, I saw a note on the floor. I immediately recognized the Professor's writing.</p>"
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
                "row": 6,
                "col": 6
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
                    "content": "<div class='columns'><p><u>Sunday, March 17</u></p><p>Being Accessibility Master is not easy. With everything that happens around here I need a place to record my thoughts and ideas. So, I decided to start a diary. Maybe it will help me think about things more clearly.</p><p><u>Saturday, March 23</u></p><p>I keep foregeting the password for the combination lock in this room. Today I reprogrammed the lock to use my cat's name.</p><p>I always have his picture on my desk. It would be a good reminder if I ever forget the password again.</p></div>"
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
                    "collected": false,
                    "treasure": {
                        "class": "cat_photo",
                        "name": "cat's photo stained with ink"
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
                    "collected": false,
                    "solved": false,
                    "hint": "<span class=\"readersonly\">Door with combination lock. </span>Use Tab key to move forward between interactive controls, Shift+Tab to move in opposite drection, and Enter key to activate them."
                }
            }
        ],
        "inventory": [],
        "lesson": "<h1>LESSON 1: All visual content must have a text alternative.</h1><p>When creating content for the Web, one of the most important accessibility features that can be added is text descriptions for meaningful visual content. This ensures that people who are blind get equivalent information to those who can see images. In this puzzle the cat's name on the back of the photo, provides a text alternative for the name that cannot be seen in the image .</p><p>Text alternatives also make it possible for search engines to index images to make them searchable. It makes the same information available for those with images turned off, or perhaps using older technology, or with limited data plans. Learn more about providing text alternatives when you reach the end of the game.</p>"
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
	                    "content": "<div class='columns'><p><u>Monday, April 1</u></p><p>Today the main water pipe burst. It was quickly fixed. However, because of the water damage, we had to rewire all buttons on the combination lock to the next room.</p><p>I thought leaving the same combination would make it easier to remember:</p><p class='passcode'> D <span aria-hidden='true' class='readersonly'>.</span> C <span aria-hidden='true' class='readersonly'>.</span> A <span aria-hidden='true' class='readersonly'>.</span> B </p><p class='column_break_after'>Unfortunately, the labels don't match the buttons anymore! To avoid confusion, I had to draw lines with a marker to connect the buttons to the proper labels.</p><p><u>Friday, April 19</u></p><p>As it turns out, marker lines get easily erased, so I asked my assistant, Tom, to create a metal plate with the connecting lines permanently etched on it.</p><p><img src='_/img/book/figure1-1.png' alt=''></p><p>The plate is detachable and can be stored away when not in use.</p><p>I hope nobody will mix up the buttons anymore!</p></div>"
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
                        "collected": false,
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
                        "collected": false,
                        "solved": false,
                        "hint": "<span class=\"readersonly\">Door with combination lock. </span>Use Tab key to move forward between interactive controls, Shift+Tab to move in opposite drection, and Enter key to activate them."
                    }
                }
            ],
            "inventory": [],
            "lesson": "<h1>LESSON 2: Ensure all buttons and form fields are properly labelled</h1><p>You just experienced what happens when buttons are not labelled properly. Remember that simply placing some text or images next to buttons or form fields is not enough — people who use screen readers might not perceive the connection.</p><p>To make buttons and form fields accessible, each one of them must be properly associated with a label. Complete the game to receive tips on how to do this!</p>"
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
	                    "content": "<div class='columns'><p><u>Wednesday, May 8</u></p><p>After pestering Tom for two months, I finally persuaded him to create a self-closing mechanism for the door to the next room.</p><p>Amazing craftsmanship as usual! However, the mechanism is too powerful. It shuts the door before I can get to it. Last night I nearly lost my fingers!</p><p>I don't want to ask Tom to look at it again. He's a nice guy, but it will likely take him another two months to fix it.</p><p>Instead, I came up with this ingenious solution: I'm going to use a freeze spray to slow down the closing mechanism!</p></div>"
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
                        "collected": false,
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
                        "collected": false,
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
                        "collected": false,
                        "puzzle": null
                    }
                }
            ],
            "inventory": [],
            "lesson": "<h1>LESSON 3: Moving or timed content should be easily paused, or slowed down</h1><p>Not everyone can interact with websites or devices at the same speed &mdash; some users require more time to complete a task.</p><p>It is important to always provide a way to completely stop or slow down any moving or timed content on the Web. Complete the game to learn more. </p>"
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
	                    "content": "<div class='columns'><p><u>Tuesday, June 4</u></p><p>This morning I tired to open Tom's particle skimmer holding a molten core specimen with my two hands. After 10 minutes of futile attempts I was ready to stuff that piece of core up his... </p><p class='column_break_after'>Well, Tom is a brilliant engineer, but his attitude sometimes drives me crazy! How many times do I have to tell him, that all those machines and devices that he creates for me have to be easily operated not just by hands, but also by something else, like a foot, an elbow... a long stick, for pity's sake! </p><p><u>Wednesday, June 5</u></p><p>I think I need to teach Tom a lesson and I might just know how! For the last couple of months I have been experimenting with a new insulation material. It is extremely strong and can only be pierced by something sharp and pointy, like an arrow.</p><p>I filled the entire room next to the exit with air balloons made of the material. Now I'd like to see him try and make his way to the exit using his bare hands!</p></div>"
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
                        "collected": false,
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
            "lesson": "<h1>Lesson 4: Interactive features must operate with a mouse and a keyboard.</h1><p>Many people are not able to use a mouse, perhaps because they cannot see the mouse pointer, or perhaps they do not have a steady enough hand to target clickable features effectively, among other reasons. </p><p>You may have experienced a moment of frustration yourself trying to access the final room in this puzzle when your keyboard stopped working. This frustration is common for people who rely on a keyboard to navigate the Web. Learn more about \"device independence\" at the end of the game.</p>"
        },
        {
            "floorplan": [
                ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "blob", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "green", "green", "green", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "green", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "green", "wall", "wall", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "green", "green", "green", "green", "green", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "prof", "green", "green", "green", "green", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "green", "green", "green", "green", "green", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "green", "green", "green", "green", "green", "wall", "wall", "wall"],
                ["wall", "wall", "wall", "wall", "wall", "wall", "green", "wall", "wall", "wall", "wall", "wall"]
            ],
            "items": [
                {
                    "class": "door last",
                    "collectable": false,
                    "row": 8,
                    "col": 6,
                    "data": {
                        "locked": true,
                        "requires": -1,
                        "collected": false,
                        "puzzle": null
                    }
                },
                {
                    "class": "prof",
                    "collectable": false,
                    "row": 5,
                    "col": 4,
                    "data": {
                        "long": "<div class='text'><p>I'm so glad to see you! I need your help to open the last door. It requires 13 gems to operate. I was only able to find 9.</p><p>Here, take mine. Now, go and open that door!</p></div>",
                        "short": "<div class='text'><p>Go and to open that door!</p></div>"
                    }
                }
            ],
            "inventory": [],
            "lesson": ""
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
            "content": "<p>Well, there is no magic that can make the world accessible. But there are things you and I can do to get closer to that goal.</p>"
        },
        {
            "image": "_/img/intro/outro_03.png",
            "content": "<p>Pick up the Accessibility Guide as you leave the maze. It will help you in your new quest.</p>"
        }
    ]
}
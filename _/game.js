var map, items, inventory, keys;


map = [
	[ "wall", "wall",  "wall",  "wall",   "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall" ],
	[ "wall", "wall",  "green", "green",  "green", "green", "wall",  "wall",  "wall",  "wall",  "wall",  "wall" ],
	[ "wall", "wall",  "green", "hero",   "green", "green", "wall",  "wall",  "green", "green", "green", "exit" ],
	[ "wall", "wall",  "key",   "green",  "green", "green", "wall",  "wall",  "green", "green", "green", "wall" ],
	[ "wall", "wall",  "wall",  "wall",   "green", "wall",  "wall",  "wall",  "green", "green", "green", "wall" ],
	[ "wall", "chest", "green", "wall",   "green", "green", "green", "green",  "green", "green", "green", "wall" ],
	[ "wall", "green", "green", "wall",   "green", "green", "green", "wall",  "wall",  "wall",  "wall",  "wall" ],
	[ "wall", "green", "green", "secret", "green", "green", "green","wall",  "wall",  "wall",  "wall",  "wall" ],
	[ "wall", "wall",  "wall",  "wall",   "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall",  "wall" ],
];

items = [
	{
		id: 1,
		type: "book",
		classname: "book",
		pos: {
			row: 1,
			col: 5
		},
		requires: [],
		unlocked: true,
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
		}
	},
	{
		id: 2,
		type: "door",
		classname: "door",
		pos: {
			row: 5,
			col: 7
		},
		requires: [3],
		unlocked: false,
		dialog: {
			classname: "puzzle_01",
			html: "<div class=\"controls\"> \
					<div class=\"togglebutton\" role=\"button\" aria-pressed=\"false\" tabindex=\"0\" onkeydown=\"validatePuzzle(event,'puzzle_01')\"></div> \
					<div class=\"togglebutton\" role=\"button\" aria-pressed=\"false\" tabindex=\"0\" onkeydown=\"validatePuzzle(event,'puzzle_01')\"></div> \
					<div class=\"togglebutton\" role=\"button\" aria-pressed=\"false\" tabindex=\"0\" onkeydown=\"validatePuzzle(event,'puzzle_01')\"></div> \
					<div class=\"togglebutton\" role=\"button\" aria-pressed=\"false\" tabindex=\"0\" onkeydown=\"validatePuzzle(event,'puzzle_01')\"></div> \
				</div>"
		}
	}
];

keys = 0;

$(document).ready(function() {
	
	buldMap(".map", map, items);
	
	$(document).on("keydown", function(event) {
		switch(event.keyCode) {
			case 27: // escape
				closeDialog();
				break;
			default:
				break;
		}
	});
		
});

function buldMap(elem, map, items) {
	
	var $map = $(elem)
		.empty()
		.attr({
			"tabindex": 0
		});
	
	_.each(map, function(row, i) {
		
		var $row =  $("<div/>").addClass("row").appendTo($map);
		
		_.each(row, function(tile, j) {
			
			var $tile = $("<div/>")
				.addClass("tile " + tile)
				.data({
					"pos": {
						"row": i,
						"col": j
					}
				});
			$row.append($tile);
		});
	});
	
	_.each(items, function(tile, i) {
		var $row, $tile;
		
		$row = $map.find(".row").eq(tile.pos.row);
		$tile = $row.find(".tile").eq(tile.pos.col).removeClass("green");
		
		$tile.addClass(tile.classname);
		
		$tile.data(tile);
	});
	
	$map.on("keydown", function(event) {
		var $rows, $curr, $next, pos;
		
		$rows = $map.find(".row");
		$curr = $map.find(".hero");
		pos = $curr.data("pos");
		
		switch(event.keyCode) {
			case 37: // left
				$next = $rows.eq(pos.row).children().eq(pos.col - 1);
				moveCharacter("left");
				break;
			case 38: // top
				$next = $rows.eq(pos.row - 1).children().eq(pos.col);
				moveCharacter("up");
				break;
			case 39: // right
				$next = $rows.eq(pos.row).children().eq(pos.col + 1);
				moveCharacter("right");
				break;
			case 40: // bottom
				$next = $rows.eq(pos.row + 1).children().eq(pos.col);
				moveCharacter("down");
				break;
			default:
				//console.log(event.keyCode)
				break;
		}
		
		function moveCharacter(direction) {
			var attempts, required;
			
			if($next.hasClass("wall")) {
				
				logAction("you ran into wall");
				
			} else if ( $next.hasClass("secret") ) {
				
				attempts = $next.data("attempts");
				
				if ( isNaN(attempts) ) {
					$next.data( {"attempts": 1} ).addClass("shaking");
					window.setTimeout(function(){ $next.removeClass("shaking"); }, 300);
					logAction("you ran into a strange looking wall");
				} else {
					if($next.data("attempts") < 2) {
						$next.data( {"attempts": ++attempts} ).addClass("shaking");
						window.setTimeout(function(){ $next.removeClass("shaking"); }, 300);
						logAction("you pushed a strange looking wall");
					} else {
						$next.toggleClass("secret green");
						logAction("you found a secret passage");
					}
				}
			
			} else if ( $next.hasClass("door") ) {
				
				/*if ( keys == 0 ) {
					logAction("you found a locked door");
				} else {
					keys--;
					$curr.toggleClass("hero green");
					$next.toggleClass("hero door");
					updateInventory();
					logAction("you unlocked the door");
				}*/
				
				required = $next.data("required");
				
				if ( !$next.data("unlocked") ) {
					openDialog($next.data("dialog"));
				}
				
			} else if ( $next.hasClass("key") ) {
				
				keys++;
				$curr.toggleClass("hero green");
				$next.toggleClass("hero key");
				updateInventory();
				logAction("you got a key");
				
			} else if ( $next.hasClass("book") ) {
				
				logAction("you found a diary");
				openDialog($next.data("dialog"));
				
			} else if ( $next.hasClass("chest") ) {
				
				logAction("you found a locked chest");
				
			} else if ( $next.hasClass("green") ) {
				
				$curr.toggleClass("hero green");
				$next.toggleClass("hero green");
				logAction("you moved " + direction);
				
			}
		}
		
	});
};

function validatePuzzle(event, puzzle) {
	var btn;

	switch(event.keyCode) {

		case 13:
		case 32:
			btn = $(event.currentTarget).attr({
				"aria-pressed": true,
				"tabindex": -1,
				"disabled": "disabled"
			});
			break;
	}
	console.log(event.currentTarget);
}

}
function openDialog(data) {
	$(".overlay .dialog").addClass(data.classname).html(data.html);
	$(".overlay").addClass("visible");
}

function closeDialog() {
	$(".overlay").removeClass("visible");
	$(".overlay .dialog").removeClass().addClass("dialog");
}

function updateInventory() {
	
	var $stash = $(".inventory").empty();
	
	for( var i = 0; i < keys; i++) {
		$("<div/>").addClass("tile key").appendTo($stash);
		console.log(i);
	}
}

function logAction(str) {
	$(".log").html(str);
}
		
		
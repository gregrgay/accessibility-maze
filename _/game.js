var level1, keys;


level1 = [
	[ "wall","wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall" ],
	[ "wall", "wall", "key", "green", "book", "wall", "wall", "wall", "wall" ],
	[ "wall", "wall", "green", "character", "green", "wall", "green", "green", "door" ],
	[ "wall", "wall", "green", "green", "green", "wall", "green", "green", "wall" ],
	[ "wall", "wall", "wall", "wall", "door", "wall", "wall", "green", "wall" ],
	[ "wall", "green", "green", "wall", "green", "green", "green", "door", "wall" ],
	[ "wall", "green", "green", "door", "green", "green", "green", "wall", "wall" ],
	[ "wall", "chest", "green", "wall", "green", "green", "green", "wall", "wall" ],
	[ "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall" ],
];

keys = 0;

$(document).ready(function() {
	
	buldMap(".map", level1);
		
});

function buldMap(elem, data) {
	
	var $map = $(elem).attr({
		"tabindex": 0
	});
	
	_.each(data, function(row, i) {
		
		var $row =  $("<div/>").addClass("row").appendTo($map);
		
		_.each(row, function(tile, j) {
			
			$tile = $("<div/>")
				.addClass(tile)
				.data({
					"row": i,
					"col": j
				});
			$row.append($tile);
		});
	});
	
	$map.on("keydown", function(event) {
		var $rows, $curr, $next, pos;
		
		$rows = $map.find(".row");
		$curr = $map.find(".character");
		pos = $curr.data();
		
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
				console.log(event.keyCode)
				break;
		}
		
		function moveCharacter(direction) {
			
			if ( $next.hasClass("green") ) {
				
				$curr.toggleClass("character green");
				$next.toggleClass("character green");
				logAction("you moved " + direction);
				
			} else if($next.hasClass("wall")) {
				
				logAction("you ran into wall");
				
			} else if($next.hasClass("door")) {
				
				if ( keys == 0 ) {
					logAction("you found a locked door");
				} else {
					keys--;
					$curr.toggleClass("character green");
					$next.toggleClass("character door");
					logAction("you unlocked the door");
				}
				
			} else if($next.hasClass("key")) {
				
				keys++;
				$curr.toggleClass("character green");
				$next.toggleClass("character key");
				logAction("you got a key");
				
			} else if($next.hasClass("book")) {
				
				logAction("you found a book");
				
			}
		}
		
		function logAction(str) {
			$(".log").html(str);
		}
		
	});
};
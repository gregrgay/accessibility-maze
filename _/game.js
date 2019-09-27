var inventory, keys, currentPuzzle, currentTile, nextTile;

inventory = [];
keys = 0;

$(document).ready(function() {
	
	buildMap(".map", levels[0]);
	
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

function buildMap(elem, level) {
	
	var $map = $(elem)
		.empty()
		.attr({
			"tabindex": 0
		}).focus();
	
	_.each(level.map, function(row, i) {
		
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
	
	_.each(level.items, function(tile, i) {
		var $row, $tile;
		
		$row = $map.find(".row").eq(tile.pos.row);
		$tile = $row.find(".tile").eq(tile.pos.col).removeClass("green");
		
		$tile.data(tile).addClass(tile.classname);
	});
	
	$map.on("keydown", function(event) {
		var $rows, pos;
		
		$rows = $map.find(".row");
		currentTile = $map.find(".hero");
		pos = currentTile.data("pos");
		
		switch(event.keyCode) {
			case 37: // left
				nextTile = $rows.eq(pos.row).children().eq(pos.col - 1);
				moveCharacter("left");
				break;
			case 38: // top
				nextTile = $rows.eq(pos.row - 1).children().eq(pos.col);
				moveCharacter("up");
				break;
			case 39: // right
				nextTile = $rows.eq(pos.row).children().eq(pos.col + 1);
				moveCharacter("right");
				break;
			case 40: // bottom
				nextTile = $rows.eq(pos.row + 1).children().eq(pos.col);
				moveCharacter("down");
				break;
			default:
				//console.log(event.keyCode)
				break;
		}
		
		function moveCharacter(direction) {
			var attempts, required;
			
			if(nextTile.hasClass("wall")) {
				
				logAction("you ran into wall");
				
			} else if ( nextTile.hasClass("secret") ) {
				
				attempts = nextTile.data("attempts");
				
				if ( isNaN(attempts) ) {
					nextTile.data( {"attempts": 1} ).addClass("shaking");
					window.setTimeout(function(){ nextTile.removeClass("shaking"); }, 300);
					logAction("you ran into a strange looking wall");
				} else {
					if(nextTile.data("attempts") < 2) {
						nextTile.data( {"attempts": ++attempts} ).addClass("shaking");
						window.setTimeout(function(){ nextTile.removeClass("shaking"); }, 300);
						logAction("you pushed a strange looking wall");
					} else {
						nextTile.toggleClass("secret green");
						logAction("you found a secret passage");
					}
				}
			
			} else if ( nextTile.hasClass("door") ) {
				
				openDialog(nextTile.data());

			} else if ( nextTile.hasClass("key") ) {
				
				keys++;
				currentTile.toggleClass("hero green");
				nextTile.toggleClass("hero key");
				updateInventory();
				logAction("you got a key");
				
			} else if ( nextTile.hasClass("book") ) {
				
				logAction("you found a diary");
				openDialog(nextTile.data());
				
			} else if ( nextTile.hasClass("chest") ) {

				openDialog(nextTile.data());
				//logAction("you found a locked chest");
				
			} else if ( nextTile.hasClass("green") ) {
				
				currentTile.toggleClass("hero green");
				nextTile.toggleClass("hero green");
				logAction("you moved " + direction);
				
			}
		}
		
	});
}

function openDialog(data) {
	$(".map").attr({
		tabindex: -1
	}).blur();
	$(".overlay .dialog").addClass(data.dialog.classname).html(data.dialog.html);
	$(".overlay").addClass("visible");
	currentPuzzle = data;
}

function closeDialog() {
	$(".overlay").removeClass("visible");
	$(".overlay .dialog").removeClass().addClass("dialog").html("");
	$(".map").attr({
		tabindex: 0
	}).focus();
	currentPuzzle = null;
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
		
		
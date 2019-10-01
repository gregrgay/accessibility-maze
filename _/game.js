var currentLevel, inventory, currentPuzzle, currentTile, nextTile;

currentLevel = 0;
inventory = [];


$(document).ready(function() {
	
	buildMap(".map", levels[currentLevel]);
	
	$(document).on("keydown", function(event) {
		switch(event.keyCode) {
			case 27: // escape
				event.preventDefault();
				event.stopPropagation();
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

		if (tile.pos.row) {
			$row = $map.find(".row").eq(tile.pos.row);
			$tile = $row.find(".tile").eq(tile.pos.col).removeClass("green");

			$tile.data(tile).addClass(tile.classname);
		}
	});
	
	$map.on("keydown", function(event) {
		var $rows, pos;

        $rows = $map.find(".row");
        currentTile = $map.find(".hero");
        pos = currentTile.data("pos");

        switch (event.keyCode) {
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
            var attempts, requires;

            if (nextTile.hasClass("green")) {

                currentTile.toggleClass("hero green");
                nextTile.toggleClass("hero green");
                logAction("you moved " + direction);

            } else if (nextTile.data("type") == "exit") {

                currentTile.toggleClass("hero green");
                nextTile.toggleClass("hero exit");
				openDialog(nextTile.data());
                logAction("you reached the exit ");

            } else if (nextTile.hasClass("wall")) {

                logAction("you ran into wall");

            } else if (nextTile.hasClass("secret")) {

                attempts = nextTile.data("attempts");

                if (isNaN(attempts)) {
                    nextTile.data({"attempts": 1}).addClass("shaking");
                    window.setTimeout(function () {
                        nextTile.removeClass("shaking");
                    }, 300);
                    logAction("you ran into a strange looking wall");
                } else {
                    if (nextTile.data("attempts") < 2) {
                        nextTile.data({"attempts": ++attempts}).addClass("shaking");
                        window.setTimeout(function () {
                            nextTile.removeClass("shaking");
                        }, 300);
                        logAction("you pushed a strange looking wall");
                    } else {
                        nextTile.toggleClass("secret green");
                        logAction("you found a secret passage");
                    }
                }

            } else if (nextTile.data("type") == "puzzle" ||
                nextTile.data("type") == "book") {

				if (!nextTile.data("solved")) {
					openDialog(nextTile.data());
					logAction("you found" + nextTile.data("info"));
				}

			} else if (nextTile.data("type") == "item") {

                if (!nextTile.data("unlocked")) {
                    currentTile.toggleClass("hero green");
                    nextTile.toggleClass("hero " + nextTile.data("classname"));
                    nextTile.data("unlocked", true);
                    inventory.push(nextTile.data());
                    updateInventory();
                    logAction("you found" + nextTile.data("info"));
                } else {
                    currentTile.toggleClass("hero green");
                    nextTile.toggleClass("hero green");
                    logAction("you moved " + direction);
                }
            }
        }
	});
}

function openDialog(data) {
	var $dlg;

	currentPuzzle = data;

	$dlg = $(".overlay .dialog").addClass(data.dialog.classname).html(data.dialog.html);

	_.each(data.requires, function(elem, ind, list) {
		var found =  _.findWhere(inventory, {id: elem});
		if( found ) {
			data.requires.splice(ind, 1);
			inventory.splice(_.indexOf(inventory, found), 1);
		}
	})
	updateInventory();

	if ( !data.requires.length ) {
		$dlg.addClass("unlocked");
		data.unlocked = true;
	}

	$(".map").attr({
		tabindex: -1
	}).blur();
	$(".overlay").addClass("visible");

	if (typeof data.actions.onReady === "function") {
		data.actions.onReady($dlg);
	}
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
	var $stash;
	$stash = $(".inventory").empty();
	for( var i = 0; i < inventory.length; i++) {
		$("<div/>").addClass("tile " + inventory[i].classname).appendTo($stash);
	};

}

function logAction(str) {
	$(".log").html(str);
}
		
		
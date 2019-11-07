var currentLevel, inventory, currentPuzzle, currentTile, nextTile;

currentLevel = 0;
inventory = [];


$(document).ready(function() {

	buildMap(".map", levels[currentLevel]);
    loadSounds();
	$(document).on("keydown.game", function(event) {
		if (event.keyCode === 27 && $(".dialog").is(":visible")) {
            event.preventDefault();
            event.stopPropagation();
            closeDialog();
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
			
			var isGem, $tile;

			isGem = tile.indexOf("gem") >=0;
			$tile = $("<div/>")
				.addClass("tile " + tile)
				.data({
					"type": isGem ? "item" : tile,
                    "info": isGem ? " a gem" : "",
                    "classname": tile,
                    "pos": {
						"row": i,
						"col": j
					}
				});
			if (tile == 'bubble') {
				$tile.on("click.game", function(){
					playSound("pop", 1, 0);
					$tile.off("click.game").toggleClass("bubble green");
				});
			}
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
	
	$map.off("keydown.game").on("keydown.game", function(event) {
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
            var attempts;

            if (nextTile.hasClass("green")) {

                currentTile.toggleClass("hero green");
                nextTile.toggleClass("hero green");
                logAction("you moved " + direction);

            } else {
	            
	            switch (nextTile.data("type")) {
		            
		            case "exit":

		                currentTile.toggleClass("hero green");
		                nextTile.toggleClass("hero exit");
						openDialog(nextTile.data());
		                logAction("you reached the exit ");
		                break;

					case "wall":

						logAction("you ran into wall");
						break;

            		case "bubble":
						
						nextTile.addClass("wobble");
						window.setTimeout(function() {
							$(".wobble").removeClass("wobble");
						}, 300)
						logAction("you ran into a bubble");
						break;
	            
	        		case "secret":
		
		                attempts = nextTile.data("attempts");
		
		                if (isNaN(attempts)) {
		                    nextTile.data({"attempts": 1}).addClass("shaking");
		                    window.setTimeout(function () {
		                        nextTile.removeClass("shaking");
		                    }, 300);
		                    playSound("wall", 1, 0);
		                    logAction("you ran into a strange looking wall");
		                } else {
		                    if (nextTile.data("attempts") < 2) {
		                        nextTile.data({"attempts": ++attempts}).addClass("shaking");
		                        window.setTimeout(function () {
		                            nextTile.removeClass("shaking");
		                        }, 300);
		                        playSound("wall", 1, 0);
		                        logAction("you pushed a strange looking wall");
		                    } else {
		                        nextTile.toggleClass("secret " + nextTile.data("data").hidden.classname).data({
		                            type: nextTile.data("data").hidden.type,
		                            info: nextTile.data("data").hidden.info,
		                            classname: nextTile.data("data").hidden.classname
		                        });
		                        playSound("explosion", .8, 0);
		                        logAction("you found a secret passage");
		                    }
		                }
		                break;

			         case "puzzle":
					 case "book":

		                if (!nextTile.data("solved")) {
		                    openDialog(nextTile.data());
		                    logAction("you found" + nextTile.data("info"));
		                }
		                break;

					case "door":
		
		                if (!nextTile.data("unlocked")) {
			                _.each(nextTile.data("requires"), function (item, index, list) {
				                if ( checkInventory(item) ) {
					                removeFromInventory(item);
					                nextTile.data("requires").splice(index, 1);
				                }
			                });
			                
			                if (!nextTile.data("requires").length) {
				                nextTile.data({
					                unlocked: true,
									solved: true
								}).toggleClass("door green");
					            logAction("you have unlocked the door");
			                } else {
				                openDialog(nextTile.data());
								logAction("you found " + nextTile.data("info"));
			                }
			            }
			            break;

					case "switch":
		
		                nextTile.data("actions").toggleSwitch(nextTile);
		                break;
		
					case "item":
		
		                if (!nextTile.data("unlocked")) {
		                    currentTile.toggleClass("hero green");
		                    nextTile.toggleClass("hero " + nextTile.data("classname"));
		                    nextTile.data("unlocked", true);
		                    inventory.push(nextTile.data());
		                    updateInventory();
		                    playSound("getItem", .5, 0);
		                    logAction("you found" + nextTile.data("info"));
		                } else {
		                    currentTile.toggleClass("hero green");
		                    nextTile.toggleClass("hero green");
		                    logAction("you moved " + direction);
		                }
		                break;
		        }
		    }
        }
	});
}

function openDialog(data) {
	var $dlg;

	currentPuzzle = data;

	$dlg = $(".overlay .dialog").addClass(data.dialog.classname).html(data.dialog.html);

	_.each(currentPuzzle.requires, function(elem, ind, list) {
		var found =  _.findWhere(inventory, {id: elem});
		if( found ) {
            currentPuzzle.requires.splice(ind, 1);
			inventory.splice(_.indexOf(inventory, found), 1);
		}
	});
	updateInventory();

	if ( !data.requires.length ) {
		$dlg.addClass("unlocked");
		data.unlocked = true;
	}

    if ( !data.unlocked && data.dialog.hint.length ) {
        $dlg.find(".hint").text(data.dialog.hint).show();
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

function checkInventory(id) {
	return _.findWhere(inventory, {id: id});
}
function addToInventory(id) {
	var found =  _.findWhere(inventory, {id: id});
	if( !found ) {
		inventory.push(found);
	}
	updateInventory();
}
function removeFromInventory(id) {
	var found =  _.findWhere(inventory, {id: id});
	if( found ) {
		inventory.splice(_.indexOf(inventory, found), 1);
	}
	updateInventory();
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

function loadSounds() {
    var queue, assets, sounds;
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    assets = [
        {id:"themeMusic", src:"_/snd/theme_music.mp3"},
        {id:"click", src:"_/snd/click.mp3"},
        {id:"getItem", src:"_/snd/get_item.mp3"},
        {id:"error", src:"_/snd/error.mp3"},
        {id:"success", src:"_/snd/success.mp3"},
        {id:"win", src:"_/snd/ding.mp3"},
        {id:"wall", src:"_/snd/wall.mp3"},
        {id:"explosion", src:"_/snd/explosion.mp3"},
        {id:"pop", src:"_/snd/pop.mp3"}
    ];
    queue.on("complete", function() {
        //playSound("themeMusic", .3, -1);
    }, this);
    queue.loadManifest(assets);
}

function playSound(name, volume, loop) {
    var props;
    if(window[name]) {
        window[name].play();
    } else {
        props = new createjs.PlayPropsConfig().set({
            loop: loop ? -1 : 0,
            volume: volume
        });
        window[name] = createjs.Sound.play(name, props);
    }

}
var utils = angular.module('utils', ['ngCookies']),
	app = angular.module('amaze', ['ngRoute', 'ngSanitize', 'utils']);

app.config(['$routeProvider', '$locationProvider', 
	
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl : '_/tpl/splash.tpl.html',
			controller  : 'splashCtrl'
		}).when('/intro/', {
			templateUrl : '_/tpl/intro.tpl.html',
			controller  : 'introCtrl'
		}).when('/menu/', {
			templateUrl : '_/tpl/menu.tpl.html',
			controller  : 'menuCtrl'
		}).when('/gameinfo/:page?', {
			templateUrl : '_/tpl/gameinfo.tpl.html',
			controller  : 'gameInfoCtrl'
		}).when('/level/', {
			templateUrl : '_/tpl/level.tpl.html',
			controller  : 'levelCtrl'
		}).when('/puzzle1/', {
			templateUrl : '_/tpl/puzzle1.tpl.html',
			controller  : 'puzzle1Ctrl'
		}).when('/puzzle2/', {
			templateUrl : '_/tpl/puzzle2.tpl.html',
			controller  : 'puzzle2Ctrl'
		}).when('/outro/', {
			templateUrl : '_/tpl/intro.tpl.html',
			controller  : 'outroCtrl'
		}).when('/summary/', {
			templateUrl : '_/tpl/summary.tpl.html',
			controller  : 'summaryCtrl'
		});
	}
	
]).run(['$rootScope', '$http', '$location', '$storage', '$route', '$interval', '$timeout',
		
	function($rootScope, $http, $location, $storage, $route, $interval, $timeout) {

		var browser, regex;
		browser = navigator.userAgent || navigator.vendor || window.opera;
		$rootScope.isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(browser) ||
			                  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test( browser.substr(0,4) );

		$rootScope = _.extend($rootScope, {
			gameinfo: [],
			intro: [],
			levels: [],
			inventory: []
		});
		
		$rootScope.game = _.extend( {
				"uuid": generateUUID(),
				"settings": {
					"music": true,
					"animation": true,
					"fullscreen": false
				},
				"started": false,
				"firstTime": true,
				"completed": false,
				"allGems": false,
				"level": {
					"id": 0,
					"floorplan": [],
					"currTile": {},
					"nextTileId": -1
				},
				"inventory": []
			},
			$storage.getObject(app.name) || {}
		);
		
		$rootScope.saveState = function() {
			$storage.setObject(app.name, $rootScope.game);
		};
		
		$http.get('_/' + app.name + '_data.js')
			.success(function(data, status, headers, config) {
				$rootScope.gameinfo = data.gameinfo;
				$rootScope.intro = data.intro;
				$rootScope.levels = data.levels;
				$rootScope.outro = data.outro;
				$rootScope.saveState();
				preloadAssets();
			})
			.error(function(data, status, headers, config) {
				console.log('error: ' + status);
			});

		function preloadAssets() {
			var queue, imgArray, $elem, sounds;

			queue = new createjs.LoadQueue();
			queue.installPlugin(createjs.Sound);
			assets = [
				{id:"book", src: "_/img/book/book_bg.png"}
			];
			sounds = [
				{id:"main_theme", src:"_/snd/theme_music.mp3"},
				{id:"click", src:"_/snd/click.mp3"},
				{id:"get_item", src:"_/snd/get_item.mp3"},
				{id:"error", src:"_/snd/error.mp3"},
				{id:"success", src:"_/snd/success.mp3"},
				{id:"exit", src:"_/snd/ding.mp3"},
				{id:"hit_wall", src:"_/snd/wall.mp3"},
				{id:"explosion", src:"_/snd/explosion.mp3"},
				{id:"pop", src:"_/snd/pop.mp3"},
				{id:"boing", src:"_/snd/boing.mp3"},
				{id:"win", src:"_/snd/fanfare.mp3"}
			];

			/*_.each($rootScope.gameinfo.images, function(el, ind) {
				assets.push({id: ind, src: el});
			});*/
			_.each($rootScope.intro, function(el, ind) {
				assets.push({id: "intro_" + (++ind), src: el.image});
			});
			_.each($rootScope.outro, function(el, ind) {
				assets.push({id: "outro_" + (++ind), src: el.image});
			});

			assets = assets.concat(sounds);

			queue.on("complete", function() {
				$rootScope.assetsLoaded = true;
				$rootScope.$apply();
			}, this);

			queue.loadManifest(assets);

		}

		$rootScope.playSound = function(name, props, instance) {
			var conf, inst;
			if ( instance && $rootScope[instance] ) { 
				inst = $rootScope[instance];
				if ( inst.playState != "playSucceeded" ) {
					inst.play();
				}
			} else {
				conf = new createjs.PlayPropsConfig().set(_.extend({
					loop: 0,
					volume: .1
				}, props));
				$rootScope[instance] = createjs.Sound.play(name, conf);
			}
		}

		$rootScope.stopSound = function(instance) {
			if ($rootScope[instance]) {
				$rootScope[instance].stop();
			}
		};

		$rootScope.ambientSoundName = "main_theme";

		$rootScope.toggleAmbientSound = function($event) {
			var instance = "ambientSound";
			if ($event.type == 'click' || $event.keyCode == 32 || $event.keyCode == 13) {
				$event.preventDefault();
				if ($rootScope.game.settings.music) {
					$rootScope.stopSound(instance);
					window.gtag("event", "Ambient sound", { event_category: "User Experience", event_label: "Music turned off"});
				} else {
					$rootScope.playSound($rootScope.ambientSoundName, {loop: -1, volume: .1}, instance);
					window.gtag("event", "Ambient sound", { event_category: "User Experience", event_label: "Music turned on"});
				}
				$rootScope.game.settings.music = !$rootScope.game.settings.music;
				$rootScope.saveState();
				$(".map").focus();
			}
		};
		
		$rootScope.toggleAnimation = function($event) {
			var exit, blob, prof;
			if ($event.type == 'click' || $event.keyCode == 32 || $event.keyCode == 13) {
				$event.preventDefault();
				exit = _.filter($rootScope.game.level.floorplan, function(item) {
					return item.class.indexOf("exit") >= 0;
				});
				blob = _.filter($rootScope.game.level.floorplan, function(item) {
					return item.class.indexOf("blob") >= 0;
				});
				prof = _.filter($rootScope.game.level.floorplan, function(item) {
					return item.class.indexOf("prof") >= 0;
				});
				
				if ($rootScope.game.settings.animation) {
					if (exit.length) { exit[0].class = exit[0].class.replace("exit_animated", "exit"); }
					if (blob.length) { blob[0].class = blob[0].class.replace("blob_animated", "blob"); }
					if (prof.length) { prof[0].class = prof[0].class.replace("prof_animated", "prof"); }
					window.gtag("event", "Animation", { event_category: "User Experience", event_label: "Animation turned off"});
				} else {
					if (exit.length) { exit[0].class = exit[0].class.replace("exit", "exit_animated"); }
					if (blob.length) { blob[0].class = blob[0].class.replace("blob", "blob_animated"); }
					if (prof.length) { prof[0].class = prof[0].class.replace("prof", "prof_animated"); }
					window.gtag("event", "Animation", { event_category: "User Experience", event_label: "Animation turned on"});
				}
				$rootScope.game.settings.animation = !$rootScope.game.settings.animation;
				$rootScope.saveState();
				$(".map").focus();
			}
		};
		
		$rootScope.toggleDialogFocus = function(show) {
			var $focusable, $overlay;

			$overlay = $(".overlay");
			$focusable = $('button, input, submit, reset, select, textarea, a, [tabindex]').filter( function(ind, elem) {
				return !$overlay.has(elem).length;
			});

			if ( show ) {
				$focusable.each( function(index, item) {
					var $me = $(item);
					if( item.hasAttribute('tabindex') ) {
						$me.data({ 'tabindex': $me.attr('tabindex') });
					}
					$me.attr('tabindex', -1);
				});
				$rootScope.focusElement( $overlay.find('.dialog') );
			} else {
				$focusable.each( function(index, item) {
					var $me = $(item);
					if ( $me.data('tabindex') ) {
						$me.attr('tabindex', $me.data('tabindex') );
					} else {
						$me.removeAttr('tabindex');
					}
				});
			}
		};

		$rootScope.focusElement = function(selector) {
			$timeout( function(){
				if (typeof selector == 'string') {
					$(selector).focus();
				} else {
					selector.focus();
				}
			}, 300);
		};

		$rootScope.openMenu = function($event) {
			$event.preventDefault();
			if ($event.type == 'click' || $event.keyCode == 32 || $event.keyCode == 13) {
				$location.path("/menu");
				window.gtag("event", "Menu", { event_category: "User Experience", event_label: "Exit to Menu"});
			}
		};

		$rootScope.moveFocusOnTab = function ($event) {
			var $focusable, ind, next;
			$event.preventDefault();
			if ($event.keyCode == 9) {
				$focusable = $("button, [tabindex]").filter(":visible");
				ind = $focusable.index( $(":focus") );
				if ($event.shiftKey) {
					next = (ind == 0) ? $focusable.length - 1 : --ind;
				} else {
					next = (ind > $focusable.length - 2) ? 0 : ++ind;
				}
				$focusable.eq(next).focus();
			}
		};
		$rootScope.noMouseMessage = function() {
			$rootScope.updateStatus("Mouse doesn't work here. Use keyboard only.", true);
		}


		$rootScope.actionLog = "";

		$rootScope.updateStatus = function(str, persist) {
			$timeout.cancel($rootScope.statusTimer);
			$rootScope.actionLog = str;
			if(!persist) {
				$rootScope.statusTimer = $timeout(function () {
					$rootScope.actionLog = "";
				}, 600);
			}
		};

	}
]);

app.controller('splashCtrl', ['$rootScope', '$scope', '$location', '$timeout',
	function($rootScope, $scope, $location, $timeout) {

		$rootScope.assetsLoaded = true;
		$rootScope.saveState();

		$scope.startGame = function() {
			$location.path("/menu/");
		};
		
	}
]);

app.controller('menuCtrl', ['$rootScope', '$scope', '$location', '$timeout',
	function($rootScope, $scope, $location, $timeout) {

		$rootScope.stopSound("ambientSound");

		if (!$rootScope.assetsLoaded) {
			$location.path('/');
		} else {
			$scope.startNew = function() {
				$rootScope.game.started = true;
				$rootScope.game.firstTime = true;
				$rootScope.game.completed = false;
				$rootScope.game.level = {
					id: 0,
					floorplan: [],
					currTile: {},
					nextTileId: -1
				};
				$rootScope.game.inventory = [];
				$rootScope.game.allGems = false;
				$rootScope.saveState();
				$location.path('/intro/');
				window.gtag("event", "Start", { event_category: "Gameplay", event_label: "Start new game"});
			};
			$scope.resumeSaved = function($event) {
				if ($rootScope.game.completed) {
					$location.path('/summary/');
				} else {
					$location.path('/level/');
				}
				window.gtag("event", "Resume", { event_category: "Gameplay", event_label: "Resume saved game"});
			};
			$scope.showInstructions = function($event) {
				$location.path('/gameinfo/howto');
				window.gtag("event", "Instructions", { event_category: "User Experience", event_label: "Open How To Play"});
			};
			$scope.showObjectives = function($event) {
				$location.path('/gameinfo/objectives');
				window.gtag("event", "Objectives", { event_category: "User Experience", event_label: "Open Learning Objectives"});
			};
		}
	}
]);

app.controller('gameInfoCtrl', ['$rootScope', '$scope', '$location', '$route', '$timeout',
	function($rootScope, $scope, $location, $route, $timeout) {

		var page;

		page = $route.current.pathParams.page;

		if ( $rootScope.gameinfo[page] ) {

			$scope.message = $rootScope.gameinfo[page];
			$rootScope.focusElement(".content");
			$scope.gameInfoKeydownHandler = function ($event) {
				//$event.preventDefault();
				if ($event.keyCode == 27) {
					$location.path("/menu");
				}
			};

		} else {
			$location.path("/menu");
		}

	}
]);

app.controller('introCtrl', ['$rootScope', '$scope', '$location', '$timeout',
	function($rootScope, $scope, $location, $timeout) {

		if (!$rootScope.assetsLoaded) {
			$location.path('/');
		} else {
			$scope.currentSlide = 0;
			$scope.continueGame = function($event) {
				if ($event.type == 'click' || $event.keyCode == 39) {
					$scope.message = "";
					if ($scope.currentSlide < $rootScope.intro.length) {
						$scope.isVisible = false;
						$timeout(function () {
							$scope.background = $rootScope.intro[$scope.currentSlide].image;
							$scope.message = $rootScope.intro[$scope.currentSlide].content;
							$scope.currentSlide++;
							$scope.isVisible = true;
							$rootScope.focusElement("#boxContent");
						}, 800, true, $scope);
					} else {
						$scope.isVisible = false;
						$location.path('/level/');
					}
				}
			};
			$scope.continueGame({'type': 'click'});
			$scope.skipIntro = function() {
				$scope.isVisible = false;
				$location.path('/level/');
			}
		}	
	}
]);

app.controller('levelCtrl', ['$rootScope', '$scope', '$location', '$storage', '$route', '$timeout',
	function($rootScope, $scope, $location, $storage, $route, $timeout) {

		var level, item, obj, ind = 0, blobClass;

		if (!$rootScope.assetsLoaded) {
			$location.path('/menu/');
		} else {
			if ($rootScope.game.settings.music) {
				$rootScope.playSound($rootScope.ambientSoundName, {loop: -1, volume: .1}, "ambientSound");
			}

			if ($rootScope.game.firstTime) {
				$scope.message = $rootScope.gameinfo.howto;
				$rootScope.toggleDialogFocus(true);
				$rootScope.game.firstTime = false;
				$rootScope.saveState();
			} else {
				$scope.message = "";
			}
			$scope.levelCompleted = false;
			level = $rootScope.levels[ $rootScope.game.level.id ];

			if (!$rootScope.game.level.floorplan.length) {

				$rootScope.game.level.floorplan = [];
				_.each(level.floorplan, function (row, x) {
					_.each(row, function (tile, y) {
						item = _.findWhere(level.items, {row: x, col: y});
						obj = {
							"id": ind++,
							"class": item ? item.class : tile,
							"collectable": item ? item.collectable : false,
							"row": x,
							"col": y,
							"data": item && item.data ? item.data : null
						};
						if (tile.indexOf("exit") >= 0 ) {
							if ($rootScope.game.settings.animation) {
								obj.class = obj.class.replace("exit", "exit_animated");
							}
						}
						if (tile.indexOf("prof") >= 0 ) {
							if ($rootScope.game.settings.animation) {
								obj.class = obj.class.replace("prof", "prof_animated");
							}
						}
						if (tile == "bubble") {
							obj.data = { attempts: 5 };
						}
						$rootScope.game.level.floorplan.push(obj);
						if (tile == "blob") {
							obj.class = $rootScope.game.settings.animation ? "blob_animated" : "blob";
							obj.class += " entry";
							$rootScope.game.level.currTile = $rootScope.game.level.floorplan[$rootScope.game.level.floorplan.length - 1];
						}
					});
				});
			}
			$rootScope.game.level.lesson = level.lesson;
			$rootScope.game.level.description = level.description;

			$scope.openHelp = function($event) {
				if ($event.type == 'click' || $event.keyCode == 32 || $event.keyCode == 13) {
					$scope.message = $rootScope.gameinfo.howto;
					$rootScope.toggleDialogFocus(true);
					window.gtag("event", "Instructions", {
						event_category: "User Experience",
						event_label: "Open How To Play"
					});
				}
			};

			$scope.closePopupDialog = function() {
				$rootScope.toggleDialogFocus(false);
				$scope.message = "";
				$scope.isBook = false;
				$rootScope.updateStatus("");
				if ($scope.levelCompleted) {
					$timeout.cancel($scope.timeout);
					window.gtag("event", "Level completed", { event_category: "Gameplay", event_label: "Level " + ($rootScope.game.level.id + 1) + " completed"});
					if ($rootScope.game.level.id < $rootScope.levels.length - 1) {
						$rootScope.game.inventory = _.filter($rootScope.game.inventory, function(item) {
							return item.class.indexOf("gem") >= 0;
						});
						$rootScope.game.level.id += 1;
						$rootScope.game.level.floorplan = [];
						$rootScope.game.level.currTile = {};
						$rootScope.saveState();
						$route.reload()
					} else {
						$location.path("/outro");
					}
				} else {
					if ($scope.isChest) {
						$rootScope.game.inventory.push({
							id: $scope.nextTile.id,
							class: "tile " + $scope.nextTile.data.treasure.class
						});
						$scope.isChest = false;
					}
					if ($scope.isProf && !$rootScope.game.allGems) {
						$rootScope.game.allGems = true;
						_.each($rootScope.game.inventory, function(item) {
							item.counter += 3;
						});
						$rootScope.playSound("get_item");
						$timeout( function() { $rootScope.playSound("get_item") }, 50);
						$timeout( function() { $rootScope.playSound("get_item") }, 100);
						$timeout( function() { $rootScope.playSound("get_item") }, 150);
					}
					$rootScope.saveState();
					$(".map").focus();
				}
			};

			$scope.dialogKeyDownHandler = function(event) {
				event.preventDefault();
				event.stopPropagation();
				if ( event.keyCode == 27) {
					$scope.closePopupDialog();
				}
			};

            $scope.tileClickHandler = function($event, tile) {
                if (tile.class == "bubble") {
                    tile.class="green";
                    $rootScope.playSound("pop");
                }
            };

			$scope.mapKeyDownHandler = function(event) {
				var row, col;
				row = $rootScope.game.level.currTile.row;
				col = $rootScope.game.level.currTile.col;
				switch (event.keyCode) {
					case 37: // left
						takeAction(event, row, --col, "left");
						break;
					case 38: // top
						takeAction(event, --row, col, "up");
						break;
					case 39: // right
						takeAction(event, row, ++col, "right");
						break;
					case 40: // bottom
						takeAction(event, ++row, col, "down");
						break;
					case 9:
						$rootScope.moveFocusOnTab(event);
						break;
					default:
						//console.log(event.keyCode)
						break;
				}
				$rootScope.saveState();
			};

			$scope.$on('$viewContentLoaded', function(){
				$(".map").focus();
			});
		}

		function takeAction(event, row, col, dir) {
			var ind, inventoryIndex, inventoryItem, switchDelay;
			ind = _.findWhere($rootScope.game.level.floorplan, {row: row, col: col}).id;
			$scope.nextTile = $rootScope.game.level.floorplan[ind];
			
			if ($scope.nextTile.collectable) {

				if ($scope.nextTile.class.indexOf("gem") >=0) {
					inventoryIndex = _.findIndex($rootScope.game.inventory, {class: "tile " + $scope.nextTile.class});
					if (inventoryIndex >= 0) {
						++$rootScope.game.inventory[inventoryIndex].counter;
					} else {
						$rootScope.game.inventory.push({
							id: $scope.nextTile.id,
							class: "tile " + $scope.nextTile.class,
							counter: 1
						});
					}
				} else {
					$rootScope.game.inventory.push({
						id: $scope.nextTile.id,
						class: "tile " + $scope.nextTile.class
					});
				}
				
				$rootScope.updateStatus("You collected " + $scope.nextTile.class, true);
				$rootScope.playSound("get_item");
				$scope.nextTile.collectable = false;
				$scope.nextTile.class = "green";
				moveBlob($scope.nextTile);
				
			} else {
				console.log($scope.nextTile.class);
				switch ($scope.nextTile.class) {

					case "green":
						$rootScope.updateStatus("<span class='readersonly'>You moved " + dir + "</span>");
						moveBlob($scope.nextTile);
						break;

					case "wall":
						$rootScope.updateStatus("<span class='readersonly'>You bumped into wall</span>");
						break;

					case "green entry":
						console.log("entry");
						$rootScope.updateStatus("<span class='readersonly'>Level " + ($rootScope.game.level.id + 1) + " entrance: " + $rootScope.game.level.description + "</span>", true);
						moveBlob($scope.nextTile);
						break;

					case "exit":
					case "exit down":
					case "exit_animated":
					case "exit_animated down":

						$rootScope.updateStatus("You found exit", true);
						$scope.message = level.lesson;
						$rootScope.toggleDialogFocus(true);
						$scope.levelCompleted = true;
						$rootScope.playSound("exit", {volume: .1});
						//moveBlob($scope.nextTile);
						break;

					case "book":

						$rootScope.updateStatus("You found Master's diary");
						$scope.isBook = true;
						$scope.message = $scope.nextTile.data.content;
						$rootScope.updateStatus("Press Esc to close the diary", true);
						$rootScope.toggleDialogFocus(true);
						break;

					case "door":

						if ($scope.nextTile.data.requires >= 0) {
							inventoryItem = _.findWhere($rootScope.game.inventory, { "id": $scope.nextTile.data.requires });
							if ( inventoryItem ) {
								$rootScope.game.inventory = _.without($rootScope.game.inventory, inventoryItem);
								$rootScope.updateStatus("You opened a door", true);
								$scope.nextTile.class = "green";
								$rootScope.playSound("success");
							} else {
								$rootScope.updateStatus("You found a locked door", true);
								$rootScope.playSound("hit_wall");
							}
						} else {
							$rootScope.updateStatus("This door is opened remotely", true);
							$rootScope.playSound("hit_wall");
						}
						break;

					case "secret":

						if($scope.nextTile.data.attempts > 1) {
							switch($scope.nextTile.data.attempts) {
								case 3:
									$rootScope.updateStatus("You found cracked wall", true);
									break;
								case 2:
									$rootScope.updateStatus("The wall gave in a little.", true);
									break;
							}
							$scope.nextTile.data.attempts--;
							$rootScope.playSound("hit_wall");
							$scope.nextTile.class = "secret shaking";
							$timeout( function () { $scope.nextTile.class = "secret"; }, 100 );
						} else {
							$rootScope.updateStatus("You found a secret", true);
							$scope.nextTile.class = $scope.nextTile.data.treasure.class;
							$scope.nextTile.collectable = $scope.nextTile.data.treasure.collectable;
							$rootScope.playSound("explosion");
						}
						break;

					case "chest":

						inventoryItem = _.findWhere($rootScope.game.inventory, { "id": $scope.nextTile.data.requires });
						if ( inventoryItem ) {
							$rootScope.game.inventory = _.without($rootScope.game.inventory, inventoryItem);
							$rootScope.updateStatus("You collected " + $scope.nextTile.data.treasure.name, true);
							$scope.nextTile.class = "chest unlocked";
							$scope.message = "<div class='treasure " + $scope.nextTile.data.treasure.class + "'></div>";
							$scope.isChest = true;
							$rootScope.toggleDialogFocus(true);
							$rootScope.playSound("success");
						} else {
							$rootScope.updateStatus("You found locked chest", true);
							$rootScope.playSound("hit_wall");
						}
						break;
						
					case "chest unlocked":
						$rootScope.updateStatus("You found empty unlocked chest", true);
						$rootScope.playSound("hit_wall");
						break;

					case "switch":
						$rootScope.playSound("click");
						inventoryItem = _.findWhere($rootScope.game.inventory, { "id": $scope.nextTile.data.requires });
						controlledItem = $rootScope.game.level.floorplan[ $scope.nextTile.data.controls ];
						switchDelay = $scope.nextTile.data.timeout;
						if (inventoryItem) {
							$scope.nextTile.class = "switch on frozen";
							$rootScope.updateStatus("The switch is frozen on. A door has opened elsewhere.", true);
							$rootScope.game.inventory = _.without($rootScope.game.inventory, inventoryItem);
							//switchDelay *= 3;
						} else {
							$scope.nextTile.class = "switch on";
							$rootScope.updateStatus("You turned the switch on. A door has opened elsewhere.", true);
							$scope.timeout = $timeout(function() {
								var switchTile, doorTile;
								switchTile = arguments[0];
								doorTile = $rootScope.game.level.floorplan[ switchTile.data.controls ];
								$rootScope.playSound("click");
								switchTile.class = "switch";
								$rootScope.updateStatus("The switch is off. A door has closed elsewhere.", true);
								doorTile.class = "door blinking";
								$timeout(function() { arguments[0].class = "door"; }, 1200, true, doorTile);
							}, switchDelay, true, $scope.nextTile);
						}
						controlledItem.class = "green";
						break;
						
					case "switch on":
						$rootScope.updateStatus("The switch is on. A door has opened elsewhere.", true);
						break;

					case "switch on frozen":
						$rootScope.updateStatus("The switch is frozen on. A door has opened elsewhere.", true);
						break;

					case "bubble":

						if (event.shiftKey && event.ctrlKey) {
							$scope.nextTile.class = "green";
							$rootScope.saveState();
							moveBlob($scope.nextTile);
						$rootScope.updateStatus("<span class='readersonly'>You popped the balloon and moved " + dir + "</span>", true);
							$rootScope.playSound("pop");
						} else {
							if ( --$scope.nextTile.data.attempts % 5 === 0) {
								$rootScope.updateStatus("<span class='readersonly'>Press Ctrl + Shift + arrow button to pop balloons.</span> Try popping the balloons with your mouse", true);
							} else {
								$rootScope.updateStatus("Your way is blocked by balloon");
							}
							$scope.nextTile.class = $scope.nextTile.class + " wobble";
							$rootScope.playSound("boing", {volume: 1});

							$timeout(function () {
								var nextTile = arguments[0];
								nextTile.class = "bubble";
								$rootScope.saveState();
							}, 300, true, $scope.nextTile);
						}
						break;

					case "puzzle1":

						$rootScope.game.level.nextTileId = ind;
						$rootScope.updateStatus("You found a locked door", true);
						$rootScope.playSound("hit_wall");
						$rootScope.saveState();
						$location.path('/puzzle1');
						break;

					case "puzzle2":

						$rootScope.game.level.nextTileId = ind;
						$rootScope.updateStatus("You found a locked door", true);
						$rootScope.playSound("hit_wall");
						$rootScope.saveState();
						$location.path('/puzzle2');
						break;

					case "prof":
					case "prof_animated":

						$rootScope.updateStatus("You found Prof. X", true);
						$scope.isProf = true;
						if ($rootScope.game.allGems) {
							$scope.message =  $scope.nextTile.data.short;
						} else {
							$scope.message =  $scope.nextTile.data.long;
						}
						$rootScope.saveState();
						$rootScope.toggleDialogFocus(true);
						break;

					case "door last":
						if ($rootScope.game.allGems) {
							$location.path("/outro");
						} else {
							$rootScope.updateStatus("You don't have enough gems to open this door", true);
						}
						break;
				}
			}
		}

		function moveBlob(nextTile) {
			var blobClass, currTile;
			blobClass = $rootScope.game.settings.animation ? "blob_animated" : "blob";
			currTile = _.findWhere($rootScope.game.level.floorplan, {"id": $rootScope.game.level.currTile.id});
			currTile.class = currTile.class.replace(blobClass, "green");
			nextTile.class = nextTile.class.replace("green", blobClass);
			$rootScope.game.level.currTile = nextTile;
			console.log(currTile, nextTile);
		}
	}
]);

app.controller('puzzle1Ctrl', ['$rootScope', '$scope', '$location', '$timeout',
	function($rootScope, $scope, $location, $timeout) {

		var nextTile, correctOrder, pressedOrder;

		correctOrder = [2,0,1,3];
		pressedOrder = [];

		$rootScope.focusElement(".content");

		$scope.buttons = [
			{ pressed: false, label: "C" },
			{ pressed: false, label: "A" },
			{ pressed: false, label: "D" },
			{ pressed: false, label: "B" }
		];
		$scope.locked = true;
		$scope.error - true;
		$scope.message = "LOCKED";
		nextTile = $rootScope.game.level.floorplan[$rootScope.game.level.nextTileId];
		$scope.showPanel = nextTile.ready;
		$scope.hint = nextTile.data.hint;
		
		$scope.openHelp = function($event) {
			/*if ($event.type == 'click' || $event.keyCode == 32 || $event.keyCode == 13) {
				$scope.message = "Under construction...";
				$rootScope.toggleDialogFocus(true);
				window.gtag("event", "Instructions", {
					event_category: "User Experience",
					event_label: "Open How To Play"
				});
			}*/
		};
		
		$scope.checkForMissingPlate = function() {
			$scope.inventoryItem = _.findWhere($rootScope.game.inventory, { "id": nextTile.data.requires });
			if ( $scope.inventoryItem ) {
				nextTile.ready = true;
				$scope.showPanel = nextTile.ready;
				$rootScope.game.inventory = _.without($rootScope.game.inventory, $scope.inventoryItem);
				$rootScope.actionLog = "";
				$rootScope.saveState();
			}
			if (!$scope.showPanel) {
				$rootScope.updateStatus("A metal piece is missing from the lock", true);
			}
		};

		$scope.puzzle1KeyDownHandler = function(event) {
			switch (event.keyCode) {
				case 27:
					$location.path('/level');
					break;
				case 9:
					$rootScope.moveFocusOnTab(event);
					break;
			}
		};
		$scope.toggleButton = function($event, $index) {
			var btn = $scope.buttons[$index];
			switch ($event.keyCode) {
				case 13:
				case 32:
					if (!btn.pressed) {
						btn.pressed = true;
						pressedOrder.push($index);
						$rootScope.playSound("click");
					}
					if (pressedOrder.length == $scope.buttons.length) {
						validatePuzzle();
					}
					break;
				case 37: // left
				case 38: // top
					if($index > 0) {
						$(".togglebutton").eq(--$index).focus();
					}
					break;
				case 39: // right
				case 40: // bottom
					if($index < $scope.buttons.length - 1) {
						$(".togglebutton").eq(++$index).focus();
					}
					break;
				default:
					//console.log(event.keyCode)
					break;
			}
		}
		function validatePuzzle() {
			var solved = true;
			for(var i = 0, l = pressedOrder.length; i < l; i++) {
				if (pressedOrder[i] != correctOrder[i]) {
					solved = false;
					break;
				}
			}
			if (solved && $scope.showPanel) {
				$scope.locked = false;
				$scope.message = "UNLOCKED";
				$scope.hint = "";
				$rootScope.playSound("success");
				nextTile.class = "green";
				nextTile.data.solved = true;
				$timeout(function(){ $location.path('/level'); }, 1000);
			} else {
				_.each($scope.buttons, function(item) { item.pressed = false; })
				pressedOrder = [];
				$scope.error = true;
				$scope.message = "ERROR";
				$timeout(function(){ $scope.error = false; $scope.message = "LOCKED"; }, 1200);
				$rootScope.playSound("error");
			}
		}

	}
]);

app.controller('puzzle2Ctrl', ['$rootScope', '$scope', '$location', '$timeout',
	function($rootScope, $scope, $location, $timeout) {
		var nextTile, inventoryItem;

		$rootScope.focusElement(".content");

		$scope.buttons = 'AFEKBLOIX';
		$scope.buttons.message = "";
		$scope.message = "";
		$scope.flippedOver = false;
		$scope.pictureInFocus = false;

		nextTile = $rootScope.game.level.floorplan[$rootScope.game.level.nextTileId];
		inventoryItem = _.findWhere($rootScope.game.inventory, { "id": nextTile.data.requires });
		if ( inventoryItem ) {
			nextTile.ready = true;
			$rootScope.game.inventory = _.without($rootScope.game.inventory, inventoryItem);
		} else {
			$rootScope.updateStatus("Find a photo of a cat to solve this puzzle", true);
		}
		$scope.showPhoto = nextTile.ready;
		$scope.hint = nextTile.data.hint;
		$scope.puzzleKeyDownHandler = function(event) {
			switch (event.keyCode) {
				case 27:
					$location.path('/level');
					break;
				case 9:
					$rootScope.moveFocusOnTab(event);
					break;
			}
		};
		
		$scope.openHelp = function($event) {
			/*if ($event.type == 'click' || $event.keyCode == 32 || $event.keyCode == 13) {
				$scope.message = "Under construction...";
				$rootScope.toggleDialogFocus(true);
				window.gtag("event", "Instructions", {
					event_category: "User Experience",
					event_label: "Open How To Play"
				});
			}*/
		};
		
		$scope.enterCode = function(event, letter) {
			if (event.keyCode == 13 || event.keyCode == 32) {
				if ($scope.message.length < 8) {
					$scope.message += letter;
				} else {
					$rootScope.updateStatus("The key combination is too long", true);
				}
			}
		};
		$scope.clearCode = function(event) {
			if (event.keyCode == 13 || event.keyCode == 32) {
				$scope.message = $scope.message.slice(0, -1);
			}
		};
		$scope.validateCode = function(event) {
			if (event.keyCode == 13 || event.keyCode == 32) {
				if ($scope.message == "FELIX") {
					$scope.locked = false;
					$scope.message = "UNLOCKED";
					$scope.hint = "";
					$rootScope.playSound("success");
					nextTile = $rootScope.game.level.floorplan[$rootScope.game.level.nextTileId];
					nextTile.class = "green";
					nextTile.ready = true;
					$timeout(function(){ $location.path('/level'); }, 1000);
				} else {
					$scope.error = true;
					$scope.message = "ERROR";
					$timeout(function(){ $scope.error = false; $scope.message = ""; }, 1200);
					$rootScope.playSound("error");
				}
			}
		};
		$scope.flipPhoto = function(event) {
			if (event.keyCode == 13 || event.keyCode == 32) {
				$scope.flippedOver = !$scope.flippedOver;
			}
		};
		$scope.showHint = function(hint) {
			$scope.pictureInFocus = !!hint.length;
			$rootScope.actionLog = hint;
		}
		$scope.test = function() {
			$scope.flippedOver = !$scope.flippedOver;
		}
	}
]);

app.controller('outroCtrl', ['$rootScope', '$scope', '$location', '$timeout',
	function($rootScope, $scope, $location, $timeout) {

		$rootScope.stopSound("ambientSound");

		if (!$rootScope.assetsLoaded) {
			$location.path('/');
		} else {
			$rootScope.stopSound("ambientSound");
			$rootScope.playSound("win", {volume: .1});
			$scope.isOutro = true;
			$scope.currentSlide = 0;
			$scope.continueGame = function($event) {
				if ($event.type == 'click' || $event.keyCode == 39) {
					$scope.message = "";
					if ($scope.currentSlide < $rootScope.outro.length) {
						$scope.isVisible = false;
						$timeout(function () {
							$scope.background = $rootScope.outro[$scope.currentSlide].image;
							$scope.message = $rootScope.outro[$scope.currentSlide].content;
							$scope.currentSlide++;
							$scope.isVisible = true;
							$rootScope.focusElement("#boxContent");
						}, 800, true, $scope);
					} else {
						$scope.isVisible = false;
						$location.path('/summary/');
					}
				}
			};
			$scope.continueGame({'type': 'click'});

		}
	}
]);

app.controller('summaryCtrl', ['$rootScope', '$scope', '$location',
	function($rootScope, $scope, $location) {

		$rootScope.game.completed = true;
		$rootScope.saveState();
		$rootScope.focusElement(".content");

		$scope.trackDownloads = function() {
			window.gtag("event", "Download", { event_category: "Gameplay", event_label: "Accessibility Guide downloaded"});
		}

	}
]);

///*  UTILS  *///

utils.factory('$storage', ['$window', '$cookies', function($window, $cookies) {
	var expiry_days = 10;
	
	function isLocalStorageAvailable() {
		var str = 'test';
		try {
			localStorage.setItem(str, str);
			localStorage.removeItem(str);
			return true;
		} catch(e) {
			return false;
		}
	}

	return {
		set: function(key, value) {
			var d = new Date();
			if (isLocalStorageAvailable()) {
				$window.localStorage[key] = value;
			} else {
				$cookies(key, value, {expires: d.setDate(expiry_days)});
			}
		},
		get: function(key) {
			var r = (isLocalStorageAvailable()) ? $window.localStorage[key] : $cookies.get(key);
			return r;
		},
		setObject: function(key, value) {
			var d = new Date(),
				o = JSON.stringify(value);
			if (isLocalStorageAvailable()) {
				$window.localStorage[key] = o;
			} else {
				$cookies.putObject(key, o, {expires: d.setDate(expiry_days)});
			}
		},
		getObject: function(key) {
			var r = (isLocalStorageAvailable()) ? $window.localStorage[key] : $cookies.getObject(key);
			return r ? JSON.parse(r) : false;
		},
		remove: function(key) {
			if (isLocalStorageAvailable()) {
				$window.localStorage.removeItem(key);
			} else {
				$cookies.remove[key];
			}
		}
	}
}]);

function arrayFillMethod() {
	if (!Array.prototype.fill) {
		Object.defineProperty(Array.prototype, 'fill', {
			value: function(value) {
				
				// Steps 1-2.
				if (this == null) {
					throw new TypeError('this is null or not defined');
				}
				
				var O = Object(this);
				
				// Steps 3-5.
				var len = O.length >>> 0;
				
				// Steps 6-7.
				var start = arguments[1];
				var relativeStart = start >> 0;
				
				// Step 8.
				var k = relativeStart < 0 ?
					Math.max(len + relativeStart, 0) :
					Math.min(relativeStart, len);
				
				// Steps 9-10.
				var end = arguments[2];
				var relativeEnd = end === undefined ?
					len : 
					end >> 0;
				
				// Step 11.
				var final = relativeEnd < 0 ?
					Math.max(len + relativeEnd, 0) :
					Math.min(relativeEnd, len);
				
				// Step 12.
				while (k < final) {
					O[k] = value;
					k++;
				}
				
			// Step 13.
			return O;
			}
		});
	}
}

function generateUUID() {
	var r, d;
	d = new Date().getTime();
	if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
		d += performance.now(); //use high-precision timer if available
	}
	r = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return r;
};

function getBrowser() {
	var browser, isIE;
	
	isIE = /*@cc_on!@*/false || !!document.documentMode;
	
	if ( (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0 ) {
		browser = "Opera";
	} else if ( typeof InstallTrigger !== 'undefined' ) {
		browser = "Firefox";
	} else if ( /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)) ) {
		browser = "Safari";
	} else if ( isIE ) {
		browser = "Internet Explorer";
	} else if ( !isIE && !!window.StyleMedia ) {
		browser = "Edge";
	} else if ( !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime) ) {
		browser = "Chrome";
	} else {
		browser = "Unknown browser";
	}
	return browser;
}


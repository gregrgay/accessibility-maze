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
					"fullscreen": false
				},
				"started": false,
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

			_.each($rootScope.gameinfo.images, function(el, ind) {
				assets.push({id: ind, src: el});
			});
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
					volume: .5
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
			$event.preventDefault();
			$event.stopPropagation();

			if ($event.type == 'click' || $event.keyCode == 32 || $event.keyCode == 13) {
				if ($rootScope.game.settings.sound) {
					$rootScope.stopSound(instance);
				} else {
					$rootScope.playSound($rootScope.ambientSoundName, {loop: -1, volume: .3}, instance);
				}
				$rootScope.game.settings.sound = !$rootScope.game.settings.sound;
				$rootScope.saveState();
			} else if($event.keyCode == 9) {
				$rootScope.moveFocusOnTab($event);
			}
		}

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
				//$timeout( function() { $overlay.find('.dialog').focus(); }, 300);
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
			$event.stopPropagation();
			if ($event.type == 'click' || $event.keyCode == 32 || $event.keyCode == 13) {
				$location.path("/menu");
			} else if($event.keyCode == 9) {
				$rootScope.moveFocusOnTab($event);
			}
		};

		$rootScope.moveFocusOnTab = function ($event) {
			var $focusable, ind, next;

			$focusable = $("button, [tabindex]");
			ind = $focusable.index($($event.currentTarget));
			next = ind > $focusable.length - 1 ? 0 : ++ind;
			$focusable.eq(next).focus();
		};

		$rootScope.actionLog = "";
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
				$rootScope.game.level.id = 0;
				$rootScope.game.level.floorplan = [];
				$rootScope.game.level.currTile = {};
				$rootScope.game.inventory = [];
				$rootScope.saveState();
				$location.path('/intro/');
			};
			$scope.resumeSaved = function() {
				$location.path('/level/');
			};
			$scope.showInstructions = function() {
				$location.path('/gameinfo/howto');
			};
		}
	}
]);

app.controller('gameInfoCtrl', ['$rootScope', '$scope', '$location', '$route',
	function($rootScope, $scope, $location, $route) {

		var page;

		page = $route.current.pathParams.page;

		console.log( $rootScope.gameinfo);
		if ( $rootScope.gameinfo[page] ) {
			$scope.message = $rootScope.gameinfo[page];
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
			$scope.continueGame = function() {
				
				if($scope.currentSlide < $rootScope.intro.length) {
					$scope.isVisible = false;
					$timeout( function () {
						$scope.background = $rootScope.intro[$scope.currentSlide].image;
						$scope.message = $rootScope.intro[$scope.currentSlide].content;
						$scope.currentSlide++;
						$scope.isVisible = true;
					}, 500, true, $scope);
				} else {
					$scope.isVisible = false;
					$location.path('/level/');
				}
			};
			$scope.continueGame();

		}	
	}
]);

app.controller('levelCtrl', ['$rootScope', '$scope', '$location', '$storage', '$route', '$timeout',
	function($rootScope, $scope, $location, $storage, $route, $timeout) {

		var level, item, ind = 0;

		if (!$rootScope.assetsLoaded) {
			$location.path('/menu/');
		} else {
			if ($rootScope.game.settings.sound) {
				$rootScope.playSound($rootScope.ambientSoundName, {loop: -1, volume: .3}, "ambientSound");
			}
			$scope.message = "";
			$scope.levelCompleted = false;
			level = $rootScope.levels[$rootScope.game.level.id];

			if (!$rootScope.game.level.floorplan.length) {

				$rootScope.game.level.floorplan = [];
				_.each(level.floorplan, function (row, x) {
					_.each(row, function (tile, y) {
						item = _.findWhere(level.items, {row: x, col: y});

						$rootScope.game.level.floorplan.push({
							"id": ind++,
							"class": item ? item.class : tile,
							"collectable": item ? item.collectable : false,
							"row": x,
							"col": y,
							"data": item && item.data ? item.data : null
						});
						if (tile == "blob") {
							$rootScope.game.level.currTile = $rootScope.game.level.floorplan[$rootScope.game.level.floorplan.length - 1];
						}
					});
				});
			}
			$rootScope.game.level.lesson = level.lesson;

			$scope.closePopupDialog = function() {
				$rootScope.toggleDialogFocus(false);
				$scope.message = "";
				$scope.isBook = false;
				if ($scope.levelCompleted) {
					$timeout.cancel($scope.timeout);
					if ($rootScope.game.level.id < $rootScope.levels.length - 1) {
						$rootScope.game.inventory = [];
						$rootScope.game.level.id += 1;
						$rootScope.game.level.floorplan = [];
						$rootScope.game.level.currTile = {};
						$rootScope.saveState();
						$route.reload();
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
					$rootScope.saveState();
					$(".map").focus();
				}
			};

			$scope.dialogKeyDownHandler = function(event) {
				event.preventDefault();
				event.stopPropagation();
				if ( event.keyCode == 13 || event.keyCode == 27 || event.keyCode == 32 ) {
					$scope.closePopupDialog();
				}
			};

            $scope.tileClickHandler = function($event, tile) {
                if (tile.class == "bubble") {
                    tile.class="green";
                    $rootScope.playSound("pop")
                }
            };

			$scope.mapKeyDownHandler = function(event) {
				var row, col;
				row = $rootScope.game.level.currTile.row;
				col = $rootScope.game.level.currTile.col;
				switch (event.keyCode) {
					case 37: // left
						takeAction(row, --col, "left");
						break;
					case 38: // top
						takeAction(--row, col, "up");
						break;
					case 39: // right
						takeAction(row, ++col, "right");
						break;
					case 40: // bottom
						takeAction(++row, col, "down");
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

		function takeAction(row, col, dir) {
			var ind, shakingClass, inventoryItem, switchDelay;
			ind = _.findWhere($rootScope.game.level.floorplan, {row: row, col: col}).id;
			$scope.nextTile = $rootScope.game.level.floorplan[ind];

			if ($scope.nextTile.collectable) {
				$rootScope.game.inventory.push({
					id: $scope.nextTile.id,
					class: "tile " + $scope.nextTile.class
				});
				$scope.nextTile.collectable = false;
				$rootScope.actionLog = "You collected " + $scope.nextTile.class;
				$rootScope.playSound("get_item");
				moveBlob($scope.nextTile);
			} else {

				switch ($scope.nextTile.class) {

					case "green":
						$rootScope.actionLog = "";
						moveBlob($scope.nextTile);
						break;

					case "wall":
						$rootScope.actionLog = "You bumped into wall";
						break;

					case "exit":
					case "exit down":

						$rootScope.actionLog = "You found exit";
						$scope.message = level.lesson;
						$rootScope.toggleDialogFocus(true);
						$scope.levelCompleted = true;
						$rootScope.playSound("exit", {volume: 1});
						//moveBlob($scope.nextTile);
						break;

					case "book":

						$rootScope.actionLog = "You found Master's diary";
						$scope.isBook = true;
						$scope.message = $scope.nextTile.data.content;
						$rootScope.toggleDialogFocus(true);
						break;

					case "door":

						if ($scope.nextTile.data.requires >= 0) {
							inventoryItem = _.findWhere($rootScope.game.inventory, { "id": $scope.nextTile.data.requires });
							if ( inventoryItem ) {
								//$rootScope.game.inventory = _.without($rootScope.game.inventory, inventoryItem);
								$rootScope.actionLog = "You opened a door";
								$scope.nextTile.class = "green";
								$rootScope.playSound("success");
							} else {
								$rootScope.actionLog = "You found a locked door";
								$rootScope.playSound("hit_wall");
							}
						} else {
							$rootScope.actionLog = "This door is opened remotely";
							$rootScope.playSound("hit_wall");
						}
						break;

					case "secret":

						if($scope.nextTile.data.attempts > 1) {
							$rootScope.actionLog = "You found cracked wall";
							$scope.nextTile.data.attempts--;
							$rootScope.playSound("hit_wall");
							$scope.nextTile.class = "secret shaking";
							$timeout( function () { $scope.nextTile.class = "secret"; }, 100 );
						} else {
							$rootScope.actionLog = "You found a secret";
							$scope.nextTile.class = $scope.nextTile.data.treasure.class;
							$scope.nextTile.collectable = $scope.nextTile.data.treasure.collectable;
							$rootScope.playSound("explosion");
						}
						break;

					case "chest":

						inventoryItem = _.findWhere($rootScope.game.inventory, { "id": $scope.nextTile.data.requires });
						if ( inventoryItem ) {
							//$rootScope.game.inventory = _.without($rootScope.game.inventory, inventoryItem);
							$rootScope.actionLog = "You collected " + $scope.nextTile.data.treasure.name;
							$scope.nextTile.class = "chest unlocked";
							$scope.message = "<div class='treasure " + $scope.nextTile.data.treasure.class + "'></div>";
							$scope.isChest = true;
							$rootScope.toggleDialogFocus(true);
							$rootScope.playSound("success");
							console.log($rootScope.game.inventory);
						} else {
							$rootScope.actionLog = "You found a locked chest";
							$rootScope.playSound("hit_wall");
						}
						break;
						
					case "chest unlocked":
						$rootScope.actionLog = "You found empty unlocked chest";
						break;

					case "switch":

						$rootScope.actionLog = "You turned the switch on";
						$rootScope.playSound("click");
						inventoryItem = _.findWhere($rootScope.game.inventory, { "id": $scope.nextTile.data.requires });
						controlledItem = $rootScope.game.level.floorplan[ $scope.nextTile.data.controls ];
						switchDelay = $scope.nextTile.data.timeout;
						if (inventoryItem) {
							$scope.nextTile.class = "switch on frozen";
							switchDelay *= 3;
						} else {
							$scope.nextTile.class = "switch on";
						}
						controlledItem.class = "green";
						$scope.timeout = $timeout(function() {
							var switchTile, doorTile;
							switchTile = arguments[0];
							doorTile = $rootScope.game.level.floorplan[ switchTile.data.controls ];
							$rootScope.playSound("click");
							switchTile.class = "switch";
							$rootScope.actionLog = "The switch is off";
							doorTile.class = "door blinking";
							$timeout(function() { arguments[0].class = "door"; }, 1200, true, doorTile);
						}, switchDelay, true, $scope.nextTile);
						break;
						
					case "switch on":
					case "switch on frozen":
						$rootScope.actionLog = "The switch is on";
						break;

					case "bubble":

						$rootScope.actionLog = "Your way is blocked by balloon";
						$scope.nextTile.class = $scope.nextTile.class + " wobble";
						$rootScope.playSound("boing", {volume: 1.5});
						
						$timeout(function(){
							var nextTile = arguments[0];
							nextTile.class = "bubble";
						}, 300, true, $scope.nextTile);
						break;

					case "puzzle1":

						$rootScope.game.level.nextTileId = ind;
						$rootScope.saveState();
						$location.path('/puzzle1');
						break;
				}
			}
		}

		function moveBlob(nextTile) {
			var currTile = _.findWhere($rootScope.game.level.floorplan, {"id": $rootScope.game.level.currTile.id});
			currTile.class = "green";
			nextTile.class = "blob";
			$rootScope.game.level.currTile = nextTile;
		}
	}
]);

app.controller('puzzle1Ctrl', ['$rootScope', '$scope', '$location', '$timeout',
	function($rootScope, $scope, $location, $timeout) {

		var correctOrder, pressedOrder;

		correctOrder = [2,0,1,3];
		pressedOrder = [];

		console.log( $rootScope.game.level.nextTileId );

		$rootScope.focusElement(".content");

		$scope.buttons = [
			{ pressed: false },
			{ pressed: false },
			{ pressed: false },
			{ pressed: false }
		];
		$scope.locked = true;
		$scope.error - true;
		$scope.message = "LOCKED";
		$scope.nextTile = $rootScope.game.level.floorplan[$rootScope.game.level.nextTileId];
		$scope.inventoryItem = _.findWhere($rootScope.game.inventory, { "id": $scope.nextTile.data.requires });

		$scope.puzzle1KeyDownHandler = function(event) {
			if (event.keyCode == 27) {
				$location.path('/level');
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
			if (solved && $scope.inventoryItem) {
				$scope.locked = false;
				$scope.message = "UNLOCKED";
				$rootScope.playSound("success");
				$scope.nextTile.class = "green";
				$scope.nextTile.data.solved = true;
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

app.controller('outroCtrl', ['$rootScope', '$scope', '$location', '$timeout',
	function($rootScope, $scope, $location, $timeout) {

		$rootScope.stopSound("ambientSound");

		if (!$rootScope.assetsLoaded) {
			$location.path('/');
		} else {
			$rootScope.stopSound("ambientSound");
			$rootScope.playSound("win", {volume: 1});
			$scope.currentSlide = 0;
			$scope.continueGame = function() {
				console.log($scope.isVisible);
				if($scope.currentSlide < $rootScope.outro.length) {
					$scope.isVisible = false;
					$timeout( function () {
						$scope.background = $rootScope.outro[$scope.currentSlide].image;
						$scope.message = $rootScope.outro[$scope.currentSlide].content;
						$scope.currentSlide++;
						$scope.isVisible = true;
					}, 500, true, $scope);
				} else {
					$scope.isVisible = false;
					$location.path('/summary/');
				}
			};
			$scope.continueGame();

		}
	}
]);

app.controller('summaryCtrl', ['$rootScope', '$scope', '$location',
	function($rootScope, $scope, $location) {

		$rootScope.focusElement(".content");

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


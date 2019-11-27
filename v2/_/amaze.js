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
					"currTile": {}
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
				{id:"pop", src:"_/snd/pop.mp3"}
			];

			_.each($rootScope.gameinfo.images, function(el, ind) {
				assets.push({id: ind, src: el});
			});
			_.each($rootScope.intro, function(el, ind) {
				assets.push({id: "intro_" + (++ind), src: el.image});
			});

			assets = assets.concat(sounds);

			queue.on("complete", function() {
				$rootScope.assetsLoaded = true;
				$rootScope.$apply();
			}, this);

			queue.loadManifest(assets);

		}

		$rootScope.playSound = function(name, props) {
			var conf;
			if (window[name]) {
				window[name].play();
			} else {
				conf = new createjs.PlayPropsConfig().set(_.extend({
					loop: 0,
					volume: .5
				}, props));
				window[name] = createjs.Sound.play(name, conf);
			}
		}

		$rootScope.stopSound = function(name) {
			if (window[name]) {
				window[name].stop();
			}
		};

		$rootScope.ambientSoundName = "main_theme";

		$rootScope.toggleAmbientSound = function(event) {
			if($rootScope.game.settings.sound) {
				$rootScope.stopSound($rootScope.ambientSoundName);
			} else {
				$rootScope.playSound($rootScope.ambientSoundName, {loop: -1, volume: .3});
			}
			$rootScope.game.settings.sound = !$rootScope.game.settings.sound;
			$rootScope.saveState();
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

		$rootScope.returnToMenu = function() {
			$location.path("/menu");
		};
	}
]);

app.controller('splashCtrl', ['$rootScope', '$scope', '$location', '$timeout',
	function($rootScope, $scope, $location, $timeout) {

		$rootScope.stopSound($rootScope.ambientSoundName);

		$rootScope.assetsLoaded = true;
		$rootScope.saveState();

		$scope.startGame = function() {
			$location.path("/menu/");
		};
		
	}
]);

app.controller('menuCtrl', ['$rootScope', '$scope', '$location', '$timeout',
	function($rootScope, $scope, $location, $timeout) {

		$rootScope.stopSound($rootScope.ambientSoundName);

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

app.controller('introCtrl', ['$rootScope', '$scope', '$location', '$storage', '$route',
	function($rootScope, $scope, $location, $storage, $route) { 
		
		var currentSlide = 0;

		$rootScope.stopSound($rootScope.ambientSoundName);

		if (!$rootScope.assetsLoaded) {
			$location.path('/');
		} else {
			$scope.continueGame = function() {
				
				if(currentSlide < $rootScope.intro.length) {
					$scope.background = $rootScope.intro[currentSlide].image;
					$scope.message = $rootScope.intro[currentSlide].content;
					currentSlide++;
				} else {
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

		$rootScope.stopSound($rootScope.ambientSoundName);

		if (!$rootScope.assetsLoaded) {
			$location.path('/menu/');
		} else {
			if ($rootScope.game.settings.sound) {
				$rootScope.playSound($rootScope.ambientSoundName, {loop: -1, volume: .3});
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
						$location.path("/summary");
					}
				} else {
					if ($scope.isChest) {
						$rootScope.game.inventory.push({
							id: $scope.nextTile.id,
							class: "tile " + $scope.nextTile.data.treasure.class
						});
						console.log("collected item: " + $scope.nextTile.id);
						$scope.isChest = false;
					}
					$rootScope.saveState();
					$(".map").focus();
				}
			};

			$scope.dialogKeyDownHandler = function(event) {
				event.preventDefault();
				event.stopPropagation();
				if (event.keyCode == 27) {
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
						takeAction(row, --col);
						break;
					case 38: // top
						takeAction(--row, col);
						break;
					case 39: // right
						takeAction(row, ++col);
						break;
					case 40: // bottom
						takeAction(++row, col);
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

			$scope.openMenu = function() {
				$location.path('/menu');
			};
		}

		function takeAction(row, col) {
			var ind, shakingClass, inventoryItem, switchDelay;
			ind = _.findWhere($rootScope.game.level.floorplan, {row: row, col: col}).id;
			$scope.nextTile = $rootScope.game.level.floorplan[ind];

			if ($scope.nextTile.collectable) {
				$rootScope.game.inventory.push({
					id: $scope.nextTile.id,
					class: "tile " + $scope.nextTile.class
				});
				$scope.nextTile.collectable = false;
				console.log("collected item: " + $scope.nextTile.id);
				$rootScope.playSound("get_item");
				moveBlob($scope.nextTile);
			} else {

				switch ($scope.nextTile.class) {

					case "green":

						moveBlob($scope.nextTile);
						break;

					case "exit":
					case "exit down":

						$scope.message = level.lesson;
						$rootScope.toggleDialogFocus(true);
						$scope.levelCompleted = true;
						$rootScope.playSound("exit", {volume: 1});
						//moveBlob($scope.nextTile);
						break;

					case "book":

						$scope.isBook = true;
						$scope.message = $scope.nextTile.data.content;
						$rootScope.toggleDialogFocus(true);
						break;

					case "door":

						if ($scope.nextTile.data.requires >= 0) {
							inventoryItem = _.findWhere($rootScope.game.inventory, { "id": $scope.nextTile.data.requires });
							if ( inventoryItem ) {
								//$rootScope.game.inventory = _.without($rootScope.game.inventory, inventoryItem);
								$scope.nextTile.class = "green";
								$rootScope.playSound("success");
							} else {
								$rootScope.playSound("hit_wall");
							}
						} else {
							$rootScope.playSound("hit_wall");
						}
						break;

					case "secret":
						if($scope.nextTile.data.attempts > 1) {
							$scope.nextTile.data.attempts--;
							$rootScope.playSound("hit_wall");
							$scope.nextTile.class = "secret shaking";
							$timeout( function () { $scope.nextTile.class = "secret"; }, 100 );
						} else {
							$scope.nextTile.class = $scope.nextTile.data.treasure.class;
							$scope.nextTile.collectable = $scope.nextTile.data.treasure.collectable;
							$rootScope.playSound("explosion");
						}
						break;

					case "chest":

						inventoryItem = _.findWhere($rootScope.game.inventory, { "id": $scope.nextTile.data.requires });
						if ( inventoryItem ) {
							//$rootScope.game.inventory = _.without($rootScope.game.inventory, inventoryItem);
							$scope.nextTile.class = "chest unlocked";
							$scope.message = "<div class='treasure " + $scope.nextTile.data.treasure.class + "'></div><p>You collected " + $scope.nextTile.data.treasure.name + "</p>";
							$scope.isChest = true;
							$rootScope.toggleDialogFocus(true);
							$rootScope.playSound("success");
						} else {
							$rootScope.playSound("hit_wall");
						}
						break;

					case "switch":

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
							doorTile.class = "door blink_three";
						}, switchDelay, true, $scope.nextTile);
						break;

					case "bubble":

						$scope.nextTile.class = $scope.nextTile.class + " wobble";
						$timeout(function(){
							var nextTile = arguments[0];
							nextTile.class = "bubble";
						}, 300, true, $scope.nextTile);
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

app.controller('summaryCtrl', ['$rootScope', '$scope', '$location',
	function($rootScope, $scope, $location) {

		$rootScope.stopSound($rootScope.ambientSoundName);
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


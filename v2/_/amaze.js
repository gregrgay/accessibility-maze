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
		}).when('/gameinfo/:index?', {
			templateUrl : '_/tpl/gameinfo.tpl.html',
			controller  : 'gameInfoCtrl'
		}).when('/level/', {
			templateUrl : '_/tpl/level.tpl.html',
			controller  : 'levelCtrl'
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
				"currentLevel": 0,
				"levels" : []
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
			assets = [];
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
			var conf = new createjs.PlayPropsConfig().set(_.extend({
				loop: 0,
				volume: .5
			}, props));
			if (window[name]) {
				window[name].play();
			} else {
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

			if(event.type == 'click' || event.keyCode == 13 || event.keyCode == 32) {

				if($rootScope.game.settings.sound) {
					$rootScope.stopSound($rootScope.ambientSoundName);
				} else {
					$rootScope.playSound($rootScope.ambientSoundName, {loop: -1, volume: .3});
				}
				$rootScope.game.settings.sound = !$rootScope.game.settings.sound;
				$rootScope.saveState();
			}
		}
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
				$rootScope.saveState();
				$location.path('/intro/');
			};
			$scope.resumeSaved = function() {
				$location.path('/level/');
			};
			$scope.showInstructions = function() {

			};
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
			level = $rootScope.levels[$rootScope.game.currentLevel];

			console.log($rootScope.levels, $rootScope.game.currentLevel);

			$scope.floorplan = [];
			_.each(level.floorplan, function(row, x) {
				_.each(row, function(tile, y) {
					item = _.findWhere(level.items, {row: x, col: y});

					$scope.floorplan.push({
						"id": ind++,
						"class": item ? item.class : tile,
						"collectable": item ? item.collectable : false,
						"row": x,
						"col": y,
						"data": item && item.data ? item.data : null
					});
					if (item && item.class == "blob") {
						$rootScope.currTile = $scope.floorplan[$scope.floorplan.length - 1];
					}
				});
			});

			$scope.continueGame = function() {
				$scope.message = "";
				if ($scope.levelCompleted) {
					$rootScope.game.currentLevel += 1;
					$rootScope.saveState();
					$route.reload();
				}
			};

			$scope.mapKeyDownHandler = function(event) {
				var row, col;
				row = $rootScope.currTile.row;
				col = $rootScope.currTile.col;
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
			};

			$scope.$on('$viewContentLoaded', function(){
				$(".map").focus();
			});

			$scope.openMenu = function() {
				$location.path('/menu');
			};
		}

		function takeAction(row, col) {
			var ind, nextTile, shakingClass;
			ind = _.findWhere($scope.floorplan, {row: row, col: col}).id;
			nextTile = $scope.floorplan[ind];

			if (nextTile.class == "green") {
				moveBlob(nextTile);
			} else if (nextTile.class == "exit") {
				$scope.message = level.lesson;
				$scope.levelCompleted = true;
				$rootScope.playSound("exit", {volume: 1});
				moveBlob(nextTile);
			} else if (nextTile.class == "secret") {
				if(nextTile.data.attempts > 1) {
					nextTile.data.attempts--;
					$rootScope.playSound("hit_wall");
					nextTile.class = "secret shaking";
					$timeout( function () { nextTile.class = "secret"; }, 100 );
				} else {
					nextTile.class = nextTile.data.treasure.class;
					nextTile.collectable = nextTile.data.treasure.collectable;
					$rootScope.playSound("explosion");
				}
			} else if (nextTile.collectable) {
				$rootScope.inventory.push({
					id: nextTile.id,
					class: "tile " + nextTile.class
				});
				$rootScope.playSound("get_item");
				moveBlob(nextTile);
			}
		}

		function moveBlob(nextTile) {
			nextTile.class = "blob";
			$rootScope.currTile.class = "green";
			$rootScope.currTile = nextTile;
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


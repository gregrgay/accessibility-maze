var utils = angular.module('utils', ['ngCookies']),
	app = angular.module('amaze', ['ngRoute', 'ngSanitize', 'utils']),
	api;

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
		}).when('/level/:index?', {
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
			assetsLoaded: false,
			gameStarted: false
		});
		
		$rootScope[app.name] = _.extend( {
				'uuid': generateUUID(),
				"settings": {
					"music": true,
					"fullscreen": false
				},
				"levels" : []
			},
			$storage.getObject(app.name) || {}
		);
		
		$rootScope.saveState = function() {
			$storage.setObject(app.name, $rootScope[app.name]);
		};
		
		$http.get('_/' + app.name + '_data.js')
			.success(function(data, status, headers, config) {
				$rootScope.gameinfo = data.gameinfo;
				$rootScope.intro = data.intro;
				$rootScope.levels = data.levels;
				$rootScope.saveState();
			})
			.error(function(data, status, headers, config) {
				console.log('error: ' + status);
			});
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

		if (!$rootScope.assetsLoaded) {
			$location.path('/');
		} else {
			$scope.startNew = function() {
				console.log('test');
				$location.path('/intro/');
			};
			$scope.resumeSaved = function() {

			};
			$scope.showInstructions = function() {

			};
		}
	}
]);

app.controller('introCtrl', ['$rootScope', '$scope', '$location', '$storage', '$route',
	function($rootScope, $scope, $location, $storage, $route) { 
		
		var current = 0;
			
		if (!$rootScope.assetsLoaded) {
			$location.path('/');
		} else {
			console.log($rootScope.intro.length);
			$scope.continueGame = function() {
				
				if(current < $rootScope.intro.length) {
					$scope.background = $rootScope.intro[current].image;
					$scope.message = $rootScope.intro[current].content;
					current++;
				} else {
					$location.path('/menu/');
				}
				$scope.label = current == $rootScope.intro.length - 1 ? "Start" : "Next";
			};

			$scope.continueGame();

		}	
	}
]);

app.controller('gameInfoCtrl', ['$rootScope', '$scope', '$location', '$storage', '$route',
	function($rootScope, $scope, $location, $storage, $route) { 
		
		var n = $route.current.pathParams.page;
		
		if (!$rootScope.introAssetsLoaded || !isNaN(n) || !n.length) {
			$location.path('/');
		} else {
			$scope.page = $rootScope.gameinfo[n];
			$rootScope.focusElement('.panel');
		}
		
	}
]);

app.controller('levelCtrl', ['$rootScope', '$scope', '$location', '$storage',
	function($rootScope, $scope, $location, $storage) { 
		
		if (!$rootScope.introAssetsLoaded) {
			$location.path('/');
		} else {

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


'use strict';

/**
 * @ngdoc overview
 * @name nameGameApp
 * @description
 * # nameGameApp
 *
 * Main module of the application.
 */

angular
  .module('nameGameApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'nameGameApp.view',
    'ngSanitize',
    'ngTouch',
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
}]);
'use strict';

/**
 * @ngdoc overview
 * @name marketApp
 * @description
 * # marketApp
 *
 * Main module of the application.
 */
angular
  .module('marketApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/watchlist/:listId',{
        templateUrl: 'views/watchlist.html',
        controller: 'WatchlistCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

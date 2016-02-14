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
      //.when('/', {
      //  templateUrl: 'views/main.html',
      //  controller: 'MainCtrl',
      //  controllerAs: 'main'
      //})
      //.when('/about', {
      //  templateUrl: 'views/about.html',
      //  controller: 'AboutCtrl',
      //  controllerAs: 'about'
      //})
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

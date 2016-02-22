'use strict';

/**
 * @ngdoc function
 * @name marketApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the marketApp
 */
angular.module('marketApp')
  .controller('MainCtrl', function ($scope, $location,WatchlistService) {
    $scope.watchlists = WatchlistService.query();
    $scope.$watch(function(){
      return $location.path();
    },function(path){
      if(_.contains(path,'watchlist')){
        $scope.activeView = 'watchlist';
      }else{
        $scope.activeView = 'dashboard';
      }
    })
  });

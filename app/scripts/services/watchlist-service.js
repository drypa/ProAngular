(function () {
  'use strict';

  angular.module('marketApp')
    .service('WatchlistService', function () {
      var watchListFieldName = 'Marker.WatchLists';
      var nextIdFieldName = 'Marker.NextIds';

      var _model = loadModel();

      function loadModel() {
        var localWl = localStorage[watchListFieldName];
        var localNext = localStorage[nextIdFieldName];
        var model = {
          watchlists: localWl ? JSON.parse(localWl) : [],
          nextId: localNext ? parseInt(localNext) : 0
        };
        return model;
      };
      function saveModel() {
        localStorage[watchListFieldName] = JSON.stringify(_model.watchlists);
        localStorage[nextIdFieldName] = JSON.stringify(_model.nextId);
      }


      // [3] Helper: Use lodash to find a watchlist with given ID
      var findById = function (listId) {
        return _.find(_model.watchlists, function (watchlist) {
          return watchlist.id === parseInt(listId);
        });
      };
      // [4] Return all watchlists or find by given ID
      this.query = function (listId) {
        if (listId) {
          return findById(listId);
        } else {
          return _model.watchlists;
        }
      };
      // [5] Save a new watchlist to watchlists model
      this.save = function (watchlist) {
        watchlist.id = _model.nextId++;
        _model.watchlists.push(watchlist);
        saveModel();
      };
      // [6] Remove given watchlist from watchlists model
      this.remove = function (watchlist) {
        _.remove(_model.watchlists, function (list) {
          return list.id === watchlist.id;
        });
        saveModel();
      };
    });

})();

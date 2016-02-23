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
        _.each(model.watchlists, function (watchlist) {
          _.extend(watchlist, WatchlistModel);
          _.each(watchlist.stocks, function (stock) {
            _.extend(stock, StockModel);
          });
        });

        return model;
      };

      var saveModel = function () {
        localStorage[watchListFieldName] = JSON.stringify(_model.watchlists);
        localStorage[nextIdFieldName] = JSON.stringify(_model.nextId);
      };

      var findById = function (listId) {
        return _.find(_model.watchlists, function (watchlist) {
          return watchlist.id === parseInt(listId);
        });
      };

      this.query = function (listId) {
        if (listId) {
          return findById(listId);
        } else {
          return _model.watchlists;
        }
      };

      this.save = function (watchlist) {
        watchlist.id = _model.nextId++;
        watchlist.stocks = [];
        _.extend(watchlist, WatchlistModel);
        _model.watchlists.push(watchlist);
        saveModel();
      };

      this.remove = function (watchlist) {
        _.remove(_model.watchlists, function (list) {
          return list.id === watchlist.id;
        });
        saveModel();
      };

      var StockModel = {
        save: function () {
          var watchlist = findById(this.listId)
          watchlist.recalculate();
          saveModel();
        }
      };

      var WatchlistModel = {
        recalculate: function () {
          var calcs = _.reduce(this.stocks, function (calcs, stock) {
            calcs.shares += stock.shares;
            calcs.marketValue += stock.marketValue;
            calcs.dayChange += stock.dayChange;
            return calcs;
          }, {shares: 0, marketValue: 0, dayChange: 0});

          this.shares = calcs.shares;
          this.marketValue = calcs.marketValue;
          this.dayChange = calcs.dayChange;
        },
        addStock: function (stock) {
          var existingStock = _.find(this.stocks, function (s) {
            return s.company.symbol === stock.company.symbol;
          });
          if (existingStock) {
            existingStock.shares += stock.shares;
          } else {
            _.extend(stock, StockModel);
            this.stocks.push(stock);
          }
          this.recalculate();
          saveModel();
        }, removeStock: function (stock) {
          _.remove(this.stocks, function (s) {
            return s.company.symbol === stock.company.symbol;
          });
          this.recalculate();
          saveModel();
        }
      };
    });

})();

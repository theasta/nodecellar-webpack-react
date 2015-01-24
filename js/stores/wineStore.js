var EventEmitter = require('events').EventEmitter;
var appDispatcher = require('../dispatcher/appDispatcher');
var assign = require('object-assign');
var wineConstants = require('../constants/wine');
var conf = require('../constants/conf');
var _ = require('lodash');

var _wines = [];

var wineStore = assign({}, EventEmitter.prototype, {

    getAll: function() {
        return _wines;
    },
    
    hasWine: function (wineId) {
        return !!_.find(_wines, function(wine){ return wine._id == wineId });
    },
    
    getById: function (id) {
        var wines = _wines.filter(function (wine) {
            return wine._id == id;
        });
        var matches = wines.length;
        if (matches > 1) {
            throw new Error("There should only be one wine with id :" + id)
        }
        return (matches === 1) ? wines[0] : null;
    },
    
    update: function (wine) {
        _wines.every(function (w, index) {
            if (wine._id == w._id) {
                _wines[index] = wine;
                return false;
            }
            return true;
        });
    },
    
    add: function (wine) {
        _wines.push(wine);
    },

    getTotalCount: function () {
        return _wines.length;
    },

    emitChange: function() {
        this.emit(conf.CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(conf.CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(conf.CHANGE_EVENT, callback);
    }
});


appDispatcher.register(function(action) {
    switch(action.type) {
        case wineConstants.LOAD_SUCCESS:
            _wines = action.response;
            wineStore.emitChange();
            break;
        case wineConstants.LOAD_WINE_SUCCESS:
            var wine = action.response;
            if (!wineStore.hasWine(wine._id)) {
                wineStore.add(wine);
            } else {
                wineStore.update(wine);    
            }
            wineStore.emitChange();
            break;
        case wineConstants.CREATE:
            break;
        case wineConstants.DELETE:
            break;
        default:
        // no op
    }

});

module.exports = wineStore;

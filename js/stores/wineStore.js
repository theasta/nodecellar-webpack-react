var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var appDispatcher = require('../dispatcher/appDispatcher');
var assign = require('object-assign');
var wineConstants = require('../constants/wineActions');
var wineUtils = require('../utils/wineUtils');
var conf = require('../constants/conf');


var _wines = [];
var _winesById = [];

/* public functions */

var wineStore = assign({}, EventEmitter.prototype, {
    
    getAll: function() {
        return _wines;
    },
    
    getById: function (wineId) {
        return _winesById[wineId];
    },
    
    getId: function (wine) {
        return wineUtils.getWineId(wine);
    },

    getTotalCount: function () {
        return _wines.length;
    },

    indexOf: function (wine) {
        for (var i = 0, l = _wines.length; i < l; i++) {
            if (this.getId(wine) == this.getId(_wines[i])) {
                return i;
            }
        }
        return -1;
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

/* private functions */
var _add = function (wine) {
    _wines.push(wine);
    _winesById[this.getId(wine)] = wine;
}.bind(wineStore);

var _set = function (wines) {
    if (!_.isArray(wines)) {
        wines = [wines];
    }
    var existing;
    for (var i = 0, l = wines.length; i < l; i++) {
        var wine = wines[i];
        var id = this.getId(wine);
        if (existing = this.getById(id)) {
            _update(wine);
        } else {
            _add(wine);
        }
    }
}.bind(wineStore);

var _delete = function (wine) {
    var wineId = wineUtils.getWineId(wine);
    var index = this.indexOf(wine);
    delete _winesById[wineId];
    _wines.splice(index, 1);
}.bind(wineStore);

var _update = function (wine) {
    var index = this.indexOf(wine);
    _wines[index] = wine;
    _winesById[this.getId(wine)] = wine;
}.bind(wineStore);

/* App Dispatcher */

appDispatcher.register(function(action) {
    switch(action.type) {
        case wineConstants.LOAD_SUCCESS:
        case wineConstants.LOAD_WINE_SUCCESS:
        case wineConstants.CREATE_WINE_SUCCESS:
        case wineConstants.UPDATE_WINE_SUCCESS:
            _set(action.response);
            wineStore.emitChange();
            break;
        case wineConstants.DELETE_WINE_SUCCESS:
            _delete(action.response);
            wineStore.emitChange();
            break;
        default:
            // no op
    }
});

module.exports = wineStore;

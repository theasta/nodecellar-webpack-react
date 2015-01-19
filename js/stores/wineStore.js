var EventEmitter = require('events').EventEmitter;
var appDispatcher = require('../dispatcher/appDispatcher');
var assign = require('object-assign');
var wineConstants = require('../constants/wine');
var conf = require('../constants/conf');

var _wines = [];

var wineStore = assign({}, EventEmitter.prototype, {

    getAll: function() {
        return _wines;
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
        case wineConstants.CREATE:
            break;
        case wineConstants.DELETE:
            break;
        default:
        // no op
    }

});

module.exports = wineStore;

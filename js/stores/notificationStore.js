var EventEmitter = require('events').EventEmitter;
var appDispatcher = require('../dispatcher/appDispatcher');
var assign = require('object-assign');
var wineConstants = require('../constants/wineActions');
var notificationConstants = require('../constants/notificationActions');
var conf = require('../constants/conf');

var _notification;

var notificationStore = assign({}, EventEmitter.prototype, {
    get: function () {
        return _notification;
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
        case wineConstants.CREATE_WINE_SUCCESS:
            _notification = { type: 'success', message: 'Success! Wine saved successfully' };
            notificationStore.emitChange();
            break;
        case wineConstants.UPDATE_WINE_SUCCESS:
            _notification = { type: 'success', message: 'Success! Wine updated successfully' };
            notificationStore.emitChange();
            break;
        case wineConstants.DELETE_WINE_SUCCESS:
            _notification = { type: 'success', message: 'Success! Wine deleted successfully' };
            notificationStore.emitChange();
            break;
        case wineConstants.LOAD_WINE_ERROR:
        case wineConstants.CREATE_WINE_ERROR:
        case wineConstants.UPDATE_WINE_ERROR:
        case wineConstants.DELETE_WINE_ERROR:
            _notification = { type: 'danger', message: "An error occurred while retrieving wines from the cellar!" };
            notificationStore.emitChange();
            break;
        case notificationConstants.NOTIFICATION_ERROR:
            _notification = { type: 'danger', message: action.error.message };
            notificationStore.emitChange();
            break;
        default:
            // no op
    }
});

module.exports = notificationStore;
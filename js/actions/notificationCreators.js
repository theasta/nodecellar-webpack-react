var appDispatcher = require('../dispatcher/appDispatcher');
var notificationConstants = require('../constants/notificationActions');

module.exports = {
    error: function (message) {
        appDispatcher.dispatch({
            type: notificationConstants.NOTIFICATION_ERROR,
            error: { message: message }
        });
    }
};


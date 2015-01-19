var appDispatcher = require('../dispatcher/appDispatcher');
var wineConstants = require('../constants/wine');

module.exports = {
    load: function () {
        appDispatcher.dispatch({
            type: wineConstants.LOAD
        });
    },  
    handleLoadSuccess: function (data) {
        appDispatcher.dispatch({
            type: wineConstants.LOAD_SUCCESS,
            response: data
        });
    },
    handleLoadError: function (err) {
        appDispatcher.dispatch({
            type: wineConstants.LOAD_ERROR
        });
    }

};


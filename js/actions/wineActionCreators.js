var appDispatcher = require('../dispatcher/appDispatcher');
var wineConstants = require('../constants/wine');
var wineClient = require('../services/wineAPI');
var wineStore = require('../stores/wineStore');

module.exports = {
    load: function () {
        appDispatcher.dispatch({
            type: wineConstants.LOAD
        });
        wineClient.load()
            .then(
            function (data) {
                this.handleLoadSuccess(data);
            }.bind(this),
            function (err) {
                this.handleLoadError(err);
            }.bind(this)
        );
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
    },
    loadWine: function (wineId) {
        appDispatcher.dispatch({
            type: wineConstants.LOAD_WINE
        });
        
        // try to get it from the store first
        var wine = wineStore.getById(wineId);
        if (wine) {
            this.handleLoadWineSuccess(wine);
        } else {
            // otherwise request it
            wineClient.loadWine(wineId)
                .then(
                function (data) {
                    this.handleLoadWineSuccess(data);
                }.bind(this),
                function (err) {
                    this.handleLoadWineError(err);
                }.bind(this)
            );
        }
    },
    handleLoadWineSuccess: function (data) {
        appDispatcher.dispatch({
            type: wineConstants.LOAD_WINE_SUCCESS,
            response: data
        });        
    },
    handleLoadWineError: function (err) {
        appDispatcher.dispatch({
            type: wineConstants.LOAD_WINE_ERROR
        });
    }
};


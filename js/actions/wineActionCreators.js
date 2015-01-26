var appDispatcher = require('../dispatcher/appDispatcher');
var wineConstants = require('../constants/wineActions');
var wineClient = require('../services/wineClient');
var wineStore = require('../stores/wineStore');

module.exports = {
    createWine: function (wine) {
        appDispatcher.dispatch({
            type: wineConstants.CREATE_WINE,
            wineId: wine
        });
        wineClient.createWine(wine)
            .then(
            function (data) {
                appDispatcher.dispatch({
                    type: wineConstants.CREATE_WINE_SUCCESS,
                    response: data
                });
            },
            function (err) {
                appDispatcher.dispatch({
                    type: wineConstants.CREATE_WINE_ERROR,
                    error: err
                });
            }
        );
    },
    deleteWine: function (wineId) {
        appDispatcher.dispatch({
            type: wineConstants.DELETE_WINE,
            wineId: wineId
        });
        wineClient.deleteWine(wineId)
            .then(
            function (data) {
                appDispatcher.dispatch({
                    type: wineConstants.DELETE_WINE_SUCCESS,
                    response: wineId // @todo hot fix, replace with data after fixing API
                });
            },
            function (err) {
                appDispatcher.dispatch({
                    type: wineConstants.DELETE_WINE_ERROR,
                    error: err
                });
            }
        );
    },
    load: function () {
        appDispatcher.dispatch({
            type: wineConstants.LOAD
        });
        wineClient.load()
            .then(
            function (data) {
                appDispatcher.dispatch({
                    type: wineConstants.LOAD_SUCCESS,
                    response: data
                });
            },
            function (err) {
                appDispatcher.dispatch({
                    type: wineConstants.LOAD_ERROR,
                    error: err
                });
            }
        );
    },
    loadWine: function (wineId) {
        appDispatcher.dispatch({
            type: wineConstants.LOAD_WINE,
            wineId: wineId
        });
        
        // Is it already in the store?
        var wine = wineStore.getById(wineId);
        if (wine) {
            this.handleLoadWineSuccess(wine);
        } else {
            // otherwise request it
            wineClient.loadWine(wineId)
                .then(
                this.handleLoadWineSuccess.bind(this),
                function (err) {
                    appDispatcher.dispatch({
                        type: wineConstants.LOAD_WINE_ERROR,
                        error: err
                    });
                }
            );
        }
    },
    handleLoadWineSuccess: function (data) {
        appDispatcher.dispatch({
            type: wineConstants.LOAD_WINE_SUCCESS,
            response: data
        });
    },
    updateWine: function (wine) {
        appDispatcher.dispatch({
            type: wineConstants.UPDATE_WINE,
            wine: wine
        });
        wineClient.updateWine(wine)
            .then(
            function (data) {
                appDispatcher.dispatch({
                    type: wineConstants.UPDATE_WINE_SUCCESS,
                    response: data
                });
            },
            function (err) {
                appDispatcher.dispatch({
                    type: wineConstants.UPDATE_WINE_ERROR,
                    error: err
                });
            }
        );
    }
};


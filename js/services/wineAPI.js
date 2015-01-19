var $ = require('jquery');
var WINE_API = "https://cellar-api.herokuapp.com/wines";
var wineActions = require('../actions/wineActionCreators');

module.exports = {
    load: function () {
        $.ajax({
            type: 'GET',
            url: WINE_API,
            dataType: 'json'
        }).then(function (data, textStatus, jqXHR) {
            wineActions.handleLoadSuccess(data);
        }, function (err, textStatus) {
            wineActions.handleLoadError(err);
        });
    }
};
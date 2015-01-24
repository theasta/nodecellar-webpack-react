var $ = require('jquery');
var wineActions = require('../actions/wineActionCreators');
var conf = require('../constants/conf')

module.exports = {
    load: function () {
        return $.ajax({
            type: 'GET',
            url: conf.WINE_API,
            dataType: 'json'
        });
    },
    loadWine: function (wineId) {
        return $.ajax({
            type: 'GET',
            url: conf.WINE_API + '/' + wineId,
            dataType: 'json'
        });
    }
};
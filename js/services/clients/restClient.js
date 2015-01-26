var $ = require('jquery');
var conf = require('../../constants/conf');
var wineUtils = require('../../utils/wineUtils');

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
    },
    createWine: function (wine) {
        // @todo test
        return $.ajax({
            type: 'POST',
            url: conf.WINE_API,
            data: wine,
            dataType: 'json'
        });
    },
    updateWine: function (wine) {
        // @todo test
        return $.ajax({
            type: 'PUT',
            url: conf.WINE_API + '/' + wineUtils.getWineId(wine),
            data: wine,
            dataType: 'json'
        });
    },
    deleteWine: function (wineId) {
        return $.ajax({
            type: 'DELETE',
            url: conf.WINE_API + '/' + wineId,
            dataType: 'json'
        });
    }
};
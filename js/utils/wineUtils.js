var conf = require('../constants/conf');

module.exports = {
    getPictureURL: function (picture) {
        return conf.WINE_PICTURE_ROOT_URL + (picture ? picture : 'generic.jpg');
    },
    getWineId: function (wine) {
        return wine[conf.WINE_ID_KEY];
    },
    getWineIdKey: function () {
        return conf.WINE_ID_KEY;
    }
};
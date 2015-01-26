var $ = require('jquery');
var _ = require('lodash');
var winesArr = require('../../../tests/fixtures/wines');
var wineUtils = require('../../utils/wineUtils');

var getAll = function () {
    return JSON.parse(window.localStorage.getItem("wines"));
};

var saveAll = function (wines) {
    window.localStorage.setItem("wines", JSON.stringify(wines));
};

var generateId = function (wine) {
    if (wineUtils.getWineId(wine)) {
        throw new Error('Wine already has an id');
    }
    return wine[wineUtils.getWineIdKey()] = _.uniqueId('wine_');
};

var initialize = function () {
    var winesObj = {};
    winesArr.forEach(function(wine) {
        generateId(wine);
        winesObj[wineUtils.getWineId(wine)] = wine;
    });
    saveAll(winesObj);
};

initialize();

module.exports = {
    load: function () {
        var defer = new $.Deferred();
        var winesObj = getAll();
        var wines = _.values(winesObj);
        if (_.isArray(wines)) {
            defer.resolveWith(null, [wines]);    
        } else {
            defer.rejectWith(null, new Error("We couldn't load the wines."));
        }
        return defer;
    },
    loadWine: function (wineId) {
        var defer = new $.Deferred();
        var winesObj = getAll();
        var wine = winesObj[wineId];
        if (!wine) {
            defer.rejectWith(null, [new Error("We couldn't find any wine with this id ("+wineId+")")]);
        } else {
            defer.resolveWith(null, [wine])
        }
        return defer;
    },
    createWine: function (wine) {
        var defer = new $.Deferred();
        var wineId = generateId(wine);
        var winesObj = getAll();
        var existing = winesObj[wineId];
        if (!existing) {
            winesObj[wineId] = wine;
            saveAll(winesObj);
            defer.resolveWith(null, [wine]);
        } else {
            defer.rejectWith(null, [new Error("We couldn't create this wine because the id is already taken.")]);
        }
        return defer;
    },
    updateWine: function (wine) {
        var defer = new $.Deferred();
        var winesObj = getAll();
        var existing = winesObj[wineUtils.getWineId(wine)];
        if (!existing) {
            defer.rejectWith(null, [new Error("We coudn't update this wine because no match was found.")]);
        } else {
            winesObj[wineUtils.getWineId(wine)] = wine;
            saveAll(winesObj);
            defer.resolveWith(null, [wine]);
        }
        return defer;
    },
    deleteWine: function (wineId) {
        var winesObj = getAll();
        var wine = winesObj[wineId];
        var defer = new $.Deferred();        
        if (!wine) {
            defer.rejectWith(null, [new Error("Delete: Couldn't find any wine with this id.")]);
        } else {
            delete winesObj[wineId];
            saveAll(winesObj);
            defer.resolveWith(null, [ _.pick(wine, wineUtils.getWineIdKey()) ]);
        }
        return defer;
    }
};
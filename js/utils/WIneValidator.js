var _ = require('lodash');

var WineValidator = function (wine) {
    this.wine = wine || {};
    this._errors = {}   ;
};

WineValidator.prototype.getErrors = function () {
    return this._errors;
};

WineValidator.prototype.validate = function () {
    if (!this.wine.name) {
        this._errors.name = { message: "You must enter a name" };
    }
    if (!this.wine.grapes) {
        this._errors.grapes = { message: "You must enter a grape variety" };
    }
    if (!this.wine.country) {
        this._errors.country = { message:  "You must enter a country" };
    }
    return _.isEmpty(this._errors);
};

module.exports = WineValidator;
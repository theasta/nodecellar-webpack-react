var React = require('react');
var WineForm = require('../wines/WineForm');
var Router = require('react-router');

module.exports = React.createClass({
    mixins: [ Router.State ],
    render: function() {
        var wineId = this.getParams()._id;
        return <WineForm wineId={wineId} />;
    }
});
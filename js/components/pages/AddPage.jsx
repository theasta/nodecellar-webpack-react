var React = require('react');
var Router = require('react-router');
var WineForm = require('../wines/WineForm');

module.exports = React.createClass({
    mixins: [ Router.State ],
    render: function() {
        var wineId = this.getParams()._id;
        return <WineForm wineId={wineId} />;
    }
});
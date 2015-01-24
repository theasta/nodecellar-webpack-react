var React = require('react');
var Paginator = require('../paginator/Paginator');
var wineStore = require('../../stores/wineStore');

var getStateFromStores = function () {
    return {
        totalItems: wineStore.getTotalCount()
    };
};

module.exports = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },
    _onChange: function () {
        this.setState(getStateFromStores());
    },
    componentDidMount: function() {
        wineStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        wineStore.removeChangeListener(this._onChange);
    },
    render: function () {
        return (
            <Paginator {... this.props} totalItems={this.state.totalItems} />
        );
    }
});
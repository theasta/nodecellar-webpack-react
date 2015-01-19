var React = require('react');

var WineListItem = require('./WineListItem');
var wineStore = require('../../stores/wineStore');


var getStateFromStores = function () {
    return {
        wines: wineStore.getAll()
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
        var WineListItems = this.state.wines.map(function (wine) {
            return (
                <WineListItem
                    key={wine._id}
                    wine={wine}
                />
            );
        });
        return <ul className="thumbnails list-inline">{WineListItems}</ul>;
    }
});
var React = require('react');
var WineListItem = require('./WineListItem');
var wineStore = require('../../stores/wineStore');
var PaginatorMixin = require('../../mixins/PaginatorMixin');
var paginationConf = require('../../constants/pagination');

module.exports = React.createClass({
    mixins: [
        PaginatorMixin
    ],
    getDefaultProps: function() {
        return paginationConf;
    },
    getInitialState: function() {
        return this.getStateFromStore();
    },
    _onChange: function () {
        this.setState(this.getStateFromStore());
    },
    componentDidMount: function() {
        wineStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        wineStore.removeChangeListener(this._onChange);
    },
    getStateFromStore: function () {
        return {
            wines: wineStore.getAll()
        };
    },
    render: function () {
        // get number of items
        var WineListItems = this.paginateItems(this.state.wines).map(function (wine) {
            return (
                <WineListItem
                    key={wine._id}
                    wine={wine}
                />
            );
        });
        return (
            <ul className="thumbnails list-inline">
                {WineListItems}
            </ul>
        );
    }
});
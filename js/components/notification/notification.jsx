var React = require('react');
var { Alert } = require('react-bootstrap');
var notificationStore = require('../../stores/notificationStore');
var conf = require('../../constants/conf');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            message: ''
        }
    },
    componentDidMount: function() {
        notificationStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        notificationStore.removeChangeListener(this._onChange);
    },
    /**
     * Store Change Event Callback
     * @private
     */
    _onChange: function () {
        this.replaceState(this.getStateFromStore());
    },
    /* ----- ----- */
    getStateFromStore: function () {
        return notificationStore.get();
    },
    clear: function () {
        this.replaceState({});
    },
    render: function () {
        if (!this.state.message) {
            return null;
        } else {
            clearTimeout(this.timeoutID);
            this.timeoutID = setTimeout(this.clear, conf.NOTIFICATION_TIMEOUT * 1000);
            return (
                <Alert bsStyle={this.state.type}>
                    {this.state.message}
                </Alert>
            );
        }
    }
});
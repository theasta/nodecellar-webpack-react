var React = require('react');
var { Input, Row, Col, Well } = require('react-bootstrap');
var conf = require('../../constants/conf');
var wineStore = require('../../stores/wineStore');
var wineActions = require('../../actions/wineActionCreators');

require('./WineForm.css');

var defaultWine = { year: 2014 };

module.exports = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function () {
        return defaultWine;
    },
    _onChange: function () {
        this.replaceState(this.getStateFromStore(this.props.wineId));
    },
    componentWillReceiveProps: function (nextProps) {
        this.replaceState(this.getStateFromStore(nextProps.wineId));
    },
    componentDidMount: function() {
        wineStore.addChangeListener(this._onChange);
        if (this.props.wineId) {
            wineActions.loadWine(this.props.wineId);
        }
    },
    componentWillUnmount: function() {
        wineStore.removeChangeListener(this._onChange);
    },
    getStateFromStore: function (wineId) {
        return wineStore.getById(wineId) || defaultWine;
    },
    isAddForm: function () {
        return !this.props.wineId;
    },
    render: function () {
        var options = [];
        for (var year = conf.YEAR_MAX; year >= conf.YEAR_MIN; year--) {
            options.push(<option value={year} selected>{year}</option>);
        }
        var picture = conf.WINE_PICTURE_ROOT_URL + (this.state.picture ? this.state.picture : 'generic.jpg');
        return (
            <form className="form-horizontal">
                <legend>Wine Details - {this.state.name}</legend>
                <Col xs={12} md={8}>
                    <Input type="text" label="Id" labelClassName="col-xs-2" wrapperClassName="col-xs-4" valueLink={this.linkState('_id')} disabled />
                    <Input type="text" label="Name" labelClassName="col-xs-2" wrapperClassName="col-xs-4" valueLink={this.linkState('name')}/>
                    <Input type="text" label="Grapes" labelClassName="col-xs-2" wrapperClassName="col-xs-4" valueLink={this.linkState('grapes')}/>
                    <Input type="text" label="Country" labelClassName="col-xs-2" wrapperClassName="col-xs-4" valueLink={this.linkState('country')}/>
                    <Input type="text" label="Region" labelClassName="col-xs-2" wrapperClassName="col-xs-4" valueLink={this.linkState('region')}/>
                    <Input type="select" label="Year" labelClassName="col-xs-2" wrapperClassName="col-xs-4" valueLink={this.linkState('year')}>
                        {options}
                    </Input>
                    <Input type="textarea" label="Notes" labelClassName="col-xs-2" wrapperClassName="col-xs-8" valueLink={this.linkState('notes')}/>
                </Col>
                <Col xs={6} md={4}>
                    <Well>
                        <p><img id="picture" width="180" src={picture}/></p>
                        <p className="picture-help">To change the picture, drag a new picture from your file system onto the box above.</p>
                    </Well>
                </Col>
            </form>
        );
    }
});
var React = require('react');
var { Navigation } = require('react-router');
var { Input, Row, Col, Well, Button, ButtonToolbar } = require('react-bootstrap');
var wineStore = require('../../stores/wineStore');
var wineActions = require('../../actions/wineActionCreators');
var notificationActions = require('../../actions/notificationCreators');
var WineValidator = require('../../utils/WineValidator');
var conf = require('../../constants/conf');
var wineUtils = require('../../utils/wineUtils');

require('./WineForm.css');

var _handleChangeHelper = function (field) {
    return function (event) {
        var state = this.state;
        if (event.target.value && state.errors && state.errors[field]) {
            delete state.errors[field];
        }
        state[field] = event.target.value;
        this.replaceState(state);
    };
};

module.exports = React.createClass({
    mixins: [React.addons.LinkedStateMixin, Navigation],
    getInitialState: function () {
        return this.getDefaultWine();
    },
    getDefaultWine: function () {
        // @todo If description is not reset, the textarea doesn't empty itself when switching to an add form
        return { year: conf.YEAR_DEFAULT, description: '' };
    },
    componentDidMount: function() {
        wineStore.addChangeListener(this._onChange);
        if (!this.isAddForm()) {
            wineActions.loadWine(this.props.wineId);
        }
    },
    componentWillReceiveProps: function (nextProps) {
        // will be triggered when transitioning from a wine form to an add form
        // otherwise the form doesn't empty
        var newState;
        if (nextProps.wineId === undefined) { // when switching to an add form
            newState = this.getDefaultWine();
        } else {
            newState = this.getStateFromStore(nextProps.wineId);
            if (!newState) {
                notificationActions.error("We couldn't find any wine with this id (" + nextProps.wineId + ")");
                // @todo send to a non found view
                this.transitionTo('wines');
            }
        }
        
        this.replaceState(newState);
    },
    componentWillUnmount: function() {
        wineStore.removeChangeListener(this._onChange);
    },
    /**
     * Store Change Event Callback
     * @private
     */
    _onChange: function () {
        console.log('_onChange this.state._id', this.state._id);
        console.log('_onChange this.props.wineId', this.props.wineId);
        if (this.isAddForm()) {
            /* --- Add Form --- */
            console.log('_onChange AddForm');
            // Only change emitted from the wineStore can be a creation
            
            // @todo get back the id using the current state
            // the following only works with localStorage
            if (this.state._id != undefined) { // creation
                // let's redirect to the newly created wine
                this.transitionTo('wine', { _id: this.state._id });
            }
        } else {
            console.log('_onChange EditForm');
            /* --- edit form -- */
            // Possible changes: deletion or update or load
            if (this.state._id == undefined) { // load
                var loadedWine = this.getStateFromStore(this.props.wineId);
                console.log('_onChange EditForm: load', loadedWine);
                this.replaceState(loadedWine);
            } else {
                var updatedWine = this.getStateFromStore(this.state._id);
                if (!updatedWine) { // deletion
                    console.log('_onChange EditForm: deletion');
                    // remove current route from history
                    this.replaceWith('wines');
                } else { // update
                    console.log('_onChange EditForm: Update', updatedWine);
                    this.replaceState(updatedWine);
                }
            }
        }
    },
    /* ----- ----- */
    getStateFromStore: function (wineId) {
        if (!wineId) return;
        return wineStore.getById(wineId);
    },
    /**
     * @function
     */
    handleChangeName: _handleChangeHelper('name'),
    /**
     * @function
     */
    handleChangeGrapes: _handleChangeHelper('grapes'),
    /**
     * @function
     */
    handleChangeCountry: _handleChangeHelper('country'),
    isAddForm: function () {
        return !this.props.wineId;
    },
    onFormCancel: function () {
        window.history.back();
    },
    onFormDelete: function () {
        wineActions.deleteWine(this.props.wineId);
    },
    onFormSubmit: function (e) {
        e.preventDefault();
        var wine = this.state;
        delete wine.errors;
        
        var validator = new WineValidator(wine);
        if (!validator.validate()) {
            var errors = validator.getErrors();
            this.setState({errors: errors});
            return;
        }
        
        if (this.isAddForm()) {
            wineActions.createWine(wine);
        } else {
            wineActions.updateWine(wine);
        }
    },
    getButtons: function () {
        var buttons = [<Button type="submit" bsStyle="primary" key="save">Save</Button>];
        if (!this.isAddForm()) {
            buttons.push(<Button bsStyle="danger" onClick={this.onFormDelete} key="delete">Delete</Button>);
        }
        buttons.push(<Button onClick={this.onFormCancel} key="cancel">Cancel</Button>);
        return buttons;
    },
    getLegendTxt: function () {
        var legendTxt;
        if (this.isAddForm()) {
            legendTxt = "Add Wine";
        } else {
            legendTxt = "Wine Details";
            this.state.name && (legendTxt +=  " - " + this.state.name);
        }
        return legendTxt;
    },
    getYearOptions: function () {
        var options = [];
        for (var year = conf.YEAR_MAX; year >= conf.YEAR_MIN; year--) {
            options.push(<option value={year} key={year}>{year}</option>);
        }
        return options;
    },
    getErrorType: function (field) {
        var errors = this.state.errors;
        return errors && errors[field] ? 'error' : null; 
    },
    getErrorMessage: function (field) {
        var errors = this.state.errors;
        return errors && errors[field] ? errors[field].message : null;
    },
    render: function () {
        var options = this.getYearOptions();
        var buttons = this.getButtons();
        var legendTxt = this.getLegendTxt();
        var pictureURL = wineUtils.getPictureURL(this.state.picture);
        var labelClassName = "col-xs-2";
        
        return (
            <form className="form-horizontal" onSubmit={this.onFormSubmit}>
                <legend>{legendTxt}</legend>
                <Col xs={12} md={8}>
                    <Input
                        type="text" 
                        label="Id" 
                        labelClassName={labelClassName} wrapperClassName="col-xs-4" 
                        valueLink={this.linkState('_id')} 
                        disabled 
                    />
                    <Input
                        type="text" 
                        bsStyle={this.getErrorType('name')}
                        help={this.getErrorMessage('name')}
                        label="Name"
                        labelClassName={labelClassName} wrapperClassName="col-xs-4"
                        value={this.state.name}
                        onChange={this.handleChangeName}
                    />
                    <Input 
                        type="text"
                        bsStyle={this.getErrorType('grapes')}
                        help={this.getErrorMessage('grapes')}
                        label="Grapes" 
                        labelClassName={labelClassName} wrapperClassName="col-xs-4"
                        value={this.state.grapes} 
                        onChange={this.handleChangeGrapes}
                    />
                    <Input 
                        type="text"
                        bsStyle={this.getErrorType('country')}
                        help={this.getErrorMessage('country')}
                        label="Country" 
                        labelClassName={labelClassName} wrapperClassName="col-xs-4" 
                        value={this.state.country}
                        onChange={this.handleChangeCountry}
                    />
                    <Input 
                        type="text"
                        label="Region"
                        labelClassName={labelClassName} wrapperClassName="col-xs-4"
                        valueLink={this.linkState('region')}
                    />
                    <Input 
                        type="select" 
                        label="Year" 
                        labelClassName={labelClassName} wrapperClassName="col-xs-4" 
                        valueLink={this.linkState('year')} >
                        {options}
                    </Input>
                    <Input 
                        type="textarea" 
                        label="Notes" 
                        labelClassName={labelClassName} wrapperClassName="col-xs-8" 
                        defaultValue=""
                        valueLink={this.linkState('description')} 
                        rows="6"
                    />
                    <div className="form-group">
                        <div className="col-xs-offset-2 col-xs-10">
                            <ButtonToolbar>
                                {buttons}
                            </ButtonToolbar>
                        </div>
                    </div>
                </Col>
                <Col xs={6} md={4}>
                    <Well>
                        <p><img id="picture" src={pictureURL}/></p>
                    </Well>
                </Col>
            </form>
        );
    }
});
var React = require('react');
var Router = require('react-router');
var { Col } = require('react-bootstrap');
var WineList = require('../wines/WineList');
var WinePaginator = require('../wines/WinePaginator');


module.exports = React.createClass({
    mixins: [ Router.State ],
    render: function() {
        var page = +this.getQuery().page || 1;
        return (
            <Col>
                <WineList page={page}/>
                <WinePaginator page={page} to="wines"></WinePaginator>
            </Col>
        );
        
    }
});
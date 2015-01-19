var React = require('react');
var { Col, Row } = require('react-bootstrap');

require('./AboutCol.css');

module.exports = React.createClass({
    propTypes: {
        img: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired
    },
    render: function () {
        var image = require("./img/" + this.props.img + ".png");
        return(
            <Col xs={12} md={12} className="-col">
                <img className="-icon" src={image} />
                <h4>{this.props.title}</h4>
                <p>{this.props.children}</p>
            </Col>
        );
    }
});
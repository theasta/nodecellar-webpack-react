var React = require('react');
var { Button } = require('react-bootstrap');
var { ButtonLink } = require('react-router-bootstrap');

require('./ButtonHome.css');

module.exports = React.createClass({
    propTypes: {
        imgSrc: React.PropTypes.string.isRequired
    },
    render: function () {
        var img = <img src={this.props.imgSrc} className="pull-left"/>;
        if (this.props.to) {
            return (
                <ButtonLink to={this.props.to}>
                    {img}
                    {this.props.children}
                </ButtonLink>
            );
        } else {
            return (
                <Button href={this.props.href}>
                    {img}
                    {this.props.children }
                </Button>
            );
        }
        
    }
});
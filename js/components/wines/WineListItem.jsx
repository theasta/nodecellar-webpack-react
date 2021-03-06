var React = require('react');
var { Link } = require('react-router');
var { Glyphicon } = require('react-bootstrap');
var wineUtils = require('../../utils/wineUtils');

require('./WineListItem.css');

module.exports = React.createClass({
    propTypes: {
        wine: React.PropTypes.object.isRequired        
    },
    render: function () {
        var pictureURL = wineUtils.getPictureURL(this.props.wine.picture);
        return (
            <li>
                <Link to="wine" params={this.props.wine} className="thumbnail plain">
                    <img src={pictureURL} alt={this.props.wine.name} />
                    <h5>{this.props.wine.name}</h5>
                    {this.props.wine.year} {this.props.wine.grapes}<br/>
                    <Glyphicon glyph="globe"/> {this.props.wine.region}, {this.props.wine.country}
                </Link>
            </li>
        );
    }
});
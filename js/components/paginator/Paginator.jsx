var React = require('react');
var { Nav } = require('react-bootstrap');
var { NavItemLink } = require('react-router-bootstrap');
var { Link } = require('react-router');
var paginationConf = require('../../constants/pagination');
var PaginatorMixin = require('../../mixins/PaginatorMixin');

module.exports = React.createClass({
    mixins: [
        PaginatorMixin
    ],
    getDefaultProps: function() {
        return paginationConf;
    },
    render: function () {
        if (this.props.totalItems === 0) { return null; }
        
        var links = this.paginatePages(function (i) {
            return (<li key={i}><Link to={this.props.to} query={{ page: i }}>{i}</Link></li>);
        });

        return (
            <nav className="text-center">
                <ul className="pagination">
                    {links} 
                </ul>
            </nav>
        );
    }
});
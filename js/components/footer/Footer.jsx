var React = require('react');
var { Link } = require('react-router');
require('./Footer.css');
var conf = require('../../constants/conf');

module.exports = React.createClass({
    render: function() {
        return (
            <footer className="footer">
                <p className="pull-right"><Link to="home">Back Home</Link></p>
                <p>Built as a sample application with <a href="http://facebook.github.io/react/">React</a>,&nbsp;
                    <a href="http://facebook.github.io/flux/">Flux</a> and&nbsp;
                    <a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a>&nbsp;
                    by Alexandrine Boissière.
                    <br/>
                    The source code for this application is available on <a href={conf.GITHUB_REPO}>GitHub</a>.</p>
                <p>Nodecellar was originally created by <a href={conf.ORIGINAL_GITHUB_REPO} target="_blank">Christophe Coenraets</a>.</p>
            </footer>
        );
    }
});
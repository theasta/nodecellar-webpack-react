var React = require('react');
var { Link } = require('react-router');
var conf = require('../../constants/conf');
require('./Footer.css');

module.exports = React.createClass({
    render: function() {
        return (
            <footer className="footer">
                <p className="pull-right"><Link to="home">Back Home</Link></p>
                <p>Built as a sample application with <a href="http://facebook.github.io/react/">React</a>,&nbsp;
                    <a href="http://facebook.github.io/flux/">Flux</a> and&nbsp;
                    <a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a>&nbsp;
                    by <a href={conf.BLOG_URL} target="_blank">Alexandrine Boissière</a>.
                    <br/>
                    The source code for this application is available on <a href={conf.GITHUB_REPO}>GitHub</a>.</p>
                <p>Nodecellar was originally created by <a href={conf.ORIGINAL_GITHUB_REPO} target="_blank">Christophe Coenraets</a>.</p>
            </footer>
        );
    }
});
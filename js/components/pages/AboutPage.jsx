var React = require('react');
var { Row } = require('react-bootstrap');
var AboutCol = require('../about/AboutCol');
var conf = require('../../constants/conf');

module.exports = React.createClass({
    render: function() {
        return (
            <Row className="aboutSection">
                <AboutCol title="Download the source code" img="download">
                    The source code for this application is available in <a href={conf.GITHUB_REPO}>this repository</a> on GitHub.
                </AboutCol>
                <AboutCol title="Follow me on Twitter" img="twitter">
                    <a href={"http://twitter.com/" + conf.TWITTER_HANDLENAME}>@{conf.TWITTER_HANDLENAME}</a>
                </AboutCol>
                <AboutCol title="Comments and questions" img="discuss">
                    I love to hear your feedback. Post your questions and comments on <a href={conf.BLOG_URL}>the blog post associated with this
                    application.</a>
                </AboutCol>
                <AboutCol title="Check out the original project by Christopher Coenraets" img="blog">
                    <a href={conf.ORIGINAL_GITHUB_REPO}>{conf.ORIGINAL_GITHUB_REPO}</a>
                </AboutCol>
            </Row>
        )
    }
});



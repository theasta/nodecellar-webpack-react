var React = require('react');
var AboutCol = require('../about/AboutCol');
var conf = require('../../constants/conf');

var { Row } = require('react-bootstrap');

module.exports = React.createClass({
    render: function() {
        return (
            <Row className="aboutSection">
                <AboutCol title="Download the source code" img="download">
                    The source code for this application is available in <a href={conf.GITHUB_REPO}>this repository</a> on GitHub.
                </AboutCol>
                <AboutCol title="Comments and questions" img="discuss">
                    I love to hear your feedback. Post your questions and comments on the blog post associated with this
                    application.
                </AboutCol>
                <AboutCol title="Follow me on Twitter" img="twitter">
                    <a href={"http://twitter.com/" + conf.TWITTER_HANDLENAME}>@{conf.TWITTER_HANDLENAME}</a>
                </AboutCol>
                <AboutCol title="Check out my blog" img="blog">
                    <a href={conf.BLOG_URL}>{conf.BLOG_URL}</a>
                </AboutCol>
                <AboutCol title="Check out the original project" img="blog">
                    <a href={conf.ORIGINAL_GITHUB_REPO}>{conf.ORIGINAL_GITHUB_REPO}</a>
                </AboutCol>
            </Row>
        )
    }
});



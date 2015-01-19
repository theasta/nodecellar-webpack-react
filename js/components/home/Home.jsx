var React = require('react');
require('./Home.css');

var { Button } = require('react-bootstrap');
var conf = require('../../constants/conf');

var ButtonHome = require('./ButtonHome.jsx');

var githubImg = require('./img/github.png');
var wineImg = require('./img/wine.png');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="homeSection">
                <h1>Welcome to Node Cellar</h1>
                <h3>A sample application built with React, Twitter Bootstrap</h3>
                <div className="-btns">
                    <ButtonHome href={conf.GITHUB_REPO} imgSrc={githubImg}>View Project<br/>on GitHub</ButtonHome>
                    <ButtonHome to="wines" imgSrc={wineImg}>Start Browsing<br/>Node Cellar</ButtonHome>
                </div>
            </div>
        );
    }
});
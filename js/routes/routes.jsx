var React = require('react');
var { Route, DefaultRoute } = require('react-router');
var App = require('../components/App');
var HomePage = require('../components/pages/HomePage');
var ListPage = require('../components/pages/ListPage');
var AddPage = require('../components/pages/AddPage');
var AboutPage = require('../components/pages/AboutPage');

module.exports = (
    <Route handler={App} path="/">
        <DefaultRoute name="home" handler={HomePage} />
        <Route name="wines" path="/wines/" handler={ListPage} />
        <Route name="wine" path="/wines/:_id" handler={AddPage} />
        <Route name="add" path="/add/" handler={AddPage} />
        <Route name="about" path="/about/" handler={AboutPage} />
    </Route>
);
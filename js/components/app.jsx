var React = require('react');
var { RouteHandler } = require('react-router');
var { Nav, Navbar, NavItem, DropdownButton, MenuItem, Grid, Row, Glyphicon } =  require('react-bootstrap');
var { NavItemLink } = require('react-router-bootstrap');
var Notification = require('./notification/notification');
var Footer = require("./footer/Footer");
var wineActions = require('./../actions/wineActionCreators');

require('./App.css');

wineActions.load();

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar>
                    <Nav>
                        <NavItemLink eventKey={1} to="home" className="navbar-brand">NodeCellar</NavItemLink>
                        <NavItemLink eventKey={2} to="wines">Browse Wines</NavItemLink>
                        <NavItemLink eventKey={3} to="add"><Glyphicon glyph="edit"/> Add Wine</NavItemLink>
                    </Nav>
                    <Nav right>
                        <NavItemLink eventKey={4} to="about" pullRight>About</NavItemLink>
                        <DropdownButton eventKey={5} title="Resources">
                            <MenuItem>React</MenuItem>
                            <MenuItem>Twitter Bootstrap</MenuItem>
                            <MenuItem>React-Bootstrap</MenuItem>
                            <MenuItem divider />
                            <MenuItem>Original Nodecellar Repository</MenuItem>
                        </DropdownButton>
                    </Nav>
                </Navbar>
                <Grid>
                    <Row id="content">
                        <Notification />
                        <RouteHandler/>
                    </Row>
                    <Footer />
                </Grid>
            </div>
        );
    }
});
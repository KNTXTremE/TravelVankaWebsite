import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class MyNavBar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">TravelVanka</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/department">Department</NavItem>
            <NavItem eventKey={2} href="/reserve">Reserve</NavItem>
            <NavItem eventKey={3} href="/trip">Trip</NavItem>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default MyNavBar
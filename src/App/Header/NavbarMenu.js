import React, { Component } from 'react';
import '../App.scss';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem 
} from 'reactstrap';
import {
  // BrowserRouter as Router,
  // Route,
  NavLink as RRNavLink,
  // Switch
} from "react-router-dom";
 class NavbarMenu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
        <div className="NavbarMenu">
        <Navbar color="" light expand="md">
          <NavbarBrand 
          style={{color:"lightgreen"}}
          to="/">React Films</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink  
                tag={RRNavLink}
                style={{color:"green"}}
                activeStyle={{ color: "white" }}
                to="/films">Films</NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                tag={RRNavLink}
                style={{color:"green"}}
                activeStyle={{ color: "white" }}
                to="/actors">Actors</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem> */}
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


export default NavbarMenu;
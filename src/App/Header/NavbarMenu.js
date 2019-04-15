import React, { Component } from 'react';
import '../App.scss';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import {
  NavLink as RRNavLink,
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
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


export default NavbarMenu;
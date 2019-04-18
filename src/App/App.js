import React, { Component } from 'react';
import './App.scss';
import NavbarMenu from './Header/NavbarMenu';
import Films from './Main/Films';
import FilmDetailed from './Main/FilmDetailed';
import Actors from './Main/Actors';
import ActorDetailed from './Main/ActorDetailed';

import PagePagination from "./Main/PagePagination";
import {
  Route,
  Switch
} from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaSkype } from "react-icons/fa";

import { withRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      setPagination: false
    }
  }
  componentDidMount() {
    // console.log(this.props, "App-props"); 
    this.props.history.replace('/films');
  }

  settingPagination = value => {
    this.setState({ setPagination: value })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavbarMenu />
        </header>
        <main className="App-main">
          <Switch>
            <Route
              path="/films/:id"
              component={FilmDetailed}
            />
            <Route path="/films" exact render={() => <Films settingPagination={this.settingPagination} />} />
            <Route
              path="/actors/:id"
              component={ActorDetailed}
            />
            <Route path="/actors" render={() => <Actors settingPagination={this.settingPagination} />} />

          </Switch>
          {(this.props.location.pathname === '/films' || this.props.location.pathname === '/actors') && this.state.setPagination &&(<>) <div className="d-flex justify-content-center">
        <PagePagination />
          </div>
          <div className="d-flex justify-content-center" onClick={() => window.scrollTo(0, 0)}><span className="BackToTop">Back to top</span></div></>)}

        </main>
        <footer >
          <div className="App-footer">
            <div>
              <span>OlegGre4ka&copy; 2019. ReactFilmsApp</span>
            </div>
            <div>
              <a href="mailto:gre4kae@gmail.com" title="Email" target="_blank" rel="noopener noreferrer">
                <FaEnvelope style={{ fontSize: '24px' }} /><span style={{ color: 'white' }}>gre4kae@gmail.com</span></a>
            </div>
            <div><a href="https://github.com/OlegGre4ka/React-Films-App" title="Github" target="_blank" rel="noopener noreferrer">
              <FaGithub style={{ fontSize: '24px' }} /></a>
              <a href="https://www.linkedin.com/in/oleg-grechka-b14488172/" title="Linkedin" target="_blank" rel="noopener noreferrer">
                <FaLinkedin style={{ fontSize: '24px' }} /></a>
              <a href="skype:gre4kae?call" title="Skype" target="_blank" rel="noopener noreferrer">
                <FaSkype style={{ fontSize: '24px' }} /></a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default withRouter(App);

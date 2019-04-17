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
import { withRouter } from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      setPagination:false
    }
  }
  componentDidMount() {
    // console.log(this.props, "App-props"); 
    this.props.history.replace('/films');
  }

  settingPagination = value =>{
this.setState({setPagination:value})
  }

  render(){
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
            <Route path="/films" exact render={() => <Films settingPagination={this.settingPagination}/>} />
            <Route
              path="/actors/:id"
              component={ActorDetailed}
            />
            <Route path="/actors" render={() => <Actors settingPagination={this.settingPagination}/>} />
        
          </Switch>
          <div className="d-flex justify-content-center">
        { (this.props.location.pathname==='/films' || this.props.location.pathname==='/actors')&& this.state.setPagination &&<PagePagination/>}
          </div>
        </main>
        <footer className="App-footer">
          <h2>Footer</h2>
        </footer>
      </div>
    );
  }
}

export default withRouter(App);

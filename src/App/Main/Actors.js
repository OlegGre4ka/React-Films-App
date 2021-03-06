import React, { Component } from 'react';
// import './App.scss';
import {
  Card,
  CardImg,
  // CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import { Spinner } from 'reactstrap';
import { FaStar } from 'react-icons/fa';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MessageNotFound from './MessageNotFound';

const API_KEY = '5874acfd11651a28c55771624f7021f4';
class Actors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actors: [],
      genres: [],
      message: false,
      spinner: true
    };

  }

  componentDidMount() {
    this.props.settingPagination(false);
    this.props.updateCurrentPage(1);
    this.gettingListActors();
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.page !== this.props.page) {
      this.gettingListActors()
    } else
      if (prevProps.searchedActors !== this.props.searchedActors) {
        this.setState({
          actors: this.props.searchedActors
        });
        if (this.props.searchedActors.length === 0) {
          this.props.settingPagination(false);

          this.setState({ message: true });
          setTimeout(
            () => {
              this.setState({ message: false,spinner:true });
              this.gettingListActors();
            },1500
          )
        }
      }
  }

  async gettingListActors() {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${this.props.page}`
    );
    const data = await response.json();
    this.setState({
      actors: data.results,
      spinner: false,
    
    });
    this.props.settingPagination(true);

  }

  moveOnActorDetailed = (id) => {
    const Actor = this.state.actors.filter(item => item.id === id);
    this.props.updateActorDetailed(Actor)
    this.props.history.push(`/actors/` + id);
  }
  render() {
    // console.log(this.props,'props-films')
    return (
      <div className="Films container-fluid">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex justify-content-center ">
            {this.state.spinner && <Spinner color="success" style={{ width: '5rem', height: '5rem',marginTop:'8rem' }} />}
            {this.state.message && <MessageNotFound/>}
          </div>
          <div className="col-md-4"></div>

        </div>
        <div className="row">
          {this.state.actors.map((actor, i) => (
            <div key={i} className="col-md-3" style={{ padding: '5px' }}>
              <Card key={i} style={{ minHeight: '100%' }} >
                <CardImg top width="100%"
                  onClick={() => this.moveOnActorDetailed(actor.id)}
                  style={{ cursor: 'pointer' }}
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                <CardBody>
                  <CardTitle
                    onClick={() => this.moveOnActorDetailed(actor.id)}
                    style={{ color: 'darkblue', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>{actor.name}</CardTitle>
                  <CardSubtitle className="d-flex justify-content-between">
                    <span><FaStar style={{ color: 'gold' }} />{actor.popularity}</span>
                  </CardSubtitle>
                </CardBody>
              </Card>
            </div>))
          }
        </div>


      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    page: state.paginationReducer.page,
    actor: state.actorDetailedReducer.actor,
    searchedActors: state.searchActorReducer.searchedActors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentPage: page => {
      dispatch({ type: "UPDATE_PAGE", payload: page });
    },
    updateActorDetailed: actor => {
      dispatch({ type: "UPDATE_ACTOR_DETAILED", payload: actor });
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Actors));
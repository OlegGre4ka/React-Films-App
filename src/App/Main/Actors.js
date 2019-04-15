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
// import { FaStar } from 'react-icons/fa';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


const API_KEY = '5874acfd11651a28c55771624f7021f4';
class Actors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actors: [],
      genres: []
    };
  }

  componentDidMount() {
    this.gettingListActors()
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.page !== this.props.page) {
      this.gettingListActors()
    }
  }

  async gettingListActors() {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${this.props.page}`
    );
    const data = await response.json();
    this.setState({
      actors: data.results
    });
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
          {this.state.actors.map((actor, i) => (
            <div key={i} className="col-md-3" style={{ padding: '5px' }}>
              <Card key={i} style={{ minHeight: '100%' }} >
                <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                <CardBody>
                  <CardTitle
                    onClick={() => this.moveOnActorDetailed(actor.id)}
                    style={{ color: 'darkblue', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>{actor.name}</CardTitle>
                  <CardSubtitle className="d-flex justify-content-between">
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
    actor: state.actorDetailedReducer.actor
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
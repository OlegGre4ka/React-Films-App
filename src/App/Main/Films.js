import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import { Spinner } from 'reactstrap';
import { FaStar } from 'react-icons/fa';
import MessageNotFound from './MessageNotFound';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


const API_KEY = '5874acfd11651a28c55771624f7021f4';
class Films extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      genres: [],
      message: false,
      spinner: true
    };
  }

  componentDidMount() {
    this.props.settingPagination(false);

    this.props.updateCurrentPage(1);
    this.gettingListFilms();

    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-U`
    ).then(response => response.json())
      .then(genres => {
        this.setState({
          genres: genres.genres
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.page !== this.props.page) {
      this.gettingListFilms();
    }
    else
      if (prevProps.searchedFilmData !== this.props.searchedFilmData) {
        this.setState({
          films: this.props.searchedFilmData
        });
        if (this.props.searchedFilmData.length === 0) {
          this.props.settingPagination(false);
          this.setState({ message: true });
          setTimeout(
            () => {
              this.setState({ message: false, spinner: true });
              this.gettingListFilms();
            }, 1500
          )
        }
      }

  }

  async gettingListFilms() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.props.page}`
    );
    const data = await response.json();
    this.setState({
      films: data.results,
      spinner: false
    });
    this.props.settingPagination(true);
  }

  moveOnFilmDetailed = (id) => {
    const Film = this.state.films.filter(item => item.id === id);
    this.props.updateFilmDetailed(Film)
    this.props.history.push(`/films/` + id);
  }
  render() {
    // console.log(this.props,'props-films')
    return (
      <div className="Films container-fluid">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex justify-content-center">
            {this.state.spinner && <Spinner color="success" style={{ width: '5rem', height: '5rem', marginTop: '8rem' }} />}
            {this.state.message && <MessageNotFound />}
          </div>
          <div className="col-md-4"></div>

        </div>

        <div className="row">

          {this.state.films.map((film, i) => (
            <div key={i} className="col-md-3" style={{ padding: '5px' }}>

              <Card key={i} style={{ minHeight: '100%' }} >
                <CardImg top width="100%" style={{ cursor: 'pointer' }}
                  onClick={() => this.moveOnFilmDetailed(film.id)}
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} />
                <CardBody>
                  <CardTitle
                    onClick={() => this.moveOnFilmDetailed(film.id)}
                    style={{ color: 'darkblue', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>{film.title}</CardTitle>

                  <CardSubtitle className="d-flex justify-content-between">
                    <span>{film.release_date.slice(0, 4)}</span>
                    <span><FaStar style={{ color: 'gold' }} />{film.popularity}</span></CardSubtitle>
                  {this.state.genres.map((genre, i) => (film.genre_ids.some(id => genre.id === id) && <span key={i} style={{ fontSize: '14px', marginRight: '3px' }}>{(genre.name + ' ')}</span>))}
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
    film: state.filmDetailedReducer.film,
    searchedFilmData: state.searchFilmReducer.searchedFilmData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentPage: page => {
      dispatch({ type: "UPDATE_PAGE", payload: page });
    },
    updateFilmDetailed: film => {
      dispatch({ type: "UPDATE_FILM_DETAILED", payload: film });
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Films));
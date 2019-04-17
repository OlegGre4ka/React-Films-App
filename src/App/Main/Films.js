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
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.page !== this.props.page) {
      this.gettingListFilms();
    }

    if (prevProps.searchedFilmData !== this.props.searchedFilmData) {
      this.setState({
        films: this.props.searchedFilmData
      });
      if (this.props.searchedFilmData.length === 0) {
        this.props.settingPagination(false);
        this.setState({ message: true });
        setTimeout(
          () => {
            this.setState({ message: false, films:this.props.films });

            // this.setState({ message: false, spinner: true });
            // this.gettingListFilms();
          }, 1500
        )
      }
    }

    if ( prevProps.genreID !== this.props.genreID||(prevProps.page !== this.props.page&&prevProps.genreID !== this.props.genreID)) {
      const newGenresSelected = this.props.films.filter(
        film => film.genre_ids.some(id => id === this.props.genreID)
      )
      this.setState({ films: newGenresSelected })
      this.props.updateFilmDetailed(this.props.film, this.props.films);

      if (newGenresSelected.length === 0) {
        this.props.settingPagination(false);
        this.setState({ message: true });
        setTimeout(
          () => {
            this.setState({ message: false, films:this.props.films });
            // this.gettingListFilms();
        this.props.updateGenreID(this.props.genreID, 'Genres')

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
    this.props.updateFilmDetailed(this.props.film, data.results);

    this.props.settingPagination(true);
  }

  moveOnFilmDetailed = (id) => {
    const Film = this.state.films.filter(item => item.id === id);
    this.props.updateFilmDetailed(Film,this.props.films);
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
                  {this.props.genres.map((genre, i) => (film.genre_ids.some(id => genre.id === id) && <span key={i} style={{ fontSize: '14px', marginRight: '3px' }}>{(genre.name + ' ')}</span>))}
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
    films: state.filmDetailedReducer.films,

    searchedFilmData: state.searchFilmReducer.searchedFilmData,
    genres: state.genresReducer.genres,
    genreID: state.selectIDGenreReducer.genreID

  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentPage: page => {
      dispatch({ type: "UPDATE_PAGE", payload: page });
    },
    updateFilmDetailed: (film,films) => {
      dispatch({ type: "UPDATE_FILM_DETAILED", payload: film , payloadFilms:films});
    },
    updateGenreID: (genreID, genreName) => {
      dispatch({ type: "UPDATE_ID_GENRE", payload: genreID, payloadName: genreName });
  }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Films));
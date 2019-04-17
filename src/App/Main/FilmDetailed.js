import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from "react-redux";

const  FilmDetailed = props=> {
    // console.log(this.props,'props-film-1')
    return (
      <div className="Films container-fluid">
        <div className="row">
          <Pagination aria-label="Page navigation example" style={{ marginLeft: '25px', marginTop: '10px' }}>
            <PaginationItem >
              <PaginationLink previous onClick={() => props.history.push('/films')}>
                Back
             </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          {props.film.map((item, i) => (
            <div key={i} className="col-md-8" style={{ marginTop: '10px' }}>
              <Card key={i} >
                <div className="row">

                  <div className="col-md-8">
                    <CardImg width="100%" src={`https://image.tmdb.org/t/p/w400${item.poster_path}`} alt={item.title} />
                  </div>
                  <div className="col-md-4">
                    <CardBody>
                      <CardTitle
                        style={{ color: 'darkblue', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}
                      >{item.title}</CardTitle>

                      <CardSubtitle className="d-flex justify-content-between">
                      </CardSubtitle>

                      <CardText>{item.overview}</CardText>
                    </CardBody>
                  </div>
                </div>
              </Card>

            </div>))
          }
          <div className="col-md-2"></div>

        </div>


      </div>
    );
}

const mapStateToProps = state => {
  return {
    film: state.filmDetailedReducer.film
  };
};

const mapDispatchToProps = dispatch => {
  return {

    updateFilmDetailed: film => {
      dispatch({ type: "UPDATE_FILM_DETAILED", payload: film });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilmDetailed);
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
// import {FaStar} from 'react-icons/fa';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { connect } from "react-redux";

// const API_KEY = '5874acfd11651a28c55771624f7021f4';
class FilmDetailed extends Component {
  
  render() {
    console.log(this.props,'props-film-1')
    return (
      <div className="Films container-fluid">
      <div className="row">
         <Pagination aria-label="Page navigation example" style={{marginLeft:'25px',marginTop:'10px'}}>
            <PaginationItem >
                <PaginationLink  previous onClick={()=>this.props.history.push('/films')}>
             Back 
             </PaginationLink>
            </PaginationItem>         
        </Pagination>
        </div>
        <div className="row">
        <div className="col-md-2"></div>
        {this.props.film.map((item, i) => (
          <div key={i} className="col-md-8" style={{marginTop:'10px'}}>
          <Card key={i} style={{minHeight:'100%',display:'flex',flexDirection:'flex-start'}}>
          <div style={{display:'flex',flexDirection:'flex-start'}}>
            <CardImg  width="100%" src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
            <CardBody>
              <CardTitle
               style={{color:'darkblue',fontSize:'20px',fontWeight:'bold',cursor:'pointer'}}
              >{item.title}</CardTitle>

              <CardSubtitle className="d-flex justify-content-between">
              </CardSubtitle>

              <CardText>{item.overview}</CardText>
            </CardBody>
            </div>
          </Card>
          </div>))
        }
        <div className="col-md-2"></div>

        </div>


      </div>
    );
  }
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
export default connect(mapStateToProps,mapDispatchToProps)(FilmDetailed);
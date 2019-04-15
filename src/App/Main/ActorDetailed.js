import React, { Component } from 'react';
import {
  Card,
  CardImg,
//   CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
// import {FaStar} from 'react-icons/fa';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { connect } from "react-redux";

class ActorDetailed extends Component {
  
  render() {
    // console.log(this.props,'props-film-1')
    return (
      <div className="container-fluid">
      <div className="row">
         <Pagination aria-label="Page navigation example" style={{marginLeft:'25px',marginTop:'10px'}}>
            <PaginationItem >
                <PaginationLink  previous onClick={()=>this.props.history.push('/actors')}>
             Back 
             </PaginationLink>
            </PaginationItem>         
        </Pagination>
        </div>
        <div className="row">
        <div className="col-md-2"></div>
        {this.props.actor.map((item, i) => (
          <div key={i} className="col-md-8" style={{marginTop:'10px'}}>
          <Card key={i} style={{minHeight:'100%',display:'flex',flexDirection:'flex-start'}}>
          <div style={{display:'flex',flexDirection:'flex-start'}}>
          <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt={item.name} />

            <CardBody>
              <CardTitle
               style={{color:'darkblue',fontSize:'20px',fontWeight:'bold',cursor:'pointer'}}
              >{item.name}</CardTitle>

              <CardSubtitle className="d-flex justify-content-between">
              </CardSubtitle>

              {/* <CardText>{item.overview}</CardText> */}
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
export default connect(mapStateToProps,mapDispatchToProps)(ActorDetailed);
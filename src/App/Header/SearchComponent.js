import React, { Component } from 'react';
import {
  InputGroupAddon,
  InputGroupText,
  Input
} from 'reactstrap';
import { FaSistrix } from "react-icons/fa";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const API_KEY = '5874acfd11651a28c55771624f7021f4';

class SearchComponent extends Component {
    onSearchInputChange = event => {
        if(this.props.location.pathname==='/films'){

        this.props.updateSearchedFilmData(event.target.value,this.props.searchedFilmData);
        } 
        else{
            this.props.updateSearchedActors(event.target.value, this.props.searchedActors)
        }
        if (event.key === "Enter") {

        if(this.props.location.pathname==='/films'){
            this.gettingSeachedFilms(event.target.value);
            // this.input.blur();

        } else {
            this.gettingListActors(event.target.value)
        }

          }
      };

    async gettingSeachedFilms(searchFilmWord) {
        const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchFilmWord}&page=1&include_adult=false`       
        );
        const data = await response.json();
        this.props.updateSearchedFilmData('',data.results)
      }

      async gettingListActors(searchActorWord) {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${searchActorWord}&page=1&include_adult=false`
        );
        const data = await response.json();
        this.props.updateSearchedActors('', data.results)
      }

  render() {
    //   console.log(this.props,'search-props')
    return (
        <div className="Search">
  
              <InputGroupAddon addonType="append" size="normal">
          {this.props.location.pathname==='/films'&&<Input
                  type="text"
                  placeholder="Search..."
                  value={this.props.searchWord}
                  onChange={this.onSearchInputChange}
                  onKeyPress={this.onSearchInputChange}
                //   ref={Input => {
                //     this.input = Input;
                //   }}
                />}
              { this.props.location.pathname==='/actors' && <Input
                  type="text"
                  placeholder="Search..."
                  value={this.props.searchActorWord}
                  onChange={this.onSearchInputChange}
                  onKeyPress={this.onSearchInputChange}
                />}
                <InputGroupText
                // style={{cursor:'pointer'}}
                //   onClick={this.onSearchInputChange}
                >
                  <FaSistrix />
                </InputGroupText>
              </InputGroupAddon>
         
      </div>
    );
  }
}


    const mapStateToProps = state => {
        return {
            searchWord: state.searchFilmReducer.searchWord,
            searchedFilmData: state.searchFilmReducer.searchedFilmData,
            searchActorWord: state.searchActorReducer.searchActorWord,
            searchedActors: state.searchActorReducer.searchedActors

        };
    };

    const mapDispatchToProps = dispatch => {
        return {
        updateSearchedFilmData: (searchWord,searchedFilmData) => {
            dispatch({ type: "UPDATE_SEARCHED_FILM_DATA", payloadWord: searchWord, payloadFilms: searchedFilmData });
        },
        updateSearchedActors: (searchActorWord,searchedActors) => {
            dispatch({ type: "UPDATE_SEARCHED_ACTORS", payloadWord:searchActorWord, payloadActors: searchedActors });
        }
    };
    }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchComponent));
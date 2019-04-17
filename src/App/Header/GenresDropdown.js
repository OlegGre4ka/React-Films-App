import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const API_KEY = '5874acfd11651a28c55771624f7021f4';

class GenresDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            //   genres:[]
        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    componentDidMount() {
        this.gettingGenres();
        this.props.updateGenreID(null, 'Genres');

    }

    async gettingGenres() {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const genres = await response.json();
        this.props.updateGenres(genres.genres)
    }

    render() {

        return (
           <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        {/* //         {this.props.genreID === null && <DropdownToggle caret>
        //             Genres
        // </DropdownToggle>} */}
                {/* // {this.props.genreID !== null &&  */}
                    <DropdownToggle caret>
                    {this.props.genreName}
                </DropdownToggle>
                <DropdownMenu>
                    {this.props.genres.map((genre, i) => (<DropdownItem key={i}
                        onClick={() => this.props.updateGenreID(genre.id, genre.name)}
                    >{genre.name}</DropdownItem>))}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}
const mapStateToProps = state => {
    return {
        genres: state.genresReducer.genres,
        genreID: state.selectIDGenreReducer.genreID,
        genreName: state.selectIDGenreReducer.genreName

    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateGenres: genres => {
            dispatch({ type: "GETTING_GENRES", payload: genres });
        },
        updateGenreID: (genreID, genreName) => {
            dispatch({ type: "UPDATE_ID_GENRE", payload: genreID, payloadName: genreName });
        }

    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenresDropdown));
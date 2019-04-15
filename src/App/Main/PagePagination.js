import React from 'react';
import '../App.scss';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from "react-redux";

class PagePagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          films: [],
          // page:1
        };
    }
    selectPrevPage =() => {
        this.props.updateCurrentPage(this.props.page-1)
    }
    selectNextPage = () => {

        if (this.props.page <= 5) {
            this.props.updateCurrentPage(6)
        } else {
            this.props.updateCurrentPage(this.props.page + 1)
        }
    }
    render() {
        return (
        <div className="PagePagination">
        <Pagination aria-label="Page navigation example">
            {/* <PaginationItem>
                <PaginationLink first  />
            </PaginationItem> */}
            <PaginationItem>
                <PaginationLink previous onClick={this.selectPrevPage}/>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink onClick={()=>this.props.updateCurrentPage(1)}>
                    1
          </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink onClick={()=>this.props.updateCurrentPage(2)}>
                    2
          </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink onClick={()=>this.props.updateCurrentPage(3)}>
                    3
          </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink onClick={()=>this.props.updateCurrentPage(4)}>
                    4
          </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink onClick={()=>this.props.updateCurrentPage(5)}>
                    5
          </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink next onClick={this.selectNextPage} />
            </PaginationItem>
            {/* <PaginationItem>
                <PaginationLink last />
            </PaginationItem> */}
        </Pagination>
        </div>);
    }
}
    const mapStateToProps = state => {
        return {
            page: state.paginationReducer.page
        };
    };
  
    const mapDispatchToProps = dispatch => {
        return {
        updateCurrentPage: page => {
            dispatch({ type: "UPDATE_PAGE", payload: page });
        }
        };
    };
export default connect(mapStateToProps,mapDispatchToProps)(PagePagination);
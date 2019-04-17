import React from 'react';
import '../App.scss';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from "react-redux";

const PagePagination = props => {

    const selectPrevPage = () => {
        if (props.page >= 2) {
            props.updateCurrentPage(props.page - 1)
        } else {
            props.updateCurrentPage(1)
        }
    }
    const selectNextPage = () => {

        if (props.page <= 5) {
            props.updateCurrentPage(6)
        } else {
            props.updateCurrentPage(props.page + 1)
        }
    }
    return (
        <div className="PagePagination">
            <Pagination aria-label="Page navigation example">
                {/* <PaginationItem>
                <PaginationLink first  />
            </PaginationItem> */}
                {/* <PaginationItem>
                <PaginationLink previous onClick={selectPrevPage}/>
            </PaginationItem> */}
                <PaginationItem>
                    <PaginationLink onClick={() => props.updateCurrentPage(1)}>
                        1
          </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => props.updateCurrentPage(2)}>
                        2
          </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => props.updateCurrentPage(3)}>
                        3
          </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => props.updateCurrentPage(4)}>
                        4
          </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => props.updateCurrentPage(5)}>
                        5
          </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink previous onClick={selectPrevPage} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink next onClick={selectNextPage} />
                </PaginationItem>
           {props.page>5&&<PaginationItem>
                    <PaginationLink>
                        {props.page}
                    </PaginationLink>
                </PaginationItem>}

                {/* <PaginationItem>
                <PaginationLink last />
            </PaginationItem> */}
            </Pagination>
        </div>);
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
export default connect(mapStateToProps, mapDispatchToProps)(PagePagination);
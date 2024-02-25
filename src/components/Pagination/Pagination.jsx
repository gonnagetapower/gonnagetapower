import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css'


const Pagination = ({ currentPage, setCurrentPage, pageCount }) => (
    <ReactPaginate
        className='pagination'
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => setCurrentPage(event.selected + 1)}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        forcePage={currentPage - 1}
    />
);

export default Pagination;
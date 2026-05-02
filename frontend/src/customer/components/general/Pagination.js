import React from "react";

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }
    return (
        <nav className="woocommerce-pagination" aria-label="Shop Page navigation">
            <ul className="pagination pagination__custom justify-content-md-center flex-nowrap flex-md-wrap overflow-auto overflow-md-visble">
                <li className="flex-shrink-0 flex-md-shrink-1 page-item" title="Previous">
                    {currentPage > 0 ? (<button
                        className="prev page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>) : (<></>)}
                </li>
                {pageNumbers.map((number) => (
                    <li key={number}
                        className={`flex-shrink-0 flex-md-shrink-1 page-item ${currentPage === number - 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(number - 1)}>
                            {number}
                        </button>
                    </li>
                ))}
                <li className="flex-shrink-0 flex-md-shrink-1 page-item" title="Next">
                    {currentPage < totalPages - 1 ? (<button
                        className="next page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>) : (<></>)}
                </li>
            </ul>
        </nav>
    );
}
export default Pagination;

import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    const handleClick = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        onPageChange(page);
    };
    return (
        <nav className="woocommerce-pagination"
        style={{marginBottom:"15px"}}
        >
            <ul className="pagination pagination__custom justify-content-md-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="prev page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                    <span>{"<"}</span>
                    </button>
                </li>

                {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;

                    return (
                        <li
                            key={page}
                            className={`page-item ${currentPage === page ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                    onClick={() => handleClick(page)}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button
                        className="next page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <span>{">"}</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;

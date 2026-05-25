import { Link } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useState } from "react";

export const SearchBar = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openSearch = () => {
        setIsOpen(true);
        onToggle?.(true);
    };

    const closeSearch = () => {
        setIsOpen(false);
        onToggle?.(false);
    };

    return (
        <div className={`search-box ${isOpen ? "active" : ""}`}>
            {!isOpen && (
                <button
                    type="button"
                    className="search-icon-btn"
                    onClick={openSearch}
                >
                    <FaSearch />
                </button>
            )}

            {isOpen && (
                <>
                    <div className="input-wrapper">
                        <FaSearch id="search-icon" />
                        <input
                            type="text"
                            className="searchInput"
                            placeholder="Tìm kiếm..."
                            autoFocus
                        />
                        <button
                            type="button"
                            className="search-close-btn"
                            onClick={closeSearch}
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <SearchResults />
                </>
            )}
        </div>
    );
};

export const SearchResults = () => {
    return (
        <div className="search-results">
            <Link className="result" to="/">
                <img
                    className="imageSearch"
                    src="https://via.placeholder.com/40"
                    alt="product"
                />
                <p>Tên sản phẩm</p>
            </Link>
        </div>
    );
};
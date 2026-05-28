import { Link } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import React,{ useState,useEffect } from "react";
import api from "../../../service/ApiService"

export const SearchBar = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const openSearch = () => {
        setIsOpen(true);
        onToggle?.(true);
    };
    const closeSearch = () => {
        setIsOpen(false);
        setKeyword("");
        setResults([]);
        onToggle?.(false);
    };
    useEffect(()=>{
        const searchResult = async () =>{
            const q = keyword.trim();
                if (q.length < 2) {
                    setResults([]);
                    return;
                }
                try {
                    setLoading(true);
                    const data = await api.fetchData(`/search?keyword=${encodeURIComponent(q)}`);
                    setResults(data);
                    // console.log(data)
                } catch (error) {
                    console.error("Error:", error);
                    setResults([]);
                } finally {
                    setLoading(false);
                }
        }
        searchResult();
    },[keyword]);
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
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
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
                    <SearchResults
                        keyword={keyword} 
                        results={results}
                        loading={loading}
                        onClose={closeSearch}
                    />
                </>
            )}
        </div>
    );
};

export const SearchResults = ({keyword, results, loading, onClose}) => {
    const q = keyword.trim();
    if (q.length < 2) {
        return null;
    }
    return (
        <div className="search-results">
            {loading && (
                <div className="search-message">
                    Đang tìm kiếm...
                </div>
            )}
            {!loading && results.length === 0 && (
                <div className="search-message">
                    Không tìm thấy kết quả
                </div>
            )}
            {!loading && results.map((item) => (
                <Link
                    key={`${item.type}-${item.id}`}
                    className="result"
                    to={item.url}
                    onClick={onClose}>
                    <img className="imageSearch"
                        src={item.image || "https://via.placeholder.com/40"}
                        alt={item.title}/>
                    <div className="search-info">
                        <p>{item.title}</p>
                        <span>
                            {item.type === "product"
                                ? "Sản phẩm"
                                : "Bài viết"}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
};
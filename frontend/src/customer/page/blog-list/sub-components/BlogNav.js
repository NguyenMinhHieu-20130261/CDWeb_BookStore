import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import api from "../../../../service/ApiService";

const BlogNav = () => {
    const [blogCate, setBlogCate] = React.useState([]);
    const [selectedCateId, setSelectedCateId] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await api.fetchData("/blog-cate");
                console.log("BlogCate:", data);
                setBlogCate(data);
            } catch (error) {
                console.error("Load blogcate error:", error);
            }
        };
        loadData();
    }, []);
     const handleCategoryClick = (categoryId) => {
        setSelectedCateId(categoryId);
    };
    return (
        <ul
            className="nav justify-content-md-center nav-gray-700 mb-5 flex-nowrap flex-md-wrap overflow-auto overflow-md-visible"
            id="featuredBooks"
            role="tablist"
        >
            {/* Tab All */}
            <li className="nav-item mx-5 mb-1 flex-shrink-0 flex-md-shrink-1">
                <Link
                    to={"/blog-list/all"}
                    id="tab-all"
                    className={`nav-link px-0 ${selectedCateId === null ? "active" : ""}`}
                    data-toggle="tab"
                    aria-controls="all"
                    onClick={(e) => {
                        handleCategoryClick(null);
                    }}
                >
                    All
                </Link>
            </li>
            {/* Tab từng category */}
            {blogCate.map(category => (
                <li className="nav-item mx-5 mb-1 flex-shrink-0 flex-md-shrink-1"
                    key={category.id}>
                    <Link
                        id={`tab-${category.id}`}
                        to={`/blog-list/${category.id}`}
                        className={`nav-link px-0 ${selectedCateId === category.id ? "active" : ""}`}
                        role="tab"
                        aria-controls={`cat-${category.id}`} aria-selected="false"
                        onClick={(e) => {
                            handleCategoryClick(category.id);
                        }}
                    >
                        {category.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
export default BlogNav;
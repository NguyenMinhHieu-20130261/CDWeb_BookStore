import { Link, useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import api from "../../../../service/ApiService";

const BlogNav = () => {
    const [blogCate, setBlogCate] = useState([]);
    const {cateId} = useParams(); 

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await api.fetchData("/blog-cate/all");
                // console.log("BlogCate:", data);
                setBlogCate(data);
            } catch (error) {
                console.error("Load blogcate error:", error);
            }
        };
        loadData();
    }, []);
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
                    state={{   
                        type: "blog-list",
                        title: "Tất cả bài viết"
                    }}              
                    id="tab-all"
                    className={`nav-link px-0 ${!cateId || cateId === "all" ? "active" : ""}`}
                    data-toggle="tab"
                    aria-controls="all"
                >
                    Tất cả
                </Link>
            </li>
            {/* Tab từng category */}
            {blogCate.map(category => (
                <li className="nav-item mx-5 mb-1 flex-shrink-0 flex-md-shrink-1"
                    key={category.id}>
                    <Link
                        id={`tab-${category.id}`}
                        to={`/blog-list/${category.id}`}
                        state={{
                            type: "blog-category",
                            title: category.name,
                            categoryName: category.name,
                            categoryLink: `/blog-list/${category.id}`
                        }}
                        className={`nav-link px-0 ${String(cateId) === String(category.id) ? "active" : ""}`}
                        role="tab"
                        aria-controls={`cat-${category.id}`} aria-selected="false"
                    >
                        {category.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
export default BlogNav;
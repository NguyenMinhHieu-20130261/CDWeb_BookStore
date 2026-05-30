import React from "react";
import Breadcrumb from "../../components/general/Breadcrumb";
import Pagination from "../../components/general/Pagination";
import BlogNav from "./sub-components/BlogNav";
import BlogGrid from "./sub-components/BlogGrid";


const BlogList = () => {
    return (
        <div className="blog theme-bookworm">
            <Breadcrumb />
            <div className="container mt-5">
                <BlogNav />
                <BlogGrid/>
                <Pagination />
            </div>
        </div>
    );
};

export default BlogList;
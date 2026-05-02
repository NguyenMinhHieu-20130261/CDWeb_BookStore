import React from "react";
import Breadcrumb from "../../components/general/Breadcrumb";
import Pagination from "../../components/general/Pagination";
import BlogNav from "./sub-components/BlogNav";
import BlogGrid from "./sub-components/BlogGrid";
import blogs from "./sub-components/BlogData";

const BlogList = () => {
    return (
        <div className="blog theme-bookworm">
            <Breadcrumb />

            <div className="container mt-5">
                <BlogNav />
                <BlogGrid posts={blogs} />
                <Pagination />
            </div>
        </div>
    );
};

export default BlogList;
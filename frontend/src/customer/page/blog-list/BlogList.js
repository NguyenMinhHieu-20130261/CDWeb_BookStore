import React from "react";
import Breadcrumb from "../../components/general/Breadcrumb";
import Pagination from "../../components/general/Pagination";
import BlogNav from "./sub-components/BlogNav";
import BlogGrid from "./sub-components/BlogGrid";

// import LoadingPage from "../../components/general/LoadingPage";
// import { useState } from "react";

const BlogList = () => {
    // const [loading, setLoading] = useState();
    // if (loading) {
    //     return <LoadingPage />;
    // }
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
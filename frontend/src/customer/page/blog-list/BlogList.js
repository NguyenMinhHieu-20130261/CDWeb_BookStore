import React, {useState} from "react";
import Breadcrumb from "../../components/general/Breadcrumb";
import Pagination from "../../components/general/Pagination";
import BlogNav from "./sub-components/BlogNav";
import BlogGrid from "./sub-components/BlogGrid";

const BlogList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div className="blog theme-bookworm">
            <Breadcrumb />
            <div className="container mt-5">
                <BlogNav onChangeCategory={() => setCurrentPage(1)} />
                <BlogGrid
                    currentPage={currentPage}
                    setTotalPages={setTotalPages}
                />
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default BlogList;
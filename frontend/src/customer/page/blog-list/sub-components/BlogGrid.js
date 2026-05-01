import React from "react";
import BlogItem from "./BlogItem";

const BlogGrid = ({ posts }) => {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {posts.map((post, index) => (
                <BlogItem key={index} post={post} />
            ))}
        </div>
    );
};

export default BlogGrid;
// BlogItem.jsx
import React from "react";

const BlogItem = ({ post }) => {
    return (
        <article className="col blog-grid">
            <div className="mb-6">
                <a className="d-block mb-3" href={post.link}>
                    <img className="img-fluid w-100 rounded" src={post.image} alt={post.title} />
                </a>

                <div className="mb-1 text-primary">
                    {post.categories.map((cat, index) => (
                        <a key={index} className="small" href="#">
                            {cat}
                            {index < post.categories.length - 1 ? ", " : ""}
                        </a>
                    ))}
                </div>

                <h2 className="h5 mb-3">
                    <a href={post.link}>{post.title}</a>
                </h2>

                <p className="text-muted mb-4">{post.description}</p>

                <div className="text-secondary-gray-700 post-meta">
                    <span>{post.date}</span>
                </div>
            </div>
        </article>
    );
};

export default BlogItem;
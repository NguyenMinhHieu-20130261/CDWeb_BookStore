import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ id, title, image, content, created_at,slug,categoryName, categoryId}) => {
    const shortenContent = (content, maxLength) => {
        if (!content) return "";

        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(content, "text/html");
        const textContent = htmlDoc.body.textContent || "";

        if (textContent.length <= maxLength) {
            return textContent;
        }

        return textContent.substring(0, maxLength) + "...";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);

        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };
    const imgSrc = image || "https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg";
    const blogState = {
        title: title,
        categoryName: categoryName,
        categoryLink: categoryId ? `/blog-list/${categoryId}` : "/blog-list/all"
    };
    return (
        <article className="col blog-grid">
            <div className="mb-6">
                <Link className="d-block mb-3" 
                    to={`/blog-detail/${slug}`}
                    state={blogState}
                >
                     <img
                        style={{width: "445px", height: "300px", objectFit: "cover"}}
                        src={imgSrc}
                        className="img-fluid w-100 rounded wp-post-image"
                        alt={title}
                        sizes="(max-width: 445px) 100vw, 445px"
                    />
                </Link>
                {/* <div className="mb-1 text-primary">
                    {post.categories.map((cat, index) => (
                        <Link key={index} className="small" to="#">
                            {cat}
                            {index < post.categories.length - 1 ? ", " : ""}
                        </Link>
                    ))}
                </div> */}
                {/* Hiển thị title */}
                <h2 className="h5 mb-3">
                    <Link 
                        to={`/blog-detail/${slug}`}
                        state={blogState}
                    >
                        {title}
                    </Link>
                </h2>
                {/* Hiển thị mô tả rút gọn */}
                <p className="text-muted mb-4">{shortenContent(content, 100)}</p>
                <div className="text-secondary-gray-700 post-meta">
                    <i className="fa-regular fa-clock"></i>
                    <span className="ml-1">{formatDate(created_at)}</span>
                </div>
            </div>
        </article>
    );
};

export default BlogItem;
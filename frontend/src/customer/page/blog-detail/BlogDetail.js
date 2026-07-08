import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogContent from "./sub-components/BlogContent";
import Author from "./sub-components/Author";
import Breadcrumb from "../../components/general/Breadcrumb";
import api from "../../../service/ApiService";

export const BlogDetail = () => {
    const {slug} = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            setLoading(true);
            try {
                const data = await api.fetchData(`/blogs/detail/${slug}`);
                // console.log("BLOG DETAIL:", data);
                setBlog(data);
            } catch (error) {
                console.log("Lỗi khi lấy chi tiết bài viết:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetail();
    }, [slug]);

    if (loading) {
        return <div style={{ textAlign: "center" }}>Đang tải...</div>;
    }
    if (!blog) {
        return <div style={{ textAlign: "center" }}>Không tìm thấy bài viết.</div>;
    }
    return (
        <div>
            <Breadcrumb />

            <div className="bookworm-single-post mb-5 mb-lg-6 pb-xl-1">
                <div className="container">
                    <div className="container__inner">
                        <article
                            id={`post-${blog.id}`}
                            className="article article__single post type-post status-publish format-standard has-post-thumbnail hentry"
                        >
                            <img  
                                width="1400"
                                height="650"
                                src={blog.thumbnail || "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1400&q=80"}
                                className="img-fluid d-block mx-auto wp-post-image"
                                alt={blog.title}
                                style={{
                                    width: "100%",
                                    height: "500px",
                                    objectFit: "cover",
                                    borderRadius: "8px"
                                }}
                            />
                            <div style={{ marginTop: "-120px", position: "relative", zIndex: 2 }}>
                                <BlogContent blog={blog} />
                            </div>
                            <Author blog={blog} />
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BlogDetail;
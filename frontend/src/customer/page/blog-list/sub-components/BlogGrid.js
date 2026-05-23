import BlogItem from "./BlogItem";
import React, { useEffect, useState } from "react";
import api from "../../../../service/ApiService";
import axios from "axios";

const BlogGrid = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // const data = await api.fetchData("/blogs");
                const res = await axios.get("http://localhost:8080/api/blogs");
                console.log("BLOGS:", res.data);

                setBlogs(res.data);
            } catch (error) {
                console.log("Lỗi khi lấy danh sách bài viết:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <div style={{textAlign: 'center'}}>Đang tải...</div>;
    }
    return (
        <>
            <div className="tab-pane fade active show" id="all_cats" role="tabpanel"
                 aria-labelledby="tab-all_cats">
                {blogs.length > 0 ?
                    (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {blogs.map(blog => (
                        <BlogItem
                            id={blog.id}
                            title={blog.title}
                            image={blog.thumbnail ? blog.thumbnail : "https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg"}
                            content={blog.content}
                            created_at={blog.createdAt}
                        />
                    ))}
                </div>)
                    :
                    <div style={{textAlign: 'center'}}>Không có tin tức phù hợp nào.</div>}
            </div>
        </>
    );
};

export default BlogGrid;
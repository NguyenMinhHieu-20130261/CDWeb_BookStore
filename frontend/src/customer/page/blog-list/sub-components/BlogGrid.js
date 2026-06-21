import BlogItem from "./BlogItem";
import React, { useEffect, useState } from "react";
import api from "../../../../service/ApiService";
import { useLocation, useParams } from "react-router-dom";

const BlogGrid = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const {cateId} = useParams();
    const location = useLocation();
    const currentCategoryName = location.state?.categoryName || location.state?.title;
    const currentCategoryId = cateId;
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                // Nếu cateId là "all" hoặc không tồn tại, lấy tất cả bài viết
                let data;
                if (!cateId || cateId === "all") {
                    data = await api.fetchData("/blogs");
                } else {
                    data = await api.fetchData(`/blogs/category/${cateId}`);
                }
                // console.log("BLOGS:", data);

                setBlogs(data);
            } catch (error) {
                console.log("Lỗi khi lấy danh sách bài viết:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [cateId]);

    if (loading) {
        return <div style={{textAlign: 'center'}}>Đang tải...</div>;
    }
    return (
        <>
            <div className="tab-pane fade active show" id="all_cats" role="tabpanel" aria-labelledby="tab-all_cats">
                {blogs.length > 0 ? ( 
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        {blogs.map(blog => (
                            <BlogItem
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                slug={blog.slug}
                                image={blog.thumbnail}
                                content={blog.shortDescription}
                                created_at={blog.createdAt}
                                categoryName={
                                    blog.category?.name ||
                                    blog.blogCate?.name ||
                                    currentCategoryName
                                }
                                categoryId={
                                    blog.category?.id ||
                                    blog.blogCate?.id ||
                                    currentCategoryId
                                }
                            />
                        ))}
                        </div>
                    ): (
                        <div style={{textAlign: 'center'}}>Không có tin tức phù hợp nào.</div>
                )}
            </div>
        </>
    );
};

export default BlogGrid;
import BlogItem from "./BlogItem";
import React, { useEffect, useState } from "react";
import api from "../../../../service/ApiService";
import { useLocation, useParams } from "react-router-dom";

const BlogGrid = ({currentPage,setTotalPages}) => {
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
                const size = 6;

                const url =
                    !cateId || cateId === "all"
                        ? `/blogs/active-page?page=${currentPage - 1}&size=${size}`
                        : `/blogs/active-page?page=${currentPage - 1}&size=${size}&categoryId=${cateId}`;

                const data = await api.fetchData(url);
                // console.log("BLOGS:", data);

                setBlogs(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.log("Lỗi khi lấy danh sách bài viết:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [cateId, currentPage, setTotalPages]);
    
    if (loading) {
        return <div style={{textAlign: 'center'}}>Đang tải...</div>;
    }
    return (
        <>
            <div className="tab-pane fade active show" id="all_cats" role="tabpanel" aria-labelledby="tab-all_cats">
                {blogs.length > 0 ? ( 
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3">
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
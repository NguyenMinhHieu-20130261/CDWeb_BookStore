import { Link } from "react-router-dom";

const BlogContent = ({ blog }) => {
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };
    return (
        <div className="article-post max-width-940 mx-auto bg-white position-relative">
            <div className="article-post__inner mt-n10 mt-md-n13 pt-5 pt-lg-7 px-0 px-md-5 pl-xl-10 pr-xl-8 mb-8">
                <div className="ml-xl-4">
                    <div className="mb-5 mb-lg-7">
                        <div className="mb-2 text-primary">
                            <Link to="/blog-list/all" className="font-size-3 text-primary">
                                Blog
                            </Link>
                        </div>

                        <h6 className="font-size-10 mb-3 crop-text-2 font-weight-medium text-lh-1dot4">
                            {blog.title}
                        </h6>

                        <div className="single-post-meta text-secondary-gray-700">
                            <span className="post-date text-secondary-gray-700">
                                {formatDate(blog.createdAt)}
                            </span>
                        </div>
                    </div>

                    {blog.shortDescription && (
                        <p className="text-lh-1dot72">
                            <strong>{blog.shortDescription}</strong>
                        </p>
                    )}

                    <div
                        className="text-lh-1dot72 mb-4"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlogContent;
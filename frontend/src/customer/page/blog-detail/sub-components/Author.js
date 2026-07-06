import React from "react";
import { Link } from "react-router-dom";

const Author = ({ blog }) => {
    const shareUrl = window.location.href;
    const shareTitle = blog?.title || "Bài viết hay từ GoldLeaf";

    const handleCopyLink = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(shareUrl);
        alert("Đã sao chép liên kết bài viết vào bộ nhớ tạm!");
    };

    return (
        <div className="col-lg-9 px-0 px-md-5 mx-auto mt-4 mb-6">
            <div className="px-md-5 pl-xl-10 pr-xl-4">
                <div className="ml-xl-4">
                    {/* Tags / Category section */}
                    {blog?.category && (
                        <div className="pb-4 border-bottom mb-4 d-flex align-items-center flex-wrap">
                            <span className="font-weight-medium text-dark mr-3" style={{ fontSize: "15px" }}>
                                <i className="fa-solid fa-tags text-primary mr-1"></i> Danh mục:
                            </span>
                            <Link 
                                to={`/blog-list/${blog.category.id}`} 
                                className="btn btn-sm btn-light text-primary rounded-pill px-3 py-1 font-weight-medium"
                                style={{ border: "1px solid #e1e8ed" }}
                            >
                                {blog.category.name}
                            </Link>
                        </div>
                    )}

                    {/* Sharing section */}
                    <div className="d-flex align-items-center mb-5 flex-wrap">
                        <span className="font-weight-medium text-dark mr-3" style={{ fontSize: "15px" }}>
                            <i className="fa-solid fa-share-nodes text-primary mr-1"></i> Chia sẻ:
                        </span>
                        <div className="d-flex">
                            <a 
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-secondary btn-sm rounded-circle mr-2 d-inline-flex align-items-center justify-content-center"
                                style={{ width: "36px", height: "36px", transition: "0.2s" }}
                                title="Chia sẻ qua Facebook"
                            >
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a 
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-secondary btn-sm rounded-circle mr-2 d-inline-flex align-items-center justify-content-center"
                                style={{ width: "36px", height: "36px", transition: "0.2s" }}
                                title="Chia sẻ qua Twitter / X"
                            >
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <button 
                                onClick={handleCopyLink}
                                className="btn btn-outline-secondary btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
                                style={{ width: "36px", height: "36px", transition: "0.2s" }}
                                title="Sao chép liên kết"
                            >
                                <i className="fa-solid fa-copy"></i>
                            </button>
                        </div>
                    </div>

                    {/* Author card section */}
                    <div className="bg-light rounded p-4 d-md-flex align-items-center border" style={{ borderColor: "#eaeaea" }}>
                        <div 
                            className="avatar-circle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mx-md-0 mb-3 mb-md-0 mr-md-4" 
                            style={{ width: "80px", height: "80px", minWidth: "80px", fontSize: "28px" }}
                        >
                            <i className="fa-solid fa-feather-pointed"></i>
                        </div>
                        <div className="text-center text-md-left">
                            <h6 className="font-weight-bold font-size-3 mb-2 text-dark">
                                Ban Biên Tập GoldLeaf
                            </h6>
                            <p className="font-size-2 text-secondary-gray-700 mb-0" style={{ lineHeight: "1.6" }}>
                                Cung cấp những bài viết hay, chia sẻ kinh nghiệm chọn sách bổ ích và các câu chuyện truyền cảm hứng đọc sách tới cộng đồng yêu sách mỗi ngày.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Author;
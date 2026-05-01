import { Link } from "react-router-dom";

const Author = () => {
    return (
          <div className="col-lg-9 px-0 px-md-5 mx-auto">
            <div className=" px-md-5 pl-xl-10 pr-xl-4">
                <div className="ml-xl-4">
                    <div className="pb-7 tag-links"><span className="sr-only">Tags: </span>
                        <div className="d-flex flex-wrap">
                            <Link to="https://bookworm.madrasthemes.com/tag/arts/" rel="tag" className="btn btn-outline-primary btn-sm mr-2 mb-2">Tiêu</Link>
                            <Link to="https://bookworm.madrasthemes.com/tag/books/" rel="tag" className="btn btn-outline-primary btn-sm mr-2 mb-2">Đề</Link>
                            <Link to="https://bookworm.madrasthemes.com/tag/kids/" rel="tag" className="btn btn-outline-primary btn-sm mr-2 mb-2">Số</Link>
                            <Link to="https://bookworm.madrasthemes.com/tag/romance/" rel="tag" className="btn btn-outline-primary btn-sm mr-2 mb-2">Một</Link>
                        </div>
                    </div>
                    <div className="mb-7 mt-0">
                        <div className="mb-7">
                            <div className="sharedaddy sd-sharing-enabled">
                                <div className="robots-nocontent sd-block sd-social sd-social-icon sd-sharing"><span
                                    className="sharing-title font-size-2 text-gray-600 font-weight-normal ml-1 mr-md-3 mr-xl-5">Share
                                                this:</span>
                                    <div className="sd-content">
                                        <ul>
                                            <li><a href="#"
                                                   className="sharing-anchor sd-button share-more"><span>Share</span></a>
                                            </li>
                                            <li className="share-end"></li>
                                        </ul>
                                        <div className="sharing-hidden">
                                            <div className="inner" 
                                            style={{display: "none"}}
                                            >
                                                <ul>
                                                    <li className="share-twitter"><Link rel="nofollow noopener noreferrer"
                                                        data-shared="sharing-twitter-1358"
                                                        className="share-twitter share-icon no-text btn py-2 width-175 mb-3 mb-xl-0 mr-md-1 pr-1 text-white font-size-2 bg-twitter"
                                                        to="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/?share=twitter"
                                                        target="_blank"
                                                        title="Click to share on Twitter"><span></span><span
                                                        className="sharing-screen-reader-text">Click to
                                                                        share on Twitter (Opens in new
                                                                        window)</span></Link></li>
                                                    <li className="share-facebook">
                                                        <Link rel="nofollow noopener noreferrer"
                                                            data-shared="sharing-facebook-1358"
                                                            className="share-facebook share-icon no-text btn py-2 width-175 mb-3 mb-xl-0 mr-md-1 pr-1 text-white font-size-2 bg-facebook"
                                                            to="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/?share=facebook"
                                                            target="_blank"
                                                            title="Click to share on Facebook">
                                                            <span></span>
                                                            <span className="sharing-screen-reader-text">Click to share on Facebook (Opens in new window)
                                                            </span>
                                                        </Link></li>
                                                    <li className="share-pinterest">
                                                        <Link
                                                            rel="nofollow noopener noreferrer"
                                                            data-shared="sharing-pinterest-1358"
                                                            className="share-pinterest share-icon no-text btn py-2 width-175 mb-3 mb-xl-0 mr-md-1 pr-1 text-white font-size-2 bg-pinterest"
                                                            to="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/?share=pinterest"
                                                            target="_blank"
                                                            title="Click to share on Pinterest">
                                                                <span></span>
                                                                <span className="sharing-screen-reader-text">Click to share on Pinterest (Opens in new window)
                                                                </span>     
                                                        </Link>
                                                    </li>
                                                    <li className="share-end"></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 pb-1">
                            <div className="bg-gray-200 py-3 py-md-5 px-3 px-md-6">

                                <div className="d-md-flex align-items-center">
                                    <Link className="d-block text-center text-md-left mb-3 mb-md-0"
                                       to="https://bookworm.madrasthemes.com/author/nilofer/">
                                        <img width="120" height="120"
                                             src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img11.jpg"
                                             className="avatar avatar-120 photo img-fluid rounded-circle max-width-120 height-120 mr-md-4"
                                             alt decoding="async"
                                             srcSet="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img11.jpg 140w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img11-100x100.jpg 100w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img11-24x24.jpg 24w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img11-48x48.jpg 48w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img11-96x96.jpg 96w"
                                             sizes="(max-width: 120px) 100vw, 120px"/> </Link>
                                    <div className="text-center text-md-left">
                                        <h6 className="font-weight-medium font-size-3"><Link
                                            to="https://bookworm.madrasthemes.com/author/nilofer/" rel="author">Nguyen Nhat Anh</Link></h6>
                                        <p className="font-size-2 mb-0">.Thông tin về tác giả</p>
                                        <ul className="list-unstyled mb-0 d-md-flex">
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Author;
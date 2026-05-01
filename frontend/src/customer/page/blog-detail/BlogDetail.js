import React from "react";
import { Link } from "react-router-dom";
// import PageLink from "./sub-components/PageLink";
import BlogContent from "./sub-components/BlogContent";
import Author from "./sub-components/Author";
import Breadcrumb from "../../components/general/Breadcrumb";

export const BlogDetail = () => {
    return (
        <div>
            {/* <PageLink/> */}
            <Breadcrumb />
            <div className="bookworm-single-post mb-5 mb-lg-6 pb-xl-1">
                <div className="container">
                    <div className="container__inner">
                        <article id="post-1358"
                                 className="article article__single post-1358 post type-post status-publish format-standard has-post-thumbnail hentry category-childrens-books category-science-math tag-arts tag-books tag-kids tag-romance">
                            <img width="1400" height="650"
                                 src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13.jpg"
                                 className="img-fluid d-block mx-auto wp-post-image" alt decoding="async"
                                 fetchPriority="high"
                                 srcSet="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13.jpg 1400w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-300x139.jpg 300w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-1024x475.jpg 1024w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-768x357.jpg 768w"
                                 sizes="(max-width: 1400px) 100vw, 1400px"/>
                            <BlogContent/>
                            <Author/>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BlogDetail;
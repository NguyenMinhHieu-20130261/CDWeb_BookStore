import { Link } from "react-router-dom";

const BlogContent = () => {
    return (
        <div className="article-post max-width-940 mx-auto bg-white position-relative">
            <div className="article-post__inner mt-n10 mt-md-n13 pt-5 pt-lg-7 px-0 px-md-5 pl-xl-10 pr-xl-8 mb-8">
                <div className="ml-xl-4">
                    <div className="mb-5 mb-lg-7">
                        <div className="mb-2 text-primary">
                            <Link to="/category/childrens-books/" className="font-size-3 text-primary">Loại sách</Link>, <Link
                                to="/category/science-math/"
                                className="font-size-3 text-primary">category </Link>
                        </div>
                        <h6 className="font-size-10 mb-3 crop-text-2 font-weight-medium text-lh-1dot4">
                            Tiêu đề bài viết
                        </h6>
                        <div className="single-post-meta text-secondary-gray-700">
                            <Link to="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                className="post-date text-secondary-gray-700">August 19, 2020</Link>
                        </div>
                    </div>
                    <p className="text-lh-1dot72"><strong>content so 1
                        et.</strong></p>
                    <p className="text-lh-1dot72 mb-4" id="font-size-2-text-lh-1dot72-mb-4">content so 2</p>
                    <p className="text-lh-1dot72 mb-3 pb-1">content so 3.</p>
                    <p className="text-lh-1dot72 mb-10">Pcontent so 4.</p>
                    <div className="wp-block-bwgb-gallery-carousel bwgb-gallery-carousel" id="bwgb-36e267d">
                        <div className="wp-block-bwgb-gallery-carousel__inner">
                            <div className="js-slick-carousel u-slick u-slick--gutters-3 my-5 my-lg-8"
                                    data-infinite="true" data-autoplay="false" data-autoplay-speed="3000" data-speed="4000"
                                    data-slides-show="1" data-slides-scroll="1" data-center-mode="true"
                                    data-center-padding="100px"
                                    data-responsive="[{&quot;breakpoint&quot;:554,&quot;settings&quot;:{&quot;centerPadding&quot;:&quot;0px&quot;}},{&quot;breakpoint&quot;:768,&quot;settings&quot;:{&quot;centerPadding&quot;:&quot;0px&quot;}},{&quot;breakpoint&quot;:992,&quot;settings&quot;:{&quot;centerPadding&quot;:&quot;0px&quot;}},{&quot;breakpoint&quot;:1199,&quot;settings&quot;:{&quot;centerPadding&quot;:&quot;0px&quot;}}]"
                                    data-pagi-classes="text-center u-slick__pagination mt-5 mb-0">
                                <div className="js-slide slick-slide position-relative">
                                    <div className="bg-img-hero min-height-350"
                                            style={{backgroundImage: "url(https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/gallery-2.jpg )"}}>
                                    </div>
                                </div>
                                <div className="js-slide slick-slide position-relative">
                                    <div className="bg-img-hero min-height-350"
                                            style={{backgroundImage:"url( https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/gallery-3.jpg )"}}>
                                    </div>
                                </div>
                                <div className="js-slide slick-slide position-relative">
                                    <div className="bg-img-hero min-height-350"
                                            style={{backgroundImage:"url( https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/gallery-1-1.jpg )"}}>
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

export default BlogContent;
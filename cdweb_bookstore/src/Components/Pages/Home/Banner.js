import bannerImage1 from '../../../assets/img/Banner/banner1.jpg';
import bannerImage2 from '../../../assets/img/Banner/banner2.jpg';
import bannerImage3 from '../../../assets/img/Banner/banner3.jpg';
import bannerImage4 from '../../../assets/img/Banner/banner4.jpg';
export const Banner = () => {
    return (<div className="wp-block-bwgb-columns bwgb-columns bwgb-62e911d" id="bwgb-62e911d">
        <div className="container">
            <div className="wp-block-bwgb-columns__row row">
                <div
                    className="wp-block-bwgb-column bwgb-column spac-bottom-2 space-bottom-lg-3 bwgb-787371f col-sm-12 col-md-12 col-lg-12 col-xl-6"
                    id="bwgb-787371f">
                    <div className="style-10 wp-block-bwgb-banners bwgb-banners bwgb-4836ea9" id="bwgb-4836ea9">
                        <div className="wp-block-bwgb-banner__inner">
                            <div className="bg-img-hero img-fluid height-500"
                                 style={{ backgroundImage: 'url("https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-20.jpg")' }}>
                                <div className="px-6 space-top-3 space-bottom-4 mb-4 mb-lg-0">
                                    <div className="pt-lg-4 pb-lg-3">
                                        <p className="bwgb-banner-pretitle banner__pretitle text-uppercase text-gray-400 font-weight-bold">
                                            GoldLeaf</p>
                                        <h2 className="hero__title font-size-10 mb-4 pb-1"><span
                                            className="bwgb-banner-title hero__title-line-1 font-weight-regular d-block mb-1">Vũ trụ sách mở ra</span><span
                                            className="bwgb-banner-title2 hero__title-line-2 d-block font-weight-regular"><span
                                            className="font-weight-bold">Muôn vàn ưu đãi hot!</span></span>
                                        </h2><a
                                        className="bwgb-banner-action bwgb-button2 banner_btn text-white bwgb-button btn btn-primary btn-wide rounded-0"
                                        href="https://bookworm.madrasthemes.com/product/the-last-sister-columbia-river-book-1-2/"
                                        rel><span>Mua ngay</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="wp-block-bwgb-column bwgb-column bwgb-7387dd6 col-sm-12 col-md-12 col-lg-12 col-xl-6"
                    id="bwgb-7387dd6">
                    <div className="style-17 wp-block-bwgb-banners bwgb-banners bwgb-6313453" id="bwgb-6313453">
                        <div className="row row-cols-md-2">
                            <div className="col-12">
                                <div className="mb-5">
                                    <img src={bannerImage1} alt="" style={{ width: '400px' }}/>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-5">
                                    <img src={bannerImage2} alt="" style={{ width: '400px' }}/>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-5 mb-lg-0">
                                    <div className="mb-5">
                                        <img src={bannerImage3} alt="" style={{ width: '400px' }}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-5 mb-lg-0">
                                    <div className="mb-5">
                                        <img src={bannerImage4} alt="" style={{ width: '400px' }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
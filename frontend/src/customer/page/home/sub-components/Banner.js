import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../assets/css/style-slider.css";

import api from "../../../../service/ApiService";

// import bannerImage1 from "../../../assets/img/Banner/banner1.jpg";
// import bannerImage2 from "../../../assets/img/Banner/banner2.jpg";
// import bannerImage3 from "../../../assets/img/Banner/banner3.jpg";
// import bannerImage4 from "../../../assets/img/Banner/banner4.jpg";
export const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const data = await api.fetchData("/banners/active");
                setBanners(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Lỗi lấy banner:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);
    if (loading) {
        return (
            <section className="home-banner-slider">
                <div className="container">
                    <div className="banner-loading">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    if (banners.length === 0) {
        return (
            <section className="home-banner-slider">
                <div className="container">
                    <div className="banner-empty">
                        Chưa có banner nào.
                    </div>
                </div>
            </section>
        );
    }
    return (
        <section className="home-banner-slider">
            <div className="container">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                >
                    {banners.map((banner, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="home-banner-slide"
                                style={{
                                    backgroundImage: `url(${banner.image})`,
                                }}
                            >
                                <div className="home-banner-content">
                                    <p>{banner.pretitle|| "BookStore"}</p>
                                    <h2>{banner.title}</h2>
                                    <h3>{banner.subtitle}</h3>

                                    <Link to={banner.link} className="home-banner-btn">
                                        Mua ngay
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
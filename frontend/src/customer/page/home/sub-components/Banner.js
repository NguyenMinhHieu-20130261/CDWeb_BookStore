import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../assets/css/style-slider.css";
import bannerImage1 from "../../../assets/img/Banner/banner1.jpg";
import bannerImage2 from "../../../assets/img/Banner/banner2.jpg";
import bannerImage3 from "../../../assets/img/Banner/banner3.jpg";
import bannerImage4 from "../../../assets/img/Banner/banner4.jpg";

export const Banner = () => {
    const banners = [
        {
            image: bannerImage1,
            pretitle: "BookStore",
            title: "Vũ trụ sách mở ra",
            subtitle: "Muôn vàn ưu đãi hot!",
            link: "/product-list",
        },
        {
            image: bannerImage2,
            pretitle: "Khuyến mãi",
            title: "Sách đặc sắc",
            subtitle: "Ưu đãi trong tháng",
            link: "/product-list",
        },
        {
            image: bannerImage3,
            pretitle: "Bán chạy",
            title: "Những cuốn sách",
            subtitle: "Được yêu thích nhất",
            link: "/product-list",
        },
        {
            image: bannerImage4,
            pretitle: "Tri thức",
            title: "Đọc sách mỗi ngày",
            subtitle: "Khám phá thế giới mới",
            link: "/product-list",
        },
    ];
    useEffect(() => {
        const fetchBanners = async () => {
            const data = await api.fetchData("/banners/active");
            setBanners(data);
        };

        fetchBanners();
    }, []);
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
                                    <p>{banner.pretitle}</p>
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
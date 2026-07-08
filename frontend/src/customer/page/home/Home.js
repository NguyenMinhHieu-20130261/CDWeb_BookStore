import {Banner} from "./sub-components/Banner";
import {TopBook} from "./sub-components/TopBook";
import {NewBooks} from "./sub-components/NewBooks";
import {Advertise} from "./sub-components/Advertise";
import {Categories} from "./sub-components/Categories";
import {Features} from "./sub-components/Features";
import { BestSellingBook } from "./sub-components/BestSellingBook";
import LoadingPage from "../../components/general/LoadingPage";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../../service/ApiService";

export const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    // Giả lập thời gian tải dữ liệu
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700);

        return () => clearTimeout(timer);
    }, []);
    if (loading) {
        return <LoadingPage />;
    }
    const handleAddToCart = async (e,product) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng");
            navigate("/sign-in");
            return;
        }
        try {
            await api.sendData("/cart/add", {
                user: {id: user.id},
                product: {id: product.id},
                quantity: 1
            });
            alert("Đã thêm sản phẩm vào giỏ hàng");
        } catch (error) {
            console.log("Lỗi thêm vào giỏ hàng:", error);
            alert("Không thể thêm sản phẩm vào giỏ hàng");
        }
    };
    return (
        <main id="main" className="site-main" role="main">
            <div id="post-152" className=" article__page post-152 page type-page status-publish hentry">
                <div className="article__content article__content--page">
                    <div className="page__content">
                        <div className="wp-block-bwgb-template bwgb-template" id="bwgb-e84cf01">
                            <Banner/>
                            <TopBook
                                handleAddToCart={handleAddToCart}
                            />
                            <NewBooks
                                handleAddToCart={handleAddToCart}
                            />
                            <div className="container">
                                <hr className="my-5" />
                            </div>
                            <BestSellingBook 
                                handleAddToCart={handleAddToCart} 
                            />
                            <Advertise/>
                            <Categories/>
                            <Features/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
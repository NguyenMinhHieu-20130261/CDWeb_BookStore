import APIService from "../../../service/APIService";
import Product from "../shop-product/sub-components/Product";
import Carousel from "react-multi-carousel";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const TopSeller = () => {
    const apiService = new APIService();
    const [isLoading, setIsLoading] = useState(false);
    const responsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 5
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };
    const [topSellBooks, setTopSellBooks] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const result = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/products/top_selling?limit=15`);
                const limitProducts = result.slice(0, 15);
                setTopSellBooks(limitProducts);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        }
        fetchProducts();
    }, [])
    return (
        <div
            className="wp-block-bwgb-products-carousel bwgb-products-carousel space-bottom-2 space-bottom-lg-3 bwgb-8b03692 bwgb-products-carousel__style-v2"
            id="bwgb-8b03692">
            <div className="wp-block-bwgb-products-carousel__inner container">
                <header
                    className="mb-5 justify-content-between align-items-center bwgb-products-carousel__block-header d-md-flex ">
                    <h2 className="bwgb-products-carousel__block-title font-size-7 mb-3 mb-md-0">Top sản phẩm bán
                        chạy</h2><Link to={`/product-list/1`}
                                       className="h-primary d-block bwgb-products-carousel__block-action-text"><span>Xem tất cả</span><i
                    className="fa-solid fa-caret-right ml-1"></i></Link></header>
            </div>
            {isLoading?(<div className="loader"></div>):(<div className="products wp-block-bwgb-products-carousel__content container">
                <Carousel responsive={responsive}>
                    {topSellBooks.map(product => (
                        <div key={product.id} className="card mb-0 mx-2 no-gutters"><Product info={product}/></div>))}
                </Carousel>
            </div>)}
        </div>
    )
}

import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Product from "./sub-components/Product";
import "../../assets/css/style-product.css"
import Breadcrumb from "../../components/general/Breadcrumb";
import SideContent from "./sub-components/SideContent";
import Pagination from "../../components/general/Pagination";
import APIService from "../../../service/APIService";
import ScrollToTop from "../../components/general/ScrollToTop";
import "../../assets/css/loading.css"
import axios from "axios";

const ProductList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const lastParam = params['*'].split('/').pop();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(() => {
        const queryParams = new URLSearchParams(location.search);
        return parseInt(queryParams.get('page') || '1', 10) - 1;
    });
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState('');
    const [perPage, setPerPage] = useState(24);
    const [filter, setFilter] = useState({});
    const [order, setOrder] = useState('');
    const [latestFilter, setLatestFilter] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const apiService = new APIService();

    const [promotion, setPromotion] = useState([]);

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        let newOrder = 'ASC';
        if (newSort === 'atoz') {
            newOrder = 'ASC';
        } else if (newSort === 'ztoa') {
            newOrder = 'DESC';
        } else if (newSort === 'price-asc') {
            newOrder = 'ASC';
        } else if (newSort === 'price-desc') {
            newOrder = 'DESC';
        } else if (newSort === 'latest') {
            newOrder = 'DESC';
        }
        setSort(newSort);
        setOrder(newOrder);
        updateURL({sort: newSort, order: newOrder})
    }

    const handlePerPageChange = (e) => {
        const newPerPage = e.target.value;
        setPerPage(newPerPage);
        updateURL({perPage: newPerPage});
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            updateURL({page: newPage + 1});
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    const handlePriceFilterChange = (priceRange, event) => {
        event.preventDefault();

        const isSelected = selectedPriceRange === priceRange;

        const newPriceRange = isSelected ? null : priceRange;
        setSelectedPriceRange(newPriceRange);

        const updatedFilter = isSelected ? {} : {currentPrice: priceRange};
        setLatestFilter(updatedFilter);
        updateURL({filter: updatedFilter});
    };

    useEffect(() => {
        updateURL({filter: latestFilter});
    }, [lastParam]);

    const updateURL = (params) => {
        const searchParams = new URLSearchParams(location.search);

        Object.keys(params).forEach(key => {
            if (params[key]) {
                // Nếu key là 'filter', cần chuyển đổi đối tượng thành chuỗi JSON và mã hóa URL
                if (key === 'filter') {
                    searchParams.set(key, encodeURIComponent(JSON.stringify(params[key])));
                } else {
                    searchParams.set(key, params[key]);
                }
            } else {
                searchParams.delete(key);
            }
        });

        navigate(`?${searchParams.toString()}`);
    };

    const getProductsByCategory = (categoryId, page = 0, perPage = 24, sort = 'id', filter = '{}', order = 'ASC') => {
        const endpoint = `${process.env.REACT_APP_ENDPOINT_API}/products/category/${categoryId}`;
        const params = {page, perPage, sort, filter, order};
        return apiService.fetchData(endpoint, params);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageParam = parseInt(queryParams.get('page') || '1', 10) - 1;
        const perPageParam = parseInt(queryParams.get('perPage') || '24', 10);
        const sortParam = queryParams.get('sort') || 'id';
        const filterParam = queryParams.get('filter') || '{}';
        const orderParam = queryParams.get('order') || 'ASC';
        setPage(pageParam);
        setPerPage(perPageParam);
        setSort(sortParam);
        setFilter(filterParam);
        setOrder(orderParam);

    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const result = await getProductsByCategory(lastParam, page, perPage, sort, filter, order);
                setProducts(result.content);
                setTotalPages(result.totalPages);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };
        fetchData();
    }, [lastParam, page, perPage, sort, filter, order]);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_ENDPOINT_API}/products/promotion?filter=%7B%22product%22%3A%7D`);
                setPromotion(response.data);
            } catch (error) {
                console.error("Error fetching cates:", error);
            }
        };
        fetchPromotions();
    }, []);

    return (
        <>
            <Breadcrumb/>
            <div className="site-content space-bottom-3 mt-8">
                <div className="container">
                    <div className="row">
                        <div id="primary" className="content-area order-2">
                            <main id="main" className="site-main" role="main">
                                <div className="container p-0">
                                    <div>
                                        <div className="wp-block-bwgb-products-carousel__inner"
                                             style={{fontSize: "18px", fontWeight: 500, marginBottom: "10px"}}>
                                            Sản phẩm giảm giá tốt
                                        </div>
                                        {promotion.length > 0 ?
                                            (
                                                <ul className="products list-unstyled row no-gutters row-cols-2 row-cols-lg-4 row-cols-wd-4 border-top border-left mb-6">
                                                    {promotion.slice(0, 4).map(promotion => (
                                                        <Product key={promotion.id} info={promotion}/>))}
                                                </ul>)
                                            :
                                            <></>}
                                    </div>
                                    <div
                                        className="shop-control-bar d-lg-flex justify-content-between align-items-center mb-5 text-center text-md-left">
                                        <div className="wp-block-bwgb-products-carousel__inner"
                                             style={{fontSize: "18px", fontWeight: 500}}>
                                            Tất cả sản phẩm
                                        </div>
                                        <div className="shop-control-bar__right d-md-flex align-items-center">
                                            <p className="woocommerce-result-count mr-3 mb-0">
                                                Sắp xếp theo: </p>
                                            <form className="woocommerce-ordering mb-4 m-md-0" method="get">
                                                <select name="orderby"
                                                        className="orderby js-select dropdown-select"
                                                        aria-label="Shop order"
                                                        data-style="border-bottom shadow-none outline-none py-2"
                                                        value={sort}
                                                        onChange={handleSortChange}
                                                >
                                                    <option value="id" defaultValue>Mặc định</option>
                                                    <option value="atoz">A&rarr;Z</option>
                                                    <option value="ztoa">Z&rarr;A</option>
                                                    <option value="price-asc">Giá tăng dần</option>
                                                    <option value="price-desc">Giá giảm dần</option>
                                                    <option value="latest">Mới nhất</option>
                                                </select>
                                                <input type="hidden" name="paged" value="1"/>
                                            </form>
                                            <form method="POST" action
                                                  className="number-of-items ml-md-4 mb-4 m-md-0 d-none d-xl-block">
                                                <select name="ppp"
                                                        className="dropdown-select orderby"
                                                        data-style="border-bottom shadow-none outline-none py-2"
                                                        value={perPage}
                                                        onChange={handlePerPageChange}
                                                >
                                                    <option value="24">24 sản phẩm</option>
                                                    <option value="36">36 sản phẩm</option>
                                                    <option value="48">48 sản phẩm</option>
                                                </select>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {isLoading ? (<div className="loader"></div>) :
                                    (<div className="grid-view">
                                        {products.length > 0 ?
                                            (
                                                <ul className="products list-unstyled row no-gutters row-cols-2 row-cols-lg-4 row-cols-wd-4 border-top border-left mb-6">
                                                    {products.map(product => (
                                                        <Product key={product.id} info={product}/>))}
                                                </ul>)
                                            :
                                            <div style={{textAlign: 'center'}}>Không có sản phẩm phù hợp nào.</div>}
                                        {totalPages > 1 && (<Pagination currentPage={page} totalPages={totalPages}
                                                                        onPageChange={handlePageChange}/>)}
                                    </div>)}
                            </main>
                        </div>
                        <SideContent selectedPriceRange={selectedPriceRange}
                                     handlePriceFilterChange={handlePriceFilterChange}/>
                    </div>
                </div>
            </div>
            <ScrollToTop/>
        </>
    );
}
export default ProductList;

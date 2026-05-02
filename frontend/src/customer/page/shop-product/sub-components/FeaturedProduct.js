import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import formatCurrency from "../../../../utils/formatCurrency";
import APIService from "../../../../service/APIService";

const FeaturedProduct = () => {
    const [isShown, setIsShown] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await new APIService().fetchData(`${process.env.REACT_APP_ENDPOINT_API}/products/feature`);
                setProducts(result);
            } catch (error) {

            }
        }
        fetchData()
    }, []);


    const handleToggle = (e) => {
        e.preventDefault();
        setIsShown(!isShown);
    }
    return (
        <div id="woocommerce_products-3" className="widget border p-4d875 woocommerce widget_products">
            <div className="widget-head" id="widgetHeading-woocommerce_products-3">
                <Link className="d-flex align-items-center justify-content-between text-dark"
                      to="" data-toggle="collapse"
                      data-target="#widget-collapse-woocommerce_products-3" aria-expanded="true"
                      aria-controls="widget-collapse-woocommerce_products-3" onClick={(e) => handleToggle(e)}>
                    <h3 className="widget-title font-weight-medium font-size-3 mb-0">Sản phẩm nổi bật</h3>
                    <svg className={`mins ${isShown ? 'd-block' : 'd-none'}`} width="15px" height="2px">
                        <path fill="rgb(22, 22, 25)"
                              d="M0.000,-0.000 L15.000,-0.000 L15.000,2.000 L0.000,2.000 L0.000,-0.000 Z">
                        </path>
                    </svg>
                    <svg className={`plus ${isShown ? '' : 'd-block'}`} width="15px" height="15px">
                        <path fill="rgb(22, 22, 25)"
                              d="M15.000,8.000 L9.000,8.000 L9.000,15.000 L7.000,15.000 L7.000,8.000 L0.000,8.000 L0.000,6.000 L7.000,6.000 L7.000,-0.000 L9.000,-0.000 L9.000,6.000 L15.000,6.000 L15.000,8.000 Z">
                        </path>
                    </svg>
                </Link>
            </div>
            {isShown && (<div id="widget-collapse-woocommerce_products-3"
                              className="mt-4 widget-content collapse show"
                              aria-labelledby="widgetHeading-woocommerce_products-3">
                <ul className="product_list_widget">
                    {products.map(product => (<FeaturedItem key={product.id} product={product}/>))}
                </ul>
            </div>)}
        </div>
    );
}

const FeaturedItem = ({product}) => {
    return (
        <li className="mb-5">
            <div className="media">
                <div className="media d-md-flex">
                    <Link to={`/product-detail/${product.id}`}
                          className="d-block">
                        <img width="150" height="200"
                             src={product.image}
                             className="img-fluid" alt style={{maxWidth: "60px"}}
                             loading="lazy"/>
                    </Link>
                    <div className="media-body ml-3 pl-1">
                        <h6 className="font-size-2 text-lh-md font-weight-normal crop-text-2">
                            <Link to={`/product-detail/${product.id}`} title={product.title}>{product.title}</Link></h6>
                        <span className="price d-flex justify-content-start align-items-center">
                                    <p className="current-price mr-2">
                                        <span className="price"
                                              style={{fontSize: "14px"}}>{formatCurrency(product.currentPrice)}</span>
                                    </p>
                                    <p className="old-price pb-1">
                                        <span className="price"
                                              style={{fontSize: "11px"}}>{formatCurrency(product.oldPrice)}</span>
                                    </p>
                                </span>
                    </div>
                </div>
            </div>
        </li>
    )
}
export default FeaturedProduct;
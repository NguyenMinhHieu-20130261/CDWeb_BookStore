import React from "react";
import {Link} from "react-router-dom";

const FeturedProduct = ({product}) => {
    if (!product) return null;
    return (
        <li className="mb-5">
            <div className="media">
                <div className="media d-md-flex">
                    <Link 
                    to={`/products/${product.slug || product.id}`}
                    className="d-block">
                         <img
                            width="150" height="200"
                            src={product.image}
                            className="img-fluid"
                            alt={product.title}
                            style={{ maxWidth: "60px" }}
                            loading="lazy"
                        />
                    </Link>
                    <div className="media-body ml-3 pl-1">
                        <h6 className="font-size-2 text-lh-md font-weight-normal crop-text-2">
                           <Link to={`/products/${product.slug || product.id}`}>
                                {product.title}
                            </Link>
                        </h6>
                        <span className="woocommerce-Price-amount amount">
                            <span className="woocommerce-Price-currencySymbol">
                                {Number(product.price).toLocaleString("vi-VN")}
                                </span>đ</span>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default FeturedProduct;

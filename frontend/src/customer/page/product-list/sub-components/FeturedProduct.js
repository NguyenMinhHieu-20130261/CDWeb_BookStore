import React from "react";
import {Link} from "react-router-dom";
import FormatCurrency from "../../../../utils/FormatCurrency";

const FeturedItem = ({product}) => {
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
                            {/* <span className="woocommerce-Price-currencySymbol">
                                đ
                            </span> */}
                                {FormatCurrency(product?.currentPrice)}
                        </span>
                        <p className="old-price pb-1">
                            <span className="price" style={{fontSize: "11px"}}>
                                {FormatCurrency(product?.oldPrice)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
};
const FeturedProduct = ({products=[]})=>{
    const featuredProducts = products.slice(0, 3);
    return(
         <div id="widget-collapse-woocommerce_products-3"
                className="mt-4 widget-content collapse show"
                aria-labelledby="widgetHeading-woocommerce_products-3">
            <ul className="product_list_widget">
                {featuredProducts.map((product) => (
                    <FeturedItem
                        key={product.id}
                        product={product}
                    />
                ))}
            </ul>
        </div>
    )
}

export default FeturedProduct;

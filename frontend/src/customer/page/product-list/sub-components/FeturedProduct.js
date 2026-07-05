import React from "react";
import {Link} from "react-router-dom";
import FormatCurrency from "../../../../utils/FormatCurrency";

const FeturedItem = ({product}) => {
    if (!product) return null;
    const productImage = product.images?.length > 0
        ? product.images[0].image
        : "/assets/img/no-image.png";
    return (
        <li className="mb-5">
            <Link className="media"
                to={`/product-detail/${product.slug || product.id}`}
            >
                <div className="media d-md-flex">
                    <div 
                    className="d-block">
                         <img
                            width="150" height="200"
                            src={productImage}
                            className="img-fluid"
                            alt={product.title}
                            style={{ maxWidth: "60px" }}
                            loading="lazy"
                        />
                    </div>
                    <div className="media-body ml-3 pl-1">
                        <h6 className="font-size-2 text-lh-md font-weight-normal crop-text-2">
                           <div >
                                {product.title}
                            </div>
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
            </Link>
        </li>
    );
};
const FeturedProduct = ({products=[]})=>{
    const featuredProducts = products.slice(0, 3);
    return(
         <div id="widget-collapse-woocommerce_products-3"
                className=" widget-content collapse show"
                aria-labelledby="widgetHeading-woocommerce_products-3">
            <h4 className="font-size-3 mb-4">Sản phẩm mới</h4>
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

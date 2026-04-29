import React from "react";

const FeturedProduct = () => {
    return (
        <li className="mb-5">
            <div className="media">
                <div className="media d-md-flex">
                    <a href="https://bookworm.madrasthemes.com/product/blindside-michael-bennett-book-12/"
                        className="d-block">
                        <img width="150" height="200"
                                src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/10-150x200.jpg"
                                className="img-fluid" alt style={{maxWidth: "60px"}}
                                loading="lazy"/>
                    </a>
                    <div className="media-body ml-3 pl-1">
                        <h6 className="font-size-2 text-lh-md font-weight-normal crop-text-2">
                            <a href="https://bookworm.madrasthemes.com/product/blindside-michael-bennett-book-12/">
                                Blindside (Michael Bennett Book 12) </a></h6>
                        <span className="woocommerce-Price-amount amount"><span
                            className="woocommerce-Price-currencySymbol">&#036;</span>15.99</span>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default FeturedProduct;

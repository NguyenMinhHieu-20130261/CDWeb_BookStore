import React from "react";

const PriceFilter = () => {
    return (
        <div id="woocommerce_price_filter-2" className="widget border p-3d2 woocommerce widget_price_filter">
            <div className="widget-head" id="widgetHeading-woocommerce_price_filter-2">
                <a className="d-flex align-items-center justify-content-between text-dark"
                   href="#" data-toggle="collapse"
                   data-target="#widget-collapse-woocommerce_price_filter-2"
                   aria-expanded="true"
                   aria-controls="widget-collapse-woocommerce_price_filter-2">
                    <h3 className="widget-title font-weight-medium font-size-3 mb-0">Giá</h3>
                    <svg className="mins" width="15px" height="2px">
                        <path fill="rgb(22, 22, 25)"
                              d="M0.000,-0.000 L15.000,-0.000 L15.000,2.000 L0.000,2.000 L0.000,-0.000 Z">
                        </path>
                    </svg>
                    <svg className="plus" width="15px" height="15px">
                        <path fill="rgb(22, 22, 25)"
                              d="M15.000,8.000 L9.000,8.000 L9.000,15.000 L7.000,15.000 L7.000,8.000 L0.000,8.000 L0.000,6.000 L7.000,6.000 L7.000,-0.000 L9.000,-0.000 L9.000,6.000 L15.000,6.000 L15.000,8.000 Z">
                        </path>
                    </svg>
                </a>
            </div>
            <div id="widget-collapse-woocommerce_price_filter-2"
                 className="mt-4 widget-content collapse show"
                 aria-labelledby="widgetHeading-woocommerce_price_filter-2">
                <ul>
                    <li className="wc-layered-nav-price chosen">
                        <a href="https://bookworm.madrasthemes.com/product-category/thriller-suspense/?rating_filter=5">
                            0đ - 150,000đ
                        </a>
                    </li>
                    <li className="wc-layered-nav-price">
                        <a href="https://bookworm.madrasthemes.com/product-category/thriller-suspense/?rating_filter=5">
                            150,000đ - 300,000đ
                        </a>
                    </li>
                    <li className="wc-layered-nav-price">
                        <a href="https://bookworm.madrasthemes.com/product-category/thriller-suspense/?rating_filter=5">
                            300,000đ - 500,000đ
                        </a>
                    </li>
                    <li className="wc-layered-nav-price">
                        <a href="https://bookworm.madrasthemes.com/product-category/thriller-suspense/?rating_filter=5">
                            500,000đ - 700,000đ
                        </a>
                    </li>
                    <li className="wc-layered-nav-price">
                        <a href="https://bookworm.madrasthemes.com/product-category/thriller-suspense/?rating_filter=5">
                            700,000đ - trở lên
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default PriceFilter;

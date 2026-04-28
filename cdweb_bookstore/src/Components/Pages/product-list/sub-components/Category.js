import React from "react";

const Category = () => {
    return (
        <div id="woocommerce_product_categories-2"
             className="widget border p-4d875 woocommerce widget_product_categories">
            <div className="widget-head" id="widgetHeading-woocommerce_product_categories-2">
                <a className="d-flex align-items-center justify-content-between text-dark"
                   href="#" data-toggle="collapse"
                   data-target="#widget-collapse-woocommerce_product_categories-2"
                   aria-expanded="true"
                   aria-controls="widget-collapse-woocommerce_product_categories-2">
                    <h3 className="widget-title font-weight-medium font-size-3 mb-0">Danh mục</h3>
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
            <div id="widget-collapse-woocommerce_product_categories-2"
                 className="mt-4 widget-content collapse show"
                 aria-labelledby="widgetHeading-woocommerce_product_categories-2">
                <ul className="product-categories">
                    <li className="cat-item cat-item-141"><a
                        href="https://bookworm.madrasthemes.com/product-category/a/">Arts &amp;
                        Photography</a></li>
                    <li className="cat-item cat-item-151"><a
                        href="https://bookworm.madrasthemes.com/product-category/i/">Baby</a>
                    </li>
                    <li className="cat-item cat-item-18 cat-parent"><a
                        href="https://bookworm.madrasthemes.com/product-category/c/">Romance</a>
                        <ul className="children">
                            <li className="cat-item cat-item-157"><a
                                href="https://bookworm.madrasthemes.com/product-category/c/cookery-dishes-courses/">Cookery
                                Dishes &amp; Courses</a></li>
                            <li className="cat-item cat-item-158"><a
                                href="https://bookworm.madrasthemes.com/product-category/c/historical-romance/">Historical
                                Romance</a></li>
                            <li className="cat-item cat-item-159"><a
                                href="https://bookworm.madrasthemes.com/product-category/c/home-nursing-caring/">Home
                                Nursing &amp; Caring</a></li>
                            <li className="cat-item cat-item-160"><a
                                href="https://bookworm.madrasthemes.com/product-category/c/popular-medicine-health/">Popular
                                Medicine &amp; Health</a></li>
                            <li className="cat-item cat-item-161"><a
                                href="https://bookworm.madrasthemes.com/product-category/c/safety-in-the-home/">Safety
                                In The Home</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Category;
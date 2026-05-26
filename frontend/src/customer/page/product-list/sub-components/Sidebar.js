import React from "react";
import PriceFilter from "./PriceFilter";
import Category from "./Category";
import FeturedProduct from "./FeturedProduct";

const Sidebar = ({products= [], selectedPriceRange, handlePriceFilterChange}) => {
    return (
        <div id="secondary" className="sidebar widget-area order-1" role="complementary">
            <div id="widgetAccordion">
                {/* Categories Widget */}
                <Category/>
                {/* Popular Books Widget */}
                <PriceFilter
                selectedPriceRange={selectedPriceRange}
                handlePriceFilterChange={handlePriceFilterChange}
                />
                <div id="woocommerce_products-3"
                        className="widget border p-3d2 woocommerce widget_products">
                    {/* <div className="widget-head" id="widgetHeading-woocommerce_products-3">
                        <div className="d-flex align-items-center justify-content-between text-dark">
                            <h3 className="widget-title font-weight-medium font-size-3 mb-0">Sách Nổi Bật</h3>
                            <svg className="mins" width="15px" height="2px">
                                <path fill-rule="evenodd" fill="rgb(22, 22, 25)"
                                        d="M0.000,-0.000 L15.000,-0.000 L15.000,2.000 L0.000,2.000 L0.000,-0.000 Z">
                                </path>
                            </svg>
                            <svg className="plus" width="15px" height="15px">
                                <path fill-rule="evenodd" fill="rgb(22, 22, 25)"
                                        d="M15.000,8.000 L9.000,8.000 L9.000,15.000 L7.000,15.000 L7.000,8.000 L0.000,8.000 L0.000,6.000 L7.000,6.000 L7.000,-0.000 L9.000,-0.000 L9.000,6.000 L15.000,6.000 L15.000,8.000 Z">
                                </path>
                            </svg>
                        </div>
                    </div> */}
                    <FeturedProduct products={products}/>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

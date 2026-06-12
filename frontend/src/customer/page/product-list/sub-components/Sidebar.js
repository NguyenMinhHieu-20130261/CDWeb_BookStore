import React from "react";
import PriceFilter from "./PriceFilter";
import Category from "./Category";
import FeturedProduct from "./FeturedProduct";

const Sidebar = ({products= [], selectedPriceRange, handlePriceFilterChange,}) => {
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
                <div id="woocommerce_products-3" className="widget border p-3d2 woocommerce widget_products">
                    <FeturedProduct products={products}/>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

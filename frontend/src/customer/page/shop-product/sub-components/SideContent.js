import React from "react";
import FeaturedProduct from "./FeaturedProduct";
import Category from "./Category";
import FilterByPrice from "./FilterByPrice";

const SideContent = ({selectedPriceRange, handlePriceFilterChange}) => {
    return (
        <div id="secondary" className="sidebar widget-area order-1" role="complementary">
            <div id="widgetAccordion">
                <Category/>
                <FilterByPrice
                    selectedPriceRange={selectedPriceRange}
                    handlePriceFilterChange={handlePriceFilterChange}
                />
                <FeaturedProduct/>
            </div>
        </div>
    );
}
export default SideContent;
import React, {useState} from "react";
import {Link} from "react-router-dom";

const PriceFilterItem = ({priceRange, priceRangeText, isSelected, handlePriceFilterChange}) => {
    return (
        <li className={isSelected ? 'chosen' : ''}>
            <a href="#" onClick={(event) => handlePriceFilterChange(priceRange, event)}>
                {priceRangeText}
            </a>
        </li>
    );
}

const FilterByPrice = ({selectedPriceRange, handlePriceFilterChange}) => {
    const [isShown, setIsShown] = useState(true);

    const handleToggle = (e) => {
        e.preventDefault();
        setIsShown(!isShown)
    }
    return (
        <div id="woocommerce_price_filter-2" className="widget border p-4d875 woocommerce widget_price_filter">
            <div className="widget-head" id="widgetHeading-woocommerce_price_filter-2">
                <Link className="d-flex align-items-center justify-content-between text-dark"
                      to="" data-toggle="collapse"
                      data-target="#widget-collapse-woocommerce_price_filter-2"
                      aria-expanded="true"
                      aria-controls="widget-collapse-woocommerce_price_filter-2" onClick={(e) => handleToggle(e)}>
                    <h3 className="widget-title font-weight-medium font-size-3 mb-0">Giá</h3>
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
            {isShown && (<div id="widget-collapse-woocommerce_price_filter-2"
                              className="mt-4 widget-content collapse show"
                              aria-labelledby="widgetHeading-woocommerce_price_filter-2">
                <ul>
                    <PriceFilterItem
                        priceRange="0-150000"
                        priceRangeText="0đ - 150,000đ"
                        isSelected={selectedPriceRange === '0-150000'}
                        handlePriceFilterChange={handlePriceFilterChange}
                    />
                    <PriceFilterItem
                        priceRange="150000-300000"
                        priceRangeText="150,000đ - 300,000đ"
                        isSelected={selectedPriceRange === '150000-300000'}
                        handlePriceFilterChange={handlePriceFilterChange}
                    />
                    <PriceFilterItem
                        priceRange="300000-500000"
                        priceRangeText="300,000đ - 500,000đ"
                        isSelected={selectedPriceRange === '300000-500000'}
                        handlePriceFilterChange={handlePriceFilterChange}
                    />
                    <PriceFilterItem
                        priceRange="500000-700000"
                        priceRangeText="500,000đ - 700,000đ"
                        isSelected={selectedPriceRange === '500000-700000'}
                        handlePriceFilterChange={handlePriceFilterChange}
                    />
                    <PriceFilterItem
                        priceRange="700000-"
                        priceRangeText="700,000đ - trở lên"
                        isSelected={selectedPriceRange === '700000-'}
                        handlePriceFilterChange={handlePriceFilterChange}
                    />
                </ul>
            </div>)}
        </div>
    );
}
export default FilterByPrice;
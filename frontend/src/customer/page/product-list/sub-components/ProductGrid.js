import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({products, handleAddToCart}) => {
     if (!products || products.length === 0) {
        return <p>Không có sản phẩm nào.</p>;
    }
    return (
        <div className="grid-view">
            <ul className="products list-unstyled row no-gutters row-cols-2 row-cols-lg-4 row-cols-wd-4 border-top border-left mb-6">
                {products.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product}
                        handleAddToCart={handleAddToCart}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ProductGrid;

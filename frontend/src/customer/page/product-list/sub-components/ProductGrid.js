import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
    const products = [
        {
            id: 108,
            title: "Buttermilk Graffiti: A Chef's Journey to Discover America's New Melting-Pot Cuisine",
            author: "Edward Lee",
            price: "10.29",
            image: "https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/50-150x200.jpg",
            format: "Paperback"
        },{
            id: 108,
            title: "Buttermilk Graffiti: A Chef's Journey to Discover America's New Melting-Pot Cuisine",
            author: "Edward Lee",
            price: "10.29",
            image: "https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/50-150x200.jpg",
            format: "Paperback"
        },
        {
            id: 108,
            title: "Buttermilk Graffiti: A Chef's Journey to Discover America's New Melting-Pot Cuisine",
            author: "Edward Lee",
            price: "10.29",
            image: "https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/50-150x200.jpg",
            format: "Paperback"
        },
        {
            id: 108,
            title: "Buttermilk Graffiti: A Chef's Journey to Discover America's New Melting-Pot Cuisine",
            author: "Edward Lee",
            price: "10.29",
            image: "https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/50-150x200.jpg",
            format: "Paperback"
        },
          {
            id: 108,
            title: "Buttermilk Graffiti: A Chef's Journey to Discover America's New Melting-Pot Cuisine",
            author: "Edward Lee",
            price: "10.29",
            image: "https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/50-150x200.jpg",
            format: "Paperback"
        },{
            id: 108,
            title: "Buttermilk Graffiti: A Chef's Journey to Discover America's New Melting-Pot Cuisine",
            author: "Edward Lee",
            price: "10.29",
            image: "https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/50-150x200.jpg",
            format: "Paperback"
        },
        {
            id: 108,
            title: "Buttermilk Graffiti: A Chef's Journey to Discover America's New Melting-Pot Cuisine",
            author: "Edward Lee",
            price: "10.29",
            image: "https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/50-150x200.jpg",
            format: "Paperback"
        },
        {
            id: 108,
            title: "Buttermilk Graffiti: A Chef's Journey to Discover America's New Melting-Pot Cuisine",
            author: "Edward Lee",
            price: "10.29",
            image: "https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/50-150x200.jpg",
            format: "Paperback"
        },

    ];

    return (
        <div className="grid-view">
            <ul className="products list-unstyled row no-gutters row-cols-2 row-cols-lg-4 row-cols-wd-4 border-top border-left mb-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ul>
        </div>
    );
};

export default ProductGrid;

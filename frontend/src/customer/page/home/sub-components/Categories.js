import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../service/ApiService";

export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await api.fetchData("/category/all");
                const parents = data.filter(c => c.parentId === null);
                const structured = parents.map(parent => ({
                    ...parent,
                    subcategories: data.filter(c => c.parentId === parent.id)
                }));
                setCategories(structured);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="wp-block-bwgb-product-categories__inner container">
            <header className="bwgb-products-category__block-header d-md-flex justify-content-between align-items-center mb-5">
                <h2 className="bwgb-product-category__block-title font-size-7 mb-3 mb-md-0">
                    Danh mục nổi bật
                </h2>
                <Link to="/product-list" className="h-primary d-block bwgb-products-category__block-action-text bwgb-product-category__block-title">
                    <span>Tất cả danh mục</span>
                    <i className="fa-solid fa-caret-right ml-1"></i>
                </Link>
            </header>
            <div className="wp-block-bwgb-product-categories__content">
                <div>
                    <div className="row no-gutters row-cols-1 row-cols-md-1 row-cols-lg-3 row-cols-xl-3 row-cols-wd-3 border-top border-left">
                        {loading ? (
                            <div className="p-5 text-center w-100">Đang tải danh mục...</div>
                        ) : categories.length === 0 ? (
                            <div className="p-5 text-center w-100">Không tìm thấy danh mục nào</div>
                        ) : (
                            categories.map(mainCate => (
                                <div key={mainCate.id} className="col">
                                    <div className="position-relative h-100">
                                        <div className="border-bottom border-right p-4 p-lg-7 h-100">
                                            <h6 className="font-size-3 mb-3 pb-1 bwgb-products-category__category-title">
                                                <Link to={`/product-list/${mainCate.id}`} className="text-dark font-weight-medium">
                                                    {mainCate.name}
                                                </Link>
                                            </h6>
                                            <ul className="list-unstyled m-0 p-0 bwgb-products-category__category-list">
                                                {mainCate.subcategories.slice(0, 5).map(sub => (
                                                    <li key={sub.id} className="cat-item mb-2">
                                                        <Link to={`/product-list/${sub.id}`} className="text-gray-600 hover-primary">
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
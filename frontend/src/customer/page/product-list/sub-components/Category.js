import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../service/ApiService";
import "../../../assets/css/style-category.css";

const Category = () => {
    const [isShown, setIsShown] = useState(true);
    const [parentCategories, setParentCategories] = React.useState([]);
    const [openParents, setOpenParents] = useState({});
    const [categories, setCategories] = React.useState([]);
    React.useEffect(() => {
        const loadData = async () => {
            try {
                const data = await api.fetchData("/category/all");

                const categoryList = Array.isArray(data)
                ? data
                : data.data || data.content || [];
                setCategories(categoryList);

                const parents = categoryList.filter(c => c.parentId === null);
                setParentCategories(parents);
                
                console.log("cates", data);
            } catch (error) {
                console.error("Lỗi load cate:", error);
            }
        };

        loadData();
    }, []);
    const handleToggle = (e) => {
        e.preventDefault();
        setIsShown(!isShown);
    };
    const handleToggleChildren = (parentId, e) => {
        e.preventDefault();
        setOpenParents(prev => ({
            ...prev,
            [parentId]: !prev[parentId]
        }));
    };
    return (
        <div id="woocommerce_product_categories-2"
             className="widget border p-3d2 woocommerce widget_product_categories">
            <div className="widget-head" id="widgetHeading-woocommerce_product_categories-2">
                <Link className="d-flex align-items-center justify-content-between text-dark"
                    to="" data-toggle="collapse"
                    onClick={handleToggle}
                    >
                    <h3 className="widget-title font-weight-medium font-size-3 mb-0">Danh mục</h3>
                    <svg 
                        className={`mins ${isShown ? "d-block" : "d-none"}`}
                        width="15px" height="2px">
                        <path fill="rgb(22, 22, 25)" d="M0.000,-0.000 L15.000,-0.000 L15.000,2.000 L0.000,2.000 L0.000,-0.000 Z"/>
                    </svg>
                    <svg 
                        className={`plus ${isShown ? "d-none" : "d-block"}`}
                        width="15px" height="15px">
                        <path fill="rgb(22, 22, 25)" d="M15.000,8.000 L9.000,8.000 L9.000,15.000 L7.000,15.000 L7.000,8.000 L0.000,8.000 L0.000,6.000 L7.000,6.000 L7.000,-0.000 L9.000,-0.000 L9.000,6.000 L15.000,6.000 L15.000,8.000 Z"/>
                    </svg>
                </Link>
            </div>
            {isShown && (
                <div
                    id="widget-collapse-woocommerce_product_categories-2"
                    className="mt-4 widget-content collapse show"
                    aria-labelledby="widgetHeading-woocommerce_product_categories-2">
                    <ul className="product-categories">
                        {parentCategories.map(parent => {
                            const children = categories.filter(
                                child => child.parentId === parent.id
                            );
                            const hasChildren = children.length > 0;
                            const isOpen = openParents[parent.id];
                            return (
                                <li key={parent.id}
                                    className={`cat-item parent-cat ${hasChildren ? "cat-parent" : ""}`} >
                                    <div className="category-parent-row">
                                        <Link to={`/product-list/${parent.id}`} className="category-parent-link">
                                            {parent.name}
                                        </Link>
                                        {hasChildren && (
                                            <button type="button" className="category-toggle-icon"
                                                onClick={(e) => handleToggleChildren(parent.id, e)}>
                                                <svg className={`mins ${isOpen ? "d-block" : "d-none"}`}
                                                    width="15px"
                                                    height="2px">
                                                    <path fill="rgb(22, 22, 25)" d="M0.000,-0.000 L15.000,-0.000 L15.000,2.000 L0.000,2.000 L0.000,-0.000 Z"/>
                                                </svg>
                                                <svg
                                                    className={`plus ${isOpen ? "d-none" : "d-block"}`}
                                                    width="15px"
                                                    height="15px">
                                                    <path fill="rgb(22, 22, 25)" d="M15.000,8.000 L9.000,8.000 L9.000,15.000 L7.000,15.000 L7.000,8.000 L0.000,8.000 L0.000,6.000 L7.000,6.000 L7.000,-0.000 L9.000,-0.000 L9.000,6.000 L15.000,6.000 L15.000,8.000 Z"/>
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                     {hasChildren && isOpen && (
                                        <ul className="category-children">
                                            {children.map(child => (
                                                <li key={child.id} className="cat-item child-cat">
                                                    <Link
                                                        to={`/product-list/${child.id}`}
                                                        className="category-child-link" >
                                                        {child.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
export default Category;
import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import APIService from "../../../../service/APIService";

const apiService = new APIService();
const Category = () => {
    const [isShown, setIsShown] = useState(true);

    const handleToggle = (e) => {
        e.preventDefault();
        setIsShown(!isShown);
    }

    return (
        <div id="woocommerce_product_categories-2"
             className="widget border p-4d875 woocommerce widget_product_categories">
            <div className="widget-head" id="widgetHeading-woocommerce_product_categories-2">
                <Link className="d-flex align-items-center justify-content-between text-dark"
                      to="#" data-toggle="collapse"
                      data-target="#widget-collapse-woocommerce_product_categories-2"
                      aria-expanded="true"
                      aria-controls="widget-collapse-woocommerce_product_categories-2" onClick={(e) => handleToggle(e)}>
                    <h3 className="widget-title font-weight-medium font-size-3 mb-0">Danh mục</h3>
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
            {isShown && (<div id="widget-collapse-woocommerce_product_categories-2"
                              className="mt-4 widget-content collapse show"
                              aria-labelledby="widgetHeading-woocommerce_product_categories-2">
                <CategoriesList/>
            </div>)}
        </div>
    );
}
const CategoryItem = ({category, subMainCategories, subCategories}) => {
    const toPath = `/product-list/${category.id}`;

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedMainCategory, setSelectedMainCategory] = useState(null);
    const [tempSelectedMain, setTempSelectedMain] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [expandedSubCategories, setExpandedSubCategories] = useState(false);

    const handleCategoryClick = (categoryId, event) => {
        if (selectedCategory === categoryId) {
            event.preventDefault();
        } else {
            setSelectedCategory(categoryId);
            setSelectedSubCategory(null);
            setSelectedMainCategory(null);
            setTempSelectedMain(null);
        }
    };
    const handleMainCategoryClick = (mainCateId, event) => {
        if (selectedMainCategory === mainCateId) {
            event.preventDefault();
        } else {
            setSelectedMainCategory(mainCateId);
            setTempSelectedMain(mainCateId);
            setSelectedCategory(null);
            setSelectedSubCategory(null);
            setExpandedSubCategories(true);
        }
    };

    const handleSubCategoryClick = (subCateId, event) => {
        if (selectedSubCategory === subCateId) {
            event.preventDefault();
        } else {
            setSelectedSubCategory(subCateId);
            setSelectedCategory(null);
            setSelectedMainCategory(null);
            setExpandedSubCategories(true);
        }
    };

    return (
        <>
            <li className={`cat-item cat-item-${category.id}`}>
                <Link to={toPath}
                    // className={`${selectedCategory === category.id || location.pathname === toPath ? 'active' : ''}`}
                      className={`${selectedCategory === category.id ? 'active' : ''}`}
                      style={{cursor: selectedCategory === category.id ? 'auto' : 'pointer'}}
                      onClick={(event) => handleCategoryClick(category.id, event)}>
                    {category.name}
                </Link>
                <ul className={`children ml-3 d-block`}>
                    {subMainCategories.map(mainCate => {
                        const toPathMain = `/product-list/${category.id}/${mainCate.id}`;
                        return (<li key={mainCate.id}
                                    className={`cat-item cat-item-${mainCate.id}`}
                                    style={{display: tempSelectedMain === null || tempSelectedMain === mainCate.id ? 'block' : 'none',}}>
                            <Link to={toPathMain}
                                  style={{cursor: selectedMainCategory === mainCate.id ? 'auto' : 'pointer'}}
                                  className={`${selectedMainCategory === mainCate.id && selectedSubCategory === null ? 'active' : ''}`}
                                  onClick={(event) => handleMainCategoryClick(mainCate.id, event)}>
                                {mainCate.name}
                            </Link>
                            {expandedSubCategories && tempSelectedMain === mainCate.id && (
                                <ul key={mainCate.id} className={`children ml-3 d-block`}>
                                    {subCategories.map(child => {
                                        const toPathChild = `/product-list/${category.id}/${mainCate.id}/${child.id}`;
                                        return (<li key={child.id} className={`cat-item cat-item-${child.id}`}>
                                            <Link to={toPathChild}
                                                  style={{cursor: selectedSubCategory === child.id ? 'auto' : 'pointer'}}
                                                  className={`${selectedSubCategory === child.id ? 'active' : ''}`}
                                                  onClick={(event) => handleSubCategoryClick(child.id, event)}>
                                                {child.name}
                                            </Link>
                                        </li>)
                                    })}
                                </ul>)}
                        </li>)
                    })}
                </ul>
            </li>
        </>
    );

};

const CategoriesList = () => {
    const [parentCategory, setParentCategory] = useState({});
    const [subMainCategories, setSubMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const {categoryId, mainCategoryId, subCategoryId} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const parentResult = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/categories/${categoryId}`);
                setParentCategory(parentResult);
                if (parentResult) {
                    const subMainResult = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/categories/${parentResult.id}/subcategories`);
                    setSubMainCategories(subMainResult);
                }
                if (mainCategoryId) {
                    const subResult = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/categories/${mainCategoryId}/subcategories`);
                    setSubCategories(subResult);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [mainCategoryId, subCategoryId]);

    return (
        <ul className="product-categories">
            <CategoryItem category={parentCategory} subMainCategories={subMainCategories}
                          subCategories={subCategories}/>
        </ul>
    );
};
export default Category;
import { useEffect, useState } from "react";
import APIService from "../../../service/APIService";
import { Link } from "react-router-dom";

export const Categories = () => {
    const apiService = new APIService();
    const [firstCategories, setFirstCategories] = useState([]);
    const [first, setFirst] = useState(null);
    const [secondCategories, setSecondCategories] = useState([]);
    const [second, setSecond] = useState(null);
    const [thirdCategories, setThirdCategories] = useState([]);
    const [third, setThird] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultCate1 = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/categories/2/subcategories`);
                setFirstCategories(resultCate1.slice(0, 6));
                setFirst(resultCate1?.[0] || null);
                const resultCate2 = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/categories/14/subcategories`);
                setSecondCategories(resultCate2.slice(0, 6));
                setSecond(resultCate2[0])
                const resultCate3 = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/categories/21/subcategories`);
                setThirdCategories(resultCate3.slice(0, 6))
                setThird(resultCate3[0])
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="wp-block-bwgb-product-categories__inner container">
            <header>
                <h2>Danh mục nổi bật</h2>

                {first?.parentCategory?.parentCategory && (
                    <Link to={`/product-list/${first.parentCategory.parentCategory.id}`}>
                        Tất cả danh mục
                    </Link>
                )}
            </header>
            <div className="wp-block-bwgb-product-categories__content">
                <div>
                    <div
                        className="row no-gutters row-cols-1 row-cols-md-1 row-cols-lg-3 row-cols-xl-3 row-cols-wd-3 border-top border-left">
                        <div className="col">
                            <div className="position-relative h-100">
                                <div className="border-bottom border-right p-4 p-lg-7 h-100">
                                    {first?.parentCategory && (
                                        <h6>{first.parentCategory.name}</h6>
                                    )}
                                    <ul className="list-unstyled m-0 p-0 bwgb-products-category__category-list">
                                        {firstCategories.map(category => (
                                            <li key={category.id} className="cat-item cat-item-157"><Link
                                                to={`/product-list/${category?.parentCategory?.parentCategory?.id}/${category?.parentCategory?.id}/${category.id}`}>{category.name}</Link>
                                            </li>))}
                                    </ul>
                                    <div
                                        className="d-flex d-md-block justify-content-end position-md-absolute bottom-0 right-md-30 product-category__icon">
                                        <i className="fa-solid fa-book text-tangerine__1 font-size-17"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="position-relative h-100">
                                <div className="border-bottom border-right p-4 p-lg-7 h-100">
                                    {second && (
                                        <h6 className="font-size-3 mb-3 pb-1 bwgb-products-category__category-title">
                                            {second.parentCategory?.name}
                                        </h6>)}
                                    <ul className="list-unstyled m-0 p-0 bwgb-products-category__category-list">
                                        {secondCategories.map(category => (
                                            <li key={category.id} className="cat-item cat-item-157"><Link
                                                to={`/product-list/${category?.parentCategory?.parentCategory?.id}/${category?.parentCategory?.id}/${category.id}`}>{category.name}</Link>
                                            </li>))}
                                    </ul>
                                    <div
                                        className="d-flex d-md-block justify-content-end position-md-absolute bottom-0 right-md-30 product-category__icon">
                                        <i className="fa-solid fa-pencil bwgb-products-category__icon-2 text-chili__1 font-size-17"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="position-relative h-100">
                                <div className="border-bottom border-right p-4 p-lg-7 h-100">
                                    {third && (
                                        <h6 className="font-size-3 mb-3 pb-1 bwgb-products-category__category-title">
                                            {third.parentCategory?.name} </h6>)}
                                    <ul className="list-unstyled m-0 p-0 bwgb-products-category__category-list">
                                        {thirdCategories.map(category => (
                                            <li key={category.id} className="cat-item cat-item-157"><Link
                                                to={`/product-list/${category?.parentCategory?.parentCategory?.id}/${category?.parentCategory?.id}/${category.id}`}>{category.name}</Link>
                                            </li>))}
                                    </ul>
                                    <div
                                        className="d-flex d-md-block justify-content-end position-md-absolute bottom-0 right-md-30 product-category__icon">
                                        <i className="fa-solid fa-book-atlas bwgb-products-category__icon-3 text-carolina__1 font-size-17"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

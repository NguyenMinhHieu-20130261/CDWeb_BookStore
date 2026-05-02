import React, {useEffect, useState} from "react";
import BlogItem from "./BlogItem";
import Pagination from "../../../components/general/Pagination";
import APIService from "../../../../service/APIService";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const apiService = new APIService();
const BlogTab = () => {
    const location = useLocation();
    const params = useParams();
    const lastParam = params['*'].split('/').pop();
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(() => {
        const queryParams = new URLSearchParams(location.search);
        return parseInt(queryParams.get('page') || '1', 10) - 1;
    });
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState('');
    const [perPage, setPerPage] = useState(6);
    const [filter, setFilter] = useState({});
    const [order, setOrder] = useState('');

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            updateURL({page: newPage + 1});
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };
    const updateURL = (params) => {
        const searchParams = new URLSearchParams(location.search);

        Object.keys(params).forEach(key => {
            if (params[key]) {
                if (key === 'filter') {
                    searchParams.set(key, encodeURIComponent(JSON.stringify(params[key])));
                } else {
                    searchParams.set(key, params[key]);
                }
            } else {
                searchParams.delete(key);
            }
        });

        navigate(`?${searchParams.toString()}`);
    };
    const getBlogsByCategory = (categoryId, page = 0, perPage = 6, sort = 'id', filter = '{}', order = 'ASC') => {
        const endpoint = `${process.env.REACT_APP_ENDPOINT_API}/blog/cate/${categoryId}`;

        const params = {page, perPage, sort, filter, order};
        return apiService.fetchData(endpoint, params);
    };
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageParam = parseInt(queryParams.get('page') || '1', 10) - 1;
        const perPageParam = parseInt(queryParams.get('perPage') || '6', 10);
        const sortParam = queryParams.get('sort') || 'id';
        const filterParam = queryParams.get('filter') || '{}';
        const orderParam = queryParams.get('order') || 'ASC';
        setPage(pageParam);
        setPerPage(perPageParam);
        setSort(sortParam);
        setFilter(filterParam);
        setOrder(orderParam);

    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getBlogsByCategory(lastParam, page, perPage, sort, filter, order);
                setBlogs(result.content || []);
                setTotalPages(result.totalPages);
            } catch (error) {
                console.error('Error fetching blogs', error);
            }
        };
        fetchData();
    }, [lastParam, page, perPage, sort, filter, order]);
    return (
        <>
            <div className="tab-pane fade active show" id="all_cats" role="tabpanel"
                 aria-labelledby="tab-all_cats">
                {blogs.length > 0 ?
                    (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {blogs.map(blog => (
                        <BlogItem
                            id={blog.id}
                            title={blog.title}
                            image={blog.image}
                            content={blog.content}
                            created_at={blog.createdAt}
                        />
                    ))}
                </div>)
                    :
                    <div style={{textAlign: 'center'}}>Không có tin tức phù hợp nào.</div>}
                {totalPages > 1 && (<Pagination currentPage={page} totalPages={totalPages}
                                                onPageChange={handlePageChange}/>)}

            </div>
        </>
    );
}
export default BlogTab;
import React from "react";

const Pagination = () => {
    return (
        <nav className="woocommerce-pagination" aria-label="Shop Page navigation">
            <ul className="pagination pagination__custom justify-content-md-center flex-nowrap flex-md-wrap overflow-auto overflow-md-visble">
                <li className="flex-shrink-0 flex-md-shrink-1 page-item">
                    <a className="prev page-link" href="https://bookworm.madrasthemes.com/shop/style-v3/page/1/">
                        Previous
                    </a>
                </li>
                <li className="flex-shrink-0 flex-md-shrink-1 page-item">
                    <a className="page-link" href="https://bookworm.madrasthemes.com/shop/style-v3/page/1/">1</a>
                </li>
                <li className="flex-shrink-0 flex-md-shrink-1 page-item active">
                    <span aria-current="page" className="page-link current">2</span>
                </li>
                <li className="flex-shrink-0 flex-md-shrink-1 page-item">
                    <a className="page-link" href="https://bookworm.madrasthemes.com/shop/style-v3/page/3/">3</a>
                </li>
                <li className="flex-shrink-0 flex-md-shrink-1 page-item">
                    <a className="page-link" href="https://bookworm.madrasthemes.com/shop/style-v3/page/4/">4</a>
                </li>
                <li className="flex-shrink-0 flex-md-shrink-1 page-item">
                    <a className="page-link" href="https://bookworm.madrasthemes.com/shop/style-v3/page/5/">5</a>
                </li>
                <li className="flex-shrink-0 flex-md-shrink-1 page-item">
                    <a className="page-link" href="https://bookworm.madrasthemes.com/shop/style-v3/page/6/">6</a>
                </li>
                <li className="flex-shrink-0 flex-md-shrink-1 page-item">
                    <a className="page-link" href="https://bookworm.madrasthemes.com/shop/style-v3/page/7/">7</a>
                </li>
                <li className="flex-shrink-0 flex-md-shrink-1 page-item">
                    <a className="page-link" href="https://bookworm.madrasthemes.com/shop/style-v3/page/8/">8</a>
                </li>
                <li className="flex-shrink-0 flex-md-shrink-1 page-item">
                    <a className="next page-link" href="https://bookworm.madrasthemes.com/shop/style-v3/page/3/">
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;

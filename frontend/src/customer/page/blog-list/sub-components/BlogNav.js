import React from 'react';

const BlogNav = () => {
    return (
        <ul className="nav justify-content-md-center nav-gray-700 mb-5 flex-nowrap flex-md-wrap overflow-auto overflow-md-visible"
            id="featuredBooks" role="tablist">
            <li className="nav-item mx-5 mb-1 flex-shrink-0 flex-md-shrink-1">
                <a id="tab-all_cats" className="nav-link px-0 active" data-toggle="tab" href="#all_cats"
                    role="tab" aria-controls="all_cats" aria-selected="true">All</a>
            </li>
            <li className="nav-item mx-5 mb-1 flex-shrink-0 flex-md-shrink-1">
                <a id="tab-childrens-books" className="nav-link px-0" data-toggle="tab" href="#childrens-books"
                    role="tab" aria-controls="childrens-books" aria-selected="false">
                    Children&#039;s Books </a>
            </li>
            <li className="nav-item mx-5 mb-1 flex-shrink-0 flex-md-shrink-1">
                <a id="tab-science-math" className="nav-link px-0" data-toggle="tab" href="#science-math"
                    role="tab"
                    aria-controls="science-math" aria-selected="false">
                    Science &amp; Math </a>
            </li>
            <li className="nav-item mx-5 mb-1 flex-shrink-0 flex-md-shrink-1">
                <a id="tab-arts-photography" className="nav-link px-0" data-toggle="tab"
                    href="#arts-photography"
                    role="tab" aria-controls="arts-photography" aria-selected="false">
                    Arts &amp; Photography </a>
            </li>
            <li className="nav-item mx-5 mb-1 flex-shrink-0 flex-md-shrink-1">
                <a id="tab-biographies-memoirs" className="nav-link px-0" data-toggle="tab"
                    href="#biographies-memoirs"
                    role="tab" aria-controls="biographies-memoirs" aria-selected="false">
                    Biographies &amp; Memoirs </a>
            </li>
            <li className="nav-item mx-5 mb-1 flex-shrink-0 flex-md-shrink-1">
                <a id="tab-romance" className="nav-link px-0" data-toggle="tab" href="#romance" role="tab"
                    aria-controls="romance" aria-selected="false">
                    Romance </a>
            </li>
        </ul>
    );
}
export default BlogNav;
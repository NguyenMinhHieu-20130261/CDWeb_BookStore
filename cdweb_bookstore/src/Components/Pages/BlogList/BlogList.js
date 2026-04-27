import React from "react";

const BlogList = () => {
    return (
        <body className="blog theme-bookworm woocommerce-no-js woocommerce-active">
        <div className="page-header border-bottom">
            <div className="container">
                <div className="d-md-flex justify-content-between align-items-center py-4">
                    <nav className="woocommerce-breadcrumb font-size-2">
                        <a className="h-primary" href="https://bookworm.madrasthemes.com">Home</a>
                        <span className="breadcrumb-separator mx-2">
                                <i className="fas fa-angle-right"></i>
                            </span>
                    </nav>
                </div>
            </div>
        </div>
        <div className="container mb-5 mb-lg-8 pb-xl-1 mt-5 pt-xl-1 mt-lg-7">
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
            <div className="tab-content">
                <div className="tab-pane fade active show" id="all_cats" role="tabpanel"
                     aria-labelledby="tab-all_cats">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        <article
                            className="col blog-grid post-1358 post type-post status-publish format-standard has-post-thumbnail hentry category-childrens-books category-science-math tag-arts tag-books tag-kids tag-romance">
                            <div className="mb-6">
                                <a className="d-block mb-3"
                                   href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/">
                                    <img width="445" height="300"
                                         src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg"
                                         className="img-fluid w-100 rounded wp-post-image"
                                         alt="&#8216;American Dirt&#8217; Invites Readers into the Journey of Mexican Migrants"
                                         decoding="async"
                                         fetchpriority="high"
                                         srcset="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg 445w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-506x341.jpg 506w"
                                         sizes="(max-width: 445px) 100vw, 445px"
                                    /> </a>
                                <div className="mb-1 text-primary">
                                    <a href="https://bookworm.madrasthemes.com/category/childrens-books/"
                                       className="small">Children&#039;s Books</a>, <a
                                    href="https://bookworm.madrasthemes.com/category/science-math/"
                                    className="small">Science &amp; Math</a>
                                </div>
                                <h2 className="entry-title h5 crop-text-2 font-weight-medium text-lh-md mb-3"><a
                                    href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                    rel="bookmark">&#8216;American Dirt&#8217; Invites Readers into the Journey of
                                    Mexican Migrants</a></h2>
                                <p className="text-muted mb-4">It’s nice to win awards. Last night, the Ueno team in
                                    Reykjavík came home from the Icelandic Web Awards.</p>
                                <div className="text-secondary-gray-700 post-meta">
                                    <a href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                       className="text-secondary-gray-700 post-date">August 19, 2020</a>
                                </div>
                            </div>
                        </article>
                        <article
                            className="col blog-grid post-1358 post type-post status-publish format-standard has-post-thumbnail hentry category-childrens-books category-science-math tag-arts tag-books tag-kids tag-romance">
                            <div className="mb-6">
                                <a className="d-block mb-3"
                                   href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/">
                                    <img width="445" height="300"
                                         src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg"
                                         className="img-fluid w-100 rounded wp-post-image"
                                         alt="&#8216;American Dirt&#8217; Invites Readers into the Journey of Mexican Migrants"
                                         decoding="async"
                                         fetchPriority="high"
                                         srcSet="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg 445w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-506x341.jpg 506w"
                                         sizes="(max-width: 445px) 100vw, 445px"
                                    /> </a>
                                <div className="mb-1 text-primary">
                                    <a href="https://bookworm.madrasthemes.com/category/childrens-books/"
                                       className="small">Children&#039;s Books</a>, <a
                                    href="https://bookworm.madrasthemes.com/category/science-math/"
                                    className="small">Science &amp; Math</a>
                                </div>
                                <h2 className="entry-title h5 crop-text-2 font-weight-medium text-lh-md mb-3"><a
                                    href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                    rel="bookmark">&#8216;American Dirt&#8217; Invites Readers into the Journey of
                                    Mexican Migrants</a></h2>
                                <p className="text-muted mb-4">It’s nice to win awards. Last night, the Ueno team in
                                    Reykjavík came home from the Icelandic Web Awards.</p>
                                <div className="text-secondary-gray-700 post-meta">
                                    <a href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                       className="text-secondary-gray-700 post-date">August 19, 2020</a>
                                </div>
                            </div>
                        </article>
                        <article
                            className="col blog-grid post-1358 post type-post status-publish format-standard has-post-thumbnail hentry category-childrens-books category-science-math tag-arts tag-books tag-kids tag-romance">
                            <div className="mb-6">
                                <a className="d-block mb-3"
                                   href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/">
                                    <img width="445" height="300"
                                         src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg"
                                         className="img-fluid w-100 rounded wp-post-image"
                                         alt="&#8216;American Dirt&#8217; Invites Readers into the Journey of Mexican Migrants"
                                         decoding="async"
                                         fetchPriority="high"
                                         srcSet="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg 445w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-506x341.jpg 506w"
                                         sizes="(max-width: 445px) 100vw, 445px"
                                    /> </a>
                                <div className="mb-1 text-primary">
                                    <a href="https://bookworm.madrasthemes.com/category/childrens-books/"
                                       className="small">Children&#039;s Books</a>, <a
                                    href="https://bookworm.madrasthemes.com/category/science-math/"
                                    className="small">Science &amp; Math</a>
                                </div>
                                <h2 className="entry-title h5 crop-text-2 font-weight-medium text-lh-md mb-3"><a
                                    href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                    rel="bookmark">&#8216;American Dirt&#8217; Invites Readers into the Journey of
                                    Mexican Migrants</a></h2>
                                <p className="text-muted mb-4">It’s nice to win awards. Last night, the Ueno team in
                                    Reykjavík came home from the Icelandic Web Awards.</p>
                                <div className="text-secondary-gray-700 post-meta">
                                    <a href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                       className="text-secondary-gray-700 post-date">August 19, 2020</a>
                                </div>
                            </div>
                        </article>
                        <article
                            className="col blog-grid post-1358 post type-post status-publish format-standard has-post-thumbnail hentry category-childrens-books category-science-math tag-arts tag-books tag-kids tag-romance">
                            <div className="mb-6">
                                <a className="d-block mb-3"
                                   href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/">
                                    <img width="445" height="300"
                                         src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg"
                                         className="img-fluid w-100 rounded wp-post-image"
                                         alt="&#8216;American Dirt&#8217; Invites Readers into the Journey of Mexican Migrants"
                                         decoding="async"
                                         fetchPriority="high"
                                         srcSet="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg 445w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-506x341.jpg 506w"
                                         sizes="(max-width: 445px) 100vw, 445px"
                                    /> </a>
                                <div className="mb-1 text-primary">
                                    <a href="https://bookworm.madrasthemes.com/category/childrens-books/"
                                       className="small">Children&#039;s Books</a>, <a
                                    href="https://bookworm.madrasthemes.com/category/science-math/"
                                    className="small">Science &amp; Math</a>
                                </div>
                                <h2 className="entry-title h5 crop-text-2 font-weight-medium text-lh-md mb-3"><a
                                    href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                    rel="bookmark">&#8216;American Dirt&#8217; Invites Readers into the Journey of
                                    Mexican Migrants</a></h2>
                                <p className="text-muted mb-4">It’s nice to win awards. Last night, the Ueno team in
                                    Reykjavík came home from the Icelandic Web Awards.</p>
                                <div className="text-secondary-gray-700 post-meta">
                                    <a href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                       className="text-secondary-gray-700 post-date">August 19, 2020</a>
                                </div>
                            </div>
                        </article>
                        <article
                            className="col blog-grid post-1358 post type-post status-publish format-standard has-post-thumbnail hentry category-childrens-books category-science-math tag-arts tag-books tag-kids tag-romance">
                            <div className="mb-6">
                                <a className="d-block mb-3"
                                   href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/">
                                    <img width="445" height="300"
                                         src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg"
                                         className="img-fluid w-100 rounded wp-post-image"
                                         alt="&#8216;American Dirt&#8217; Invites Readers into the Journey of Mexican Migrants"
                                         decoding="async"
                                         fetchPriority="high"
                                         srcSet="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg 445w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-506x341.jpg 506w"
                                         sizes="(max-width: 445px) 100vw, 445px"
                                    /> </a>
                                <div className="mb-1 text-primary">
                                    <a href="https://bookworm.madrasthemes.com/category/childrens-books/"
                                       className="small">Children&#039;s Books</a>, <a
                                    href="https://bookworm.madrasthemes.com/category/science-math/"
                                    className="small">Science &amp; Math</a>
                                </div>
                                <h2 className="entry-title h5 crop-text-2 font-weight-medium text-lh-md mb-3"><a
                                    href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                    rel="bookmark">&#8216;American Dirt&#8217; Invites Readers into the Journey of
                                    Mexican Migrants</a></h2>
                                <p className="text-muted mb-4">It’s nice to win awards. Last night, the Ueno team in
                                    Reykjavík came home from the Icelandic Web Awards.</p>
                                <div className="text-secondary-gray-700 post-meta">
                                    <a href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                       className="text-secondary-gray-700 post-date">August 19, 2020</a>
                                </div>
                            </div>
                        </article>
                        <article
                            className="col blog-grid post-1358 post type-post status-publish format-standard has-post-thumbnail hentry category-childrens-books category-science-math tag-arts tag-books tag-kids tag-romance">
                            <div className="mb-6">
                                <a className="d-block mb-3"
                                   href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/">
                                    <img width="445" height="300"
                                         src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg"
                                         className="img-fluid w-100 rounded wp-post-image"
                                         alt="&#8216;American Dirt&#8217; Invites Readers into the Journey of Mexican Migrants"
                                         decoding="async"
                                         fetchPriority="high"
                                         srcSet="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg 445w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-506x341.jpg 506w"
                                         sizes="(max-width: 445px) 100vw, 445px"
                                    /> </a>
                                <div className="mb-1 text-primary">
                                    <a href="https://bookworm.madrasthemes.com/category/childrens-books/"
                                       className="small">Children&#039;s Books</a>, <a
                                    href="https://bookworm.madrasthemes.com/category/science-math/"
                                    className="small">Science &amp; Math</a>
                                </div>
                                <h2 className="entry-title h5 crop-text-2 font-weight-medium text-lh-md mb-3"><a
                                    href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                    rel="bookmark">&#8216;American Dirt&#8217; Invites Readers into the Journey of
                                    Mexican Migrants</a></h2>
                                <p className="text-muted mb-4">It’s nice to win awards. Last night, the Ueno team in
                                    Reykjavík came home from the Icelandic Web Awards.</p>
                                <div className="text-secondary-gray-700 post-meta">
                                    <a href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                       className="text-secondary-gray-700 post-date">August 19, 2020</a>
                                </div>
                            </div>
                        </article>

                    </div>
                </div>
                <div className="tab-pane fade" id="childrens-books" role="tabpanel"
                     aria-labelledby="tab-childrens-books">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        <article
                            className="col blog-grid post-1358 post type-post status-publish format-standard has-post-thumbnail hentry category-childrens-books category-science-math tag-arts tag-books tag-kids tag-romance">
                            <div className="mb-6">
                                <a className="d-block mb-3"
                                   href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/">
                                    <img width="445" height="300"
                                         src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg"
                                         className="img-fluid w-100 rounded wp-post-image"
                                         alt="&#8216;American Dirt&#8217; Invites Readers into the Journey of Mexican Migrants"
                                         decoding="async"
                                         fetchPriority="high"
                                         srcSet="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg 445w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-506x341.jpg 506w"
                                         sizes="(max-width: 445px) 100vw, 445px"
                                    /> </a>
                                <div className="mb-1 text-primary">
                                    <a href="https://bookworm.madrasthemes.com/category/childrens-books/"
                                       className="small">Children&#039;s Books</a>, <a
                                    href="https://bookworm.madrasthemes.com/category/science-math/"
                                    className="small">Science &amp; Math</a>
                                </div>
                                <h2 className="entry-title h5 crop-text-2 font-weight-medium text-lh-md mb-3"><a
                                    href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                    rel="bookmark">&#8216;American Dirt&#8217; Invites Readers into the Journey of
                                    Mexican Migrants</a></h2>
                                <p className="text-muted mb-4">It’s nice to win awards. Last night, the Ueno team in
                                    Reykjavík came home from the Icelandic Web Awards.</p>
                                <div className="text-secondary-gray-700 post-meta">
                                    <a href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                       className="text-secondary-gray-700 post-date">August 19, 2020</a>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="tab-pane fade" id="science-math" role="tabpanel" aria-labelledby="tab-science-math">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        <article
                            className="col blog-grid post-1358 post type-post status-publish format-standard has-post-thumbnail hentry category-childrens-books category-science-math tag-arts tag-books tag-kids tag-romance">
                            <div className="mb-6">
                                <a className="d-block mb-3"
                                   href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/">
                                    <img width="445" height="300"
                                         src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg"
                                         className="img-fluid w-100 rounded wp-post-image"
                                         alt="&#8216;American Dirt&#8217; Invites Readers into the Journey of Mexican Migrants"
                                         decoding="async"
                                         fetchPriority="high"
                                         srcSet="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg 445w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-506x341.jpg 506w"
                                         sizes="(max-width: 445px) 100vw, 445px"
                                    /> </a>
                                <div className="mb-1 text-primary">
                                    <a href="https://bookworm.madrasthemes.com/category/childrens-books/"
                                       className="small">Children&#039;s Books</a>, <a
                                    href="https://bookworm.madrasthemes.com/category/science-math/"
                                    className="small">Science &amp; Math</a>
                                </div>
                                <h2 className="entry-title h5 crop-text-2 font-weight-medium text-lh-md mb-3"><a
                                    href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                    rel="bookmark">&#8216;American Dirt&#8217; Invites Readers into the Journey of
                                    Mexican Migrants</a></h2>
                                <p className="text-muted mb-4">It’s nice to win awards. Last night, the Ueno team in
                                    Reykjavík came home from the Icelandic Web Awards.</p>
                                <div className="text-secondary-gray-700 post-meta">
                                    <a href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                       className="text-secondary-gray-700 post-date">August 19, 2020</a>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="tab-pane fade" id="arts-photography" role="tabpanel"
                     aria-labelledby="tab-arts-photography">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        <article
                            className="col blog-grid post-1358 post type-post status-publish format-standard has-post-thumbnail hentry category-childrens-books category-science-math tag-arts tag-books tag-kids tag-romance">
                            <div className="mb-6">
                                <a className="d-block mb-3"
                                   href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/">
                                    <img width="445" height="300"
                                         src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg"
                                         className="img-fluid w-100 rounded wp-post-image"
                                         alt="&#8216;American Dirt&#8217; Invites Readers into the Journey of Mexican Migrants"
                                         decoding="async"
                                         fetchPriority="high"
                                         srcSet="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg 445w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-506x341.jpg 506w"
                                         sizes="(max-width: 445px) 100vw, 445px"
                                    /> </a>
                                <div className="mb-1 text-primary">
                                    <a href="https://bookworm.madrasthemes.com/category/childrens-books/"
                                       className="small">Children&#039;s Books</a>, <a
                                    href="https://bookworm.madrasthemes.com/category/science-math/"
                                    className="small">Science &amp; Math</a>
                                </div>
                                <h2 className="entry-title h5 crop-text-2 font-weight-medium text-lh-md mb-3"><a
                                    href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                    rel="bookmark">&#8216;American Dirt&#8217; Invites Readers into the Journey of
                                    Mexican Migrants</a></h2>
                                <p className="text-muted mb-4">It’s nice to win awards. Last night, the Ueno team in
                                    Reykjavík came home from the Icelandic Web Awards.</p>
                                <div className="text-secondary-gray-700 post-meta">
                                    <a href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                       className="text-secondary-gray-700 post-date">August 19, 2020</a>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="tab-pane fade" id="biographies-memoirs" role="tabpanel"
                     aria-labelledby="tab-biographies-memoirs">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        <article
                            className="col blog-grid post-1358 post type-post status-publish format-standard has-post-thumbnail hentry category-childrens-books category-science-math tag-arts tag-books tag-kids tag-romance">
                            <div className="mb-6">
                                <a className="d-block mb-3"
                                   href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/">
                                    <img width="445" height="300"
                                         src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg"
                                         className="img-fluid w-100 rounded wp-post-image"
                                         alt="&#8216;American Dirt&#8217; Invites Readers into the Journey of Mexican Migrants"
                                         decoding="async"
                                         fetchPriority="high"
                                         srcSet="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg 445w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-506x341.jpg 506w"
                                         sizes="(max-width: 445px) 100vw, 445px"
                                    /> </a>
                                <div className="mb-1 text-primary">
                                    <a href="https://bookworm.madrasthemes.com/category/childrens-books/"
                                       className="small">Children&#039;s Books</a>, <a
                                    href="https://bookworm.madrasthemes.com/category/science-math/"
                                    className="small">Science &amp; Math</a>
                                </div>
                                <h2 className="entry-title h5 crop-text-2 font-weight-medium text-lh-md mb-3"><a
                                    href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                    rel="bookmark">&#8216;American Dirt&#8217; Invites Readers into the Journey of
                                    Mexican Migrants</a></h2>
                                <p className="text-muted mb-4">It’s nice to win awards. Last night, the Ueno team in
                                    Reykjavík came home from the Icelandic Web Awards.</p>
                                <div className="text-secondary-gray-700 post-meta">
                                    <a href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                       className="text-secondary-gray-700 post-date">August 19, 2020</a>
                                </div>
                            </div>
                        </article>

                    </div>
                </div>
                <div className="tab-pane fade" id="romance" role="tabpanel" aria-labelledby="tab-romance">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        <article
                            className="col blog-grid post-1358 post type-post status-publish format-standard has-post-thumbnail hentry category-childrens-books category-science-math tag-arts tag-books tag-kids tag-romance">
                            <div className="mb-6">
                                <a className="d-block mb-3"
                                   href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/">
                                    <img width="445" height="300"
                                         src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg"
                                         className="img-fluid w-100 rounded wp-post-image"
                                         alt="&#8216;American Dirt&#8217; Invites Readers into the Journey of Mexican Migrants"
                                         decoding="async"
                                         fetchPriority="high"
                                         srcSet="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-445x300.jpg 445w, https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-13-506x341.jpg 506w"
                                         sizes="(max-width: 445px) 100vw, 445px"
                                    /> </a>
                                <div className="mb-1 text-primary">
                                    <a href="https://bookworm.madrasthemes.com/category/childrens-books/"
                                       className="small">Children&#039;s Books</a>, <a
                                    href="https://bookworm.madrasthemes.com/category/science-math/"
                                    className="small">Science &amp; Math</a>
                                </div>
                                <h2 className="entry-title h5 crop-text-2 font-weight-medium text-lh-md mb-3"><a
                                    href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                    rel="bookmark">&#8216;American Dirt&#8217; Invites Readers into the Journey of
                                    Mexican Migrants</a></h2>
                                <p className="text-muted mb-4">It’s nice to win awards. Last night, the Ueno team in
                                    Reykjavík came home from the Icelandic Web Awards.</p>
                                <div className="text-secondary-gray-700 post-meta">
                                    <a href="https://bookworm.madrasthemes.com/2020/08/19/american-dirt-invites-readers-into-the-journey-of-mexican-migrants/"
                                       className="text-secondary-gray-700 post-date">August 19, 2020</a>
                                </div>
                            </div>
                        </article>

                    </div>
                </div>
            </div>
            <div className="space-bottom-2"></div>
            <nav className="d-flex justify-content-center" aria-label="Page navigation example">
                <ul className="pagination pagination__custom justify-content-md-center flex-nowrap flex-md-wrap overflow-auto overflow-md-visble mb-0">
                </ul>
                <ul className="pagination pagination__custom justify-content-md-center flex-nowrap flex-md-wrap overflow-auto overflow-md-visble mb-0">
                    <li className="page-item d-sm-none page-item-sm">
                        <span className="page-link page-link-static">1 / 3</span>
                    </li>
                    <li className="flex-shrink-0 flex-md-shrink-1 page-item active d-none d-sm-block">
                        <span aria-current="page" className="page-link current">1</span>
                    </li>
                    <li className="flex-shrink-0 flex-md-shrink-1 page-item d-none d-sm-block">
                        <a className="page-link"
                           href="https://bookworm.madrasthemes.com/blog/style-v2/page/2/">2</a>
                    </li>
                    <li className="flex-shrink-0 flex-md-shrink-1 page-item d-none d-sm-block">
                        <a className="page-link"
                           href="https://bookworm.madrasthemes.com/blog/style-v2/page/3/">3</a>
                    </li>
                </ul>
                <ul className="pagination pagination__custom justify-content-md-center flex-nowrap flex-md-wrap overflow-auto overflow-md-visble mb-0">
                    <li className="flex-shrink-0 flex-md-shrink-1 page-item next">
                        <a className="page-link" href="https://bookworm.madrasthemes.com/blog/style-v2/page/2/">
                            Next </a>
                    </li>
                </ul>
            </nav>
        </div>
        </body>
    )
}
export default BlogList;
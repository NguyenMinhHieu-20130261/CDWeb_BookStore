    import {Banner} from "./sub-components/Banner";
    import {TopBook} from "./sub-components/TopBook";
    import {NewBooks} from "./sub-components/NewBooks";
    import {Advertise} from "./sub-components/Advertise";
    import {Categories} from "./sub-components/Categories";
    import {Features} from "./sub-components/Features";

    export const Home = () => {
        return (
            <main id="main" className="site-main" role="main">
                <div id="post-152" className=" article__page post-152 page type-page status-publish hentry">
                    <div className="article__content article__content--page">
                        <div className="page__content">
                            <div className="wp-block-bwgb-template bwgb-template" id="bwgb-e84cf01">
                                <Banner/>
                                <TopBook/>
                                <NewBooks/>
                                <Advertise/>
                                <Categories/>
                                <Features/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
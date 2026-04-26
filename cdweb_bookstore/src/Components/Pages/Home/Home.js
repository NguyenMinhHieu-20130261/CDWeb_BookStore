    import {Banner} from "./Banner";
    import {TopBook} from "./TopBook";
    import {NewBooks} from "./NewBooks";
    import {Advertise} from "./Advertise";
    import {Categories} from "./Categories";
    import {Features} from "./Features";

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
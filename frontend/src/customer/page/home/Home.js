import {Banner} from "./sub-components/Banner";
import {TopBook} from "./sub-components/TopBook";
import {NewBooks} from "./sub-components/NewBooks";
import {Advertise} from "./sub-components/Advertise";
import {Categories} from "./sub-components/Categories";
import {Features} from "./sub-components/Features";
import LoadingPage from "../../components/general/LoadingPage";
import {useEffect, useState} from "react";

export const Home = () => {
    const [loading, setLoading] = useState(true);
    // Giả lập thời gian tải dữ liệu
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700);

        return () => clearTimeout(timer);
    }, []);
    if (loading) {
        return <LoadingPage />;
    }
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
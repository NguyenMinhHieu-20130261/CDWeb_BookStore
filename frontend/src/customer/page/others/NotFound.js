import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <main id="content" role="main">
            <div className="container">
                <div className="space-bottom-1 space-top-xl-2 space-bottom-xl-4">
                    <div className="d-flex flex-column align-items-center pt-lg-7 pb-lg-4 pb-lg-6">
                        <div className="font-weight-medium font-size-200 font-size-xs-170 text-lh-sm mt-xl-1">404
                        </div>
                        <h6 className="font-size-4 font-weight-medium">Woops, có vẻ như trang này không tồn tại</h6>
                        <span className="font-size-2 mt-3 mb-3">Bạn có thể quay lại trang chủ</span>
                        <div className="d-flex align-items-center flex-column">
                            <Link to={"/"}
                               className="btn btn-dark rounded-0 btn-wide height-60 width-350 font-weight-medium d-flex align-items-center justify-content-center">
                                Quay lại trang chủ </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default NotFound;
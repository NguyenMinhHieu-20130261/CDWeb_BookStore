import React from "react";
import {Link} from "react-router-dom";

const BreadCrumb = ()=>{
    return(
    <div className="page-header-admin">
        <div className="page-block">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/admin">Quản lý</Link>
                        </li>
                        <li className="breadcrumb-item">Quản lý chung</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    )
}
export default BreadCrumb




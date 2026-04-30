import React from "react";
import StatsCards from "./sub-components/StatsCards";
import RevenueCard from "./sub-components/RevenueCard";
import TaskTable from "./sub-components/TaskTable";
import Notification from "./sub-components/Notification";
import BreadCrumb from "../../components/general/Breadcumb";

const AdminDashboard = () => {
    return (
        <div>
            <div className="loader-bg">
                <div className="loader-track">
                    <div className="loader-fill"></div>
                </div>
            </div>         
            <div className="pc-container">
                <div className="pcoded-content">
                    <BreadCrumb/>
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <StatsCards/>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <RevenueCard/>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h6>Đánh giá của khách hàng</h6>
                                    <span>Tổng hợp tất cả đánh giá của khách hàng</span>
                                    <div className="row d-flex justify-content-center align-items-center">
                                        <div className="col">
                                            <div id="satisfaction-chart"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <TaskTable/>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="card prod-p-card background-pattern">
                                        <div className="card-body">
                                            <div className="row align-items-center m-b-0">
                                                <div className="col">
                                                    <h6 className="m-b-5">Tổng sản phẩm</h6>
                                                    <h3 className="m-b-0">630</h3>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="material-icons-two-tone text-primary">card_giftcard</i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card prod-p-card bg-primary background-pattern-white">
                                        <div className="card-body">
                                            <div className="row align-items-center m-b-0">
                                                <div className="col">
                                                    <h6 className="m-b-5 text-white">Tổng đơn đặt hàng</h6>
                                                    <h3 className="m-b-0 text-white">256</h3>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="material-icons-two-tone text-white">local_mall</i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card prod-p-card bg-primary background-pattern-white">
                                        <div className="card-body">
                                            <div className="row align-items-center m-b-0">
                                                <div className="col">
                                                    <h6 className="m-b-5 text-white">Lãi trung bình</h6>
                                                    <h3 className="m-b-0 text-white">60%</h3>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="material-icons-two-tone text-white">monetization_on</i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card prod-p-card background-pattern">
                                        <div className="card-body">
                                            <div className="row align-items-center m-b-0">
                                                <div className="col">
                                                    <h6 className="m-b-5">Số sản phẩm đã bán</h6>
                                                    <h3 className="m-b-0">205</h3>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="material-icons-two-tone text-primary">local_offer</i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Notification/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminDashboard;
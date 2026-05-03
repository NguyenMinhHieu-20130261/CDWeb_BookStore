import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/style-addresslist.css";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../my-account/sub-components/LeftSideBar";
import AddressItem from "./sub-components/AddressItem";

const AddressList = () => {

    // 👉 Mock data
    const [addresses] = useState([
        {
            id: 1,
            fullName: "Nguyễn Văn A",
            phoneNumber: "0912345678",
            provinceCity: "TP. Hồ Chí Minh",
            countyDistrict: "Quận 1",
            wardCommune: "Phường Bến Nghé",
            hnumSname: "123 Lê Lợi"
        },
        {
            id: 2,
            fullName: "Trần Thị B",
            phoneNumber: "0987654321",
            provinceCity: "Hà Nội",
            countyDistrict: "Quận Ba Đình",
            wardCommune: "Phường Kim Mã",
            hnumSname: "45 Kim Mã"
        }
    ]);

    // 👉 fake function để tránh lỗi props
    const fakeUpdateAddresses = () => {
        console.log("Mock update address");
    };

    return (
        <>
            <Breadcrumb />
            <div className="container information mt-5 mb-5 px-0">
                <LeftSideBar />

                <div className="col-md-9 address border" style={{ borderRadius: "10px" }}>
                    <div className="d-flex flex-column">

                        {/* HEADER */}
                        <div className="d-flex align-items-center justify-content-between address-title-div">
                            <h4>Địa chỉ của tôi</h4>

                            <Link to={"/user/address/new"}>
                                <button className="button-solid button-solid--primary">
                                    <div className="d-flex align-items-center">
                                        <i className="fa-regular fa-plus" style={{ marginRight: "10px" }}></i>
                                        <span>Thêm địa chỉ mới</span>
                                    </div>
                                </button>
                            </Link>
                        </div>

                        {/* LIST */}
                        <div style={{ padding: "12px 10px 0" }}>
                            <div className="list-title">Địa chỉ</div>

                            {addresses.length > 0 ? (
                                addresses.map((addressInfo) => (
                                    <AddressItem
                                        key={addressInfo.id}
                                        address={addressInfo}
                                        updateAddresses={fakeUpdateAddresses}
                                    />
                                ))
                            ) : (
                                <div className="text-center">
                                    Bạn chưa có địa chỉ nào. Hãy thêm địa chỉ mới.
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddressList;
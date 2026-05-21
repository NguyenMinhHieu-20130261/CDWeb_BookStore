import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../user-account/sub-components/LeftSideBar";
import AddressItem from "./sub-components/AddressItem";
import "../../assets/css/user-address.css"; 
import api from "../../../service/ApiService";

const UserAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    // Lấy thông tin user từ Redux store hoặc localStorage
    const reduxUser = useSelector((state) => state.auth.login.currentUser);
    // Nếu không tìm thấy user trong Redux, thử lấy từ localStorage
    const user = reduxUser || JSON.parse(localStorage.getItem("user"));
     

    useEffect(() => {
        const fetchAddresses = async () => {
            if (!user?.id){
            console.log("User ID không tồn tại");
            return;
            } 
            setLoading(true);
            try {
                const data = await api.fetchData(
                    `/address/${user.id}`
                );
                console.log("ADDRESS:", data);
                setAddresses(data);

            } catch (error) {
                console.log("Lỗi",  error);
            } finally {
                setLoading(false);
            }
        };
        fetchAddresses();

    }, [user?.id]);

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

                            <Link to={"/user/address/add"}>
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

                            {loading?(
                                <div className="text-center py-3">Đang tải...</div>
                            ):addresses.length > 0 ? (
                                addresses.map((address) => {
                                    console.log("Địa chỉ đang render:", address);
                                    return (
                                        <AddressItem
                                            key={address.id}
                                            address={address}
                                        />
                                    );
                                })
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

export default UserAddress;
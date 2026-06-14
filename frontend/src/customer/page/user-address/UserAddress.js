import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../user-account/sub-components/LeftSideBar";
import AddressItem from "./sub-components/AddressItem";
import "../../assets/css/user-address.css"; 
import api from "../../../service/ApiService";
import LoadingPage from "../../components/general/LoadingPage";
import WindowPopup from "../../components/general/WindowPopup";

const UserAddress = () => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popupInfo,setPopupInfo] = useState({
        visible:false,
        type:"",
        title:"",
        message:""
    });
    const user = useSelector((state) => state.auth.login.currentUser);
    useEffect(() => {
        const fetchAddresses = async () => {
            if (!user?.id){
                console.log("User ID không tồn tại");
                return; 
            }
            try {
                const data = await api.fetchData(
                    `/address/${user.id}`
                );
                // console.log("ADDRESS:", data);
                setAddresses(data);
                // console.log("USER I123123D:", user?.id);
            } catch (error) {
                console.log("Lỗi",  error);
            } finally {
                setLoading(false);
            }
        };
        fetchAddresses();
    }, [user?.id]);
    const handleDeleteAddress = async(addressId)=>{
        try {        
            // console.log("PARENT DELETE ADDRESS ID:", addressId);
            // console.log("DELETE URL:", `/address/delete/${addressId}`);
            await api.deleteData(
                    `/address/delete/${addressId}`
            );
            setAddresses((prev) =>
                prev.filter((address) => address.id !== addressId)
            );
            setPopupInfo({
                visible: true,
                type: "success",
                title: "Thành công",
                message: "Địa chỉ đã được xóa thành công"
            });
        } catch (error) {
            console.log("Lỗi",  error);
            // console.log("STATUS:", error.response?.status);
            // console.log("BACKEND DATA:", error.response?.data);
            setPopupInfo({
                visible: true,
                type: "error",
                title: "Thất bại",
                message: "Xóa địa chỉ thất bại"
            });
        }
    }
    const handleSetDefault = async(addressId)=>{
        try {        
            await api.updateData(
                    `/address/default/${addressId}`
            );
            setPopupInfo({
                visible:true,
                type:"question",
                title:"Xác nhận",
                message:"Địa chỉ đặt mặc định thành công"
            });
        } catch (error) {
            console.log("Lỗi",  error);
            console.log("STATUS:", error.response?.status);
            console.log("BACKEND DATA:", error.response?.data);
            setPopupInfo({
                visible: true,
                type: "error",
                title: "Thất bại",
                message: "Đặt mặc định thất bại"
            });
        }
    }
    if (loading) {
        return <LoadingPage />;
    }
    const hidePopup = () => {
        setPopupInfo(prev=>({
            ...prev,
            visible:false
        }));
    };
    return (
        <>
            <WindowPopup
                visible={popupInfo.visible}
                type={popupInfo.type}
                title={popupInfo.title}
                message={popupInfo.message}
                onClose={hidePopup}
            />
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
                            {loading?(
                                <div className="text-center py-3">Đang tải...</div>
                            ):addresses.length > 0 ? (
                                [...addresses]
                                    .sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
                                    .map((address) => {
                                    // console.log("Địa chỉ đang render:", address);
                                    return (
                                        <AddressItem
                                            key={address.id}
                                            address={address}
                                            onDelete={handleDeleteAddress}
                                            onSetDefault={handleSetDefault}
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
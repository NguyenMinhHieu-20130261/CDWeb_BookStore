import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import "../../assets/css/style-addresslist.css"
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../my-account/sub-components/LeftSideBar";
import AddressItem from "./sub-components/AddressItem";
import {useSelector} from "react-redux";
import APIService from "../../../service/APIService";

const AddressList = () => {
    const location = useLocation();
    const user = useSelector(state => state.auth.login.currentUser);
    const token = user ? user.token : null;
    const apiService = new APIService(token);
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchAddress = async () => {
        setIsLoading(true);
        try {
            const response = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/user/addresses`);
            setAddresses(response)
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching addresses', error);
        }
    }
    useEffect(() => {
        fetchAddress();
    }, [location.pathname])

    return (
        <>
            <Breadcrumb/>
            <div className="container information mt-5 mb-5 px-0">
                <LeftSideBar/>
                <div className="col-md-9 address border" style={{borderRadius: "10px"}}>
                    <div className="d-flex flex-column" role="main">
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center justify-content-between address-title-div">
                                <div className="flex-1">
                                    <h4>Địa chỉ của tôi</h4>
                                </div>
                                <div style={{display: "flex"}}>
                                    <Link to={"/user/address/new"}>
                                        <button className="button-solid button-solid--primary">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <div className="d-flex align-items-center"
                                                     style={{marginRight: "10px"}}>
                                                    <i className="fa-regular fa-plus"></i>
                                                </div>
                                                <div>Thêm địa chỉ mới</div>
                                            </div>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <div style={{padding: "12px 10px 0"}}>
                                    <div className="list-title">Địa chỉ</div>
                                    {isLoading ? (
                                        <div className="loader" style={{margin: '20px auto'}}></div>
                                    ) : (addresses.length > 0 ? (
                                        addresses.map(addressInfo => (
                                            <AddressItem key={addressInfo.id} address={addressInfo}
                                                         updateAddresses={fetchAddress}/>))
                                    ) : (<div className="text-center">Bạn chưa có địa chỉ nào. Hãy thêm địa chỉ
                                        mới.</div>))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AddressList;
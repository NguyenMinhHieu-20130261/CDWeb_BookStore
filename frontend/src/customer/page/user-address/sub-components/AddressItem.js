import React, {useState} from "react";
import {Link} from "react-router-dom";
import APIService from "../../../../service/APIService";
import ConfirmationModal from "../../../components/general/ConfirmationModal";

const AddressItem = ({address, updateAddresses}) => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user ? user.token : null;
    const apiService = new APIService(token);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const deleteAddress = async () => {
        try {
            const response = await apiService.deleteData(`${process.env.REACT_APP_ENDPOINT_API}/user/addresses/${address.id}`)
            console.log("Address deleted successfully:", response.data);
            updateAddresses();
        } catch (error) {
            console.error("Error deleting address:", error);
        }
    }

    const setDefaultAddress = async () => {
        try {
            const response = await apiService.updateData(`${process.env.REACT_APP_ENDPOINT_API}/user/addresses/default/${address.id}`)
            console.log("Address set default successfully:", response.data);
            updateAddresses();
        } catch (error) {
            console.error("Error setting default address", error);
        }
    }

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        deleteAddress();
        setIsModalOpen(false);
    };

    return (
        <div className="address-item-container">
            <div className="address-item">
                <div className="d-flex justify-content-between"
                     style={{marginBottom: "4px"}}>
                    <div className="address-card_header">
                                                <span className="name-span">
                                                    <div className="user-name">{address.fullName}</div>
                                                </span>
                        <div className="separate"></div>
                        <div role="row"
                             className="phone-number d-flex align-items-center">{address.phoneNumber}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end" style={{flexBasis: "40px"}}>
                        <Link to={`/user/address/update/${address.id}`}>
                            <button className="function-button update-button">Cập nhật</button>
                        </Link>
                        {address.default === false && (
                            <button onClick={handleDeleteClick} className="function-button delete-button">Xóa</button>)}
                        <ConfirmationModal
                            isOpen={isModalOpen}
                            onCancel={handleCancel}
                            onConfirm={handleConfirm}
                        />
                    </div>
                </div>
                <div className="address-card_content d-flex justify-content-between"
                     style={{marginBottom: "4px"}}>
                    <div className="flex-grow-1 d-flex"
                         style={{overflowX: "hidden", marginRight: "8px"}}>
                        <div className="address-content">
                            <div role="row" className="d-flex align-items-center">{address.hnumSname}
                            </div>
                            <div role="row"
                                 className="d-flex align-items-center">{address.wardCommune}, {address.countyDistrict}, {address.provinceCity}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end"
                         style={{paddingTop: "4px", flexBasis: "40px"}}>
                        <button onClick={setDefaultAddress} className="set-default-button"
                                disabled={address.default}>Thiết lập mặc
                            định
                        </button>
                    </div>
                </div>
                {address.default === true && (<div id="address-card_badge" role="row"
                                                   className="d-flex align-items-center">
                    <span role="mark" className="span-default">Mặc định</span>
                </div>)}
            </div>
        </div>
    );
}
export default AddressItem;
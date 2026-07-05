import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../user-account/sub-components/LeftSideBar";
import { useSelector } from "react-redux";
import api from "../../../service/ApiService";
import ProvinceService from "../../../service/ProvinceService";
import ValidateService  from "../../../service/ValidateService";
import WindowPopup from "../../components/general/WindowPopup";

const AddNewAddress = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [detailAdrs, setDetailAdrs] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [addressError, setAddressError] = useState("");

    const [popupInfo, setPopupInfo] = useState({
        visible: false,
        title: "",
        message: "",
        type: ""
    });

    const handleNameChange = (e) => {
        const value = e.target.value;
        setFullName(value);
        setNameError(ValidateService.validateFullName(value));
    };
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
        setPhoneError(ValidateService.validatePhone(value));
    };
    const handleAddressChange = (e) => {
        const value = e.target.value;
        setDetailAdrs(value);
        setAddressError(ValidateService.validateAddress(value));
    };

    const handleButtonSave = async (e) => {
        e.preventDefault();
        const nameValidate = ValidateService.validateFullName(fullName);
        const phoneValidate = ValidateService.validatePhone(phoneNumber);

        if (!user?.id) {
            setPopupInfo({
                visible: true,
                type: "error",
                title: "Lỗi",
                message: "Không tìm thấy người dùng"
            });
            // console.log("USER:", user);
            // console.log("USER ID:", user?.id);
            return;
        }
        if (!fullName || !phoneNumber || !detailAdrs ||
            !selectedProvince ||!selectedDistrict || !selectedWard) {
            setPopupInfo({
                visible: true,
                type: "warning",
                title: "Thiếu thông tin",
                message: "Vui lòng nhập đầy đủ thông tin"
            });
            return;
        }
        if (nameValidate) {
            setPopupInfo({
                visible: true,
                type: "warning",
                title: "Tên không hợp lệ",
                message: nameValidate
            });
            return;
        }

        if (phoneValidate) {
            setPopupInfo({
                visible: true,
                type: "warning",
                title: "Số điện thoại không hợp lệ",
                message: phoneValidate
            });
            return;
        }

        const addressValidate = ValidateService.validateAddress(detailAdrs);
        if (addressValidate) {
            setPopupInfo({
                visible: true,
                type: "warning",
                title: "Địa chỉ không hợp lệ",
                message: addressValidate
            });
            return;
        }
        try {
            const provinceObj = provinces.find(
                p => String(p.code) === String(selectedProvince)
            );

            const districtObj = districts.find(
                d => String(d.code) === String(selectedDistrict)
            );

            const wardObj = wards.find(
                w => String(w.code) === String(selectedWard)
            );
            const payload = {
                fullName,
                phoneNumber,
                detailAdrs: detailAdrs,
                provinceCity: provinceObj?.name,
                countyDistrict: districtObj?.name,
                wardCommune: wardObj?.name,
                districtId: Number(selectedDistrict),
                wardCode: selectedWard,
                isDefault: false,
                user: {
                    id: user.id
                }
            };

            if (!provinceObj || !districtObj || !wardObj) {
                setPopupInfo({
                    visible: true,
                    type: "warning",
                    title: "Địa chỉ không hợp lệ",
                    message: "Vui lòng chọn đầy đủ tỉnh, huyện, xã"
                });
                return;
            }
            console.log("SEND ADDRESS:", payload);
            await api.sendData(
                "/address/add",
                payload
            );
            setPopupInfo({
                visible: true,
                type: "success",
                title: "Thành công",
                message: "Thêm địa chỉ mới thành công"
            });
            setTimeout(() => {
                navigate("/user/address");
            }, 1000);
        } catch (error) {
            console.log("Lỗi khi thêm địa chỉ mới");
        }
    };
    useEffect(() => {
        const loadProvinces = async () => {
            const provinces = await ProvinceService.getProvinces();
            setProvinces(provinces);
        };
        loadProvinces();
    }, []);
    const hidePopup = () => {
        setPopupInfo(prev => ({
            ...prev,
            visible: false
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
                <div className="col-md-9 address">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Thêm địa chỉ mới</h4>
                    </div>

                    <form className="infor_user">
                        <div className="row border py-3 m-0" style={{ borderRadius: "10px" }}>
                            
                            {/* LEFT */}
                            <div className="col-md-6 border-right">
                                <div className="p-3">
                                    <h5>Thông tin liên hệ</h5>

                                    <div className="mt-3">

                                        <label>Họ và tên</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập họ tên"
                                            value={fullName}
                                            onChange={handleNameChange}
                                        />
                                        {nameError && (
                                            <div style={{ color: "red", marginTop: "5px" }}>
                                                {nameError}
                                            </div>
                                        )}

                                        <label style={{ marginTop: "10px" }}>Số điện thoại</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập số điện thoại"
                                            maxLength={10}
                                            value={phoneNumber}
                                            onChange={handlePhoneChange}
                                        />
                                        {phoneError && (
                                            <div style={{ color: "red", marginTop: "5px" }}>
                                                {phoneError}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="col-md-6">
                                <div className="p-3">
                                    <h5>Địa chỉ</h5>

                                    <label>Tỉnh/Thành phố:</label>
                                   <select
                                        className="pdw"
                                        onChange={async (e) => {
                                            const value = e.target.value;
                                            setSelectedProvince(value);
                                            const data = await ProvinceService.getDistricts(value);
                                            setDistricts(data);
                                        }}
                                    >
                                        <option value="">Chọn tỉnh/Thành phố</option>
                                        {provinces?.map(p => (
                                            <option key={p.code} value={p.code}>
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Quận/Huyện:</label>
                                    <select
                                        className="pdw"
                                        onChange={async (e) => {
                                            const value = e.target.value;
                                            setSelectedDistrict(value);
                                            const data = await ProvinceService.getWards(value);
                                            setWards(data);
                                        }}
                                    >
                                        <option value="">Chọn huyện</option>
                                        {districts?.map(d => (
                                            <option key={d.code} value={d.code}>
                                                {d.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Phường/Xã:</label>
                                    <select
                                        className="pdw"
                                        onChange={async (e) => {
                                            const value = e.target.value;
                                            setSelectedWard(value);
                                        }}
                                    >
                                        <option value="">Chọn xã</option>
                                        {wards?.map(w => (
                                            <option key={w.code} value={w.code}>
                                                {w.name}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        placeholder="Số nhà, tên đường"
                                        value={detailAdrs}
                                        onChange={handleAddressChange}
                                    />

                                    {addressError && (
                                        <div style={{ color: "red", marginTop: "5px" }}>
                                            {addressError}
                                        </div>
                                    )}

                                    <div className="mt-3 text-center">
                                        <button
                                            onClick={handleButtonSave}
                                            className="btn btn-primary"
                                        >
                                            Thêm địa chỉ
                                        </button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddNewAddress;
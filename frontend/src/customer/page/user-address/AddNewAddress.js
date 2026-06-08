import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../user-account/sub-components/LeftSideBar";
import { useSelector } from "react-redux";
import api from "../../../service/ApiService";
import ProvinceService from "../../../service/ProvinceService";
import PhoneValidService from "../../../service/PhoneValidService";

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

    const [error, setError] = useState('');

    const { isPhoneNumberValid, handleBlur, handlePhoneNumberChange } = PhoneValidService();

    const handleButtonSave = async (e) => {
        e.preventDefault();
        if (!user?.id) {
            alert("Không tìm thấy user");
            // console.log("USER:", user);
            // console.log("USER ID:", user?.id);
            return;
        }
        if (!fullName || !phoneNumber || !detailAdrs ||
            !selectedProvince ||!selectedDistrict || !selectedWard) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        if (!isPhoneNumberValid(phoneNumber)) {
            alert("Số điện thoại không hợp lệ");
            return;
        }
        try {
            const provinceObj = provinces.find(
                p => p.code === Number(selectedProvince)
            );
            const districtObj = districts.find(
                d => d.code === Number(selectedDistrict)
            );
            const wardObj = wards.find(
                w => w.code === selectedWard
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
            };
            await api.sendData(
                "/address/add",
                payload
            );
            alert("Địa chỉ mới đã được thêm thành công");            
            navigate("/user/address");
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
    return (
        <>
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
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                        <label style={{ marginTop: "10px" }}>Số điện thoại</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập số điện thoại"
                                            maxLength={10}
                                            onChange={(e) => {
                                                setPhoneNumber(e.target.value);
                                                handlePhoneNumberChange(e);
                                            }}                                            
                                            onBlur={handleBlur}
                                        />

                                        {error && (
                                            <div style={{ color: 'red', marginTop: '5px' }}>
                                                {error}
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
                                        onChange={(e) => setDetailAdrs(e.target.value)}
                                    />

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
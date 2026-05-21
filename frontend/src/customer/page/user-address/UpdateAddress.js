import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../user-account/sub-components/LeftSideBar";
import { useSelector } from "react-redux";
import api from "../../../service/ApiService";
import ProvinceService from "../../../service/ProvinceService";
import PhoneValidService from "../../../service/PhoneValidService";

const UpdateAddress = () => {
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

    const handleButtonUpdate = async (e) => {
        e.preventDefault();
        if (!user?.id) {
            alert("Không tìm thấy user");
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
                user: {
                    id: user.id
                }
            };
            const res = await api.sendData(
                "/address/add",
                payload
            );
            alert("Địa chỉ mới đã được thêm thành công + ");            
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
                    <h4>Chỉnh sửa địa chỉ</h4>

                    <form className="infor_user">
                        <div className="row border py-3 m-0" style={{ borderRadius: "10px" }}>

                            {/* LEFT */}
                            <div className="col-md-6 border-right">
                                <div className="p-3">
                                    <h5>Thông tin liên hệ</h5>

                                    <label>Họ và tên</label>
                                    <input
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="form-control"
                                    />

                                    <label style={{ marginTop: "10px" }}>Số điện thoại</label>
                                    <input
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                        maxLength={10}
                                    />

                                    {error && <div style={{ color: "red" }}>{error}</div>}
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="col-md-6">
                                <div className="p-3">
                                    <h5>Địa chỉ</h5>

                                    <label>Tỉnh:</label>
                                    <select
                                        className="pdw"
                                        onChange={(e) => setSelectedProvince(e.target.value)}
                                    >
                                        <option value="">Chọn tỉnh</option>
                                        {provinces.map(p => (
                                            <option key={p.ProvinceID} value={p.ProvinceID}>
                                                {p.ProvinceName}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Huyện:</label>
                                    <select
                                        className="pdw"
                                        onChange={(e) => setSelectedDistrict(e.target.value)}
                                    >
                                        <option value="">Chọn huyện</option>
                                        {districts.map(d => (
                                            <option key={d.DistrictID} value={d.DistrictID}>
                                                {d.DistrictName}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Xã:</label>
                                    <select
                                        className="pdw"
                                        onChange={(e) => setSelectedWard(e.target.value)}
                                    >
                                        <option value="">Chọn xã</option>
                                        {wards.map(w => (
                                            <option key={w.WardCode} value={w.WardCode}>
                                                {w.WardName}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        value={detailAdrs}
                                        onChange={(e) => setDetailAdrs(e.target.value)}
                                        className="form-control mt-2"
                                        placeholder="Số nhà, tên đường"
                                    />

                                    <div className="mt-3 text-center">
                                        <button
                                            onClick={handleButtonUpdate}
                                            className="btn btn-primary"
                                        >
                                            Cập nhật
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

export default UpdateAddress;
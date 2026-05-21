import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../user-account/sub-components/LeftSideBar";
import { useSelector } from "react-redux";
import api from "../../../service/ApiService";

const AddNewAddress = () => {
    const navigate = useNavigate();
    // Lấy thông tin user từ Redux store hoặc localStorage
    const reduxUser = useSelector((state) => state.auth.login.currentUser);
    // Nếu không tìm thấy user trong Redux, thử lấy từ localStorage
    const user = reduxUser || JSON.parse(localStorage.getItem("user"));

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

    function isPhoneNumberValid(number) {
        return /^0(3|5|7|8|9)+([0-9]{8})\b/.test(number);
    }
    const handleBlur = () => {
        if (phoneNumber !== '' && !isPhoneNumberValid(phoneNumber)) {
            setError('Số điện thoại không hợp lệ');
        } else {
            setError('');
        }
    };
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
        if (isPhoneNumberValid(value)) {
            setError('');
        }
    };

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
                user: {
                    id: user.id
                }
            };
            const res = await api.sendData(
                "/address/add",
                payload
            );
            // console.log("DATA SAVE:", res);
            alert("Địa chỉ mới đã được thêm thành công + ");            
            navigate("/user/address");
        } catch (error) {
            // console.log("ERROR:", error);
            // console.log("USER ID:", user?.id);
            console.log("Lỗi khi thêm địa chỉ mới");
        }
    };
    const fetchProvinces = async () => {
        try {

            const res = await fetch(
                "https://provinces.open-api.vn/api/p/"
            );

            const data = await res.json();

            setProvinces(data);

        } catch (error) {

            console.log(error);

        }
    };
    const fetchWards = async (districtCode) => {
        try {

            const res = await fetch(
                `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
            );

            const data = await res.json();

            setWards(data.wards || []);

        } catch (error) {

            console.log(error);

        }
    };
    const fetchDistricts = async (provinceCode) => {
        try {

            const res = await fetch(
                `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
            );

            const data = await res.json();

            setDistricts(data.districts || []);

        } catch (error) {

            console.log(error);

        }
    };
    useEffect(() => {
        fetchProvinces();
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
                                            onChange={handlePhoneNumberChange}
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
                                        onChange={(e) => {
                                            setSelectedProvince(e.target.value);
                                            fetchDistricts(e.target.value);
                                        }}
                                    >
                                        <option value="">Chọn tỉnh</option>
                                        {provinces?.map(p => (
                                            <option key={p.code} value={p.code}>
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Quận/Huyện:</label>
                                    <select
                                        className="pdw"
                                        onChange={(e) => {

                                            setSelectedDistrict(e.target.value);

                                            fetchWards(e.target.value);
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
                                        onChange={(e) => setSelectedWard(e.target.value)}
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
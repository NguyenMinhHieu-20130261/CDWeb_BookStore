import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../my-account/sub-components/LeftSideBar";

const AddNewAddress = () => {
    const navigate = useNavigate();

    // 👉 State cơ bản giữ lại để UI hoạt động
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hnumSname, setHnumSname] = useState('');

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const [error, setError] = useState('');

    // 👉 Mock data (fake tỉnh/huyện/xã)
    const provinces = [
        { ProvinceID: 1, ProvinceName: "TP. Hồ Chí Minh" },
        { ProvinceID: 2, ProvinceName: "Hà Nội" }
    ];

    const districts = [
        { DistrictID: 1, DistrictName: "Quận 1" },
        { DistrictID: 2, DistrictName: "Quận Bình Thạnh" }
    ];

    const wards = [
        { WardCode: "001", WardName: "Phường 1" },
        { WardCode: "002", WardName: "Phường 2" }
    ];

    // 👉 Validate số điện thoại (giữ lại UI)
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

    // 👉 Submit giả (không gọi API)
    const handleButtonSave = (e) => {
        e.preventDefault();
        console.log("Mock submit:", {
            fullName,
            phoneNumber,
            selectedProvince,
            selectedDistrict,
            selectedWard,
            hnumSname
        });

        // 👉 giả lập chuyển trang
        navigate('/user/address');
    };

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
                                        onChange={(e) => setSelectedProvince(e.target.value)}
                                    >
                                        <option value="">Chọn tỉnh</option>
                                        {provinces.map(p => (
                                            <option key={p.ProvinceID} value={p.ProvinceID}>
                                                {p.ProvinceName}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Quận/Huyện:</label>
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

                                    <label>Phường/Xã:</label>
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
                                        type="text"
                                        className="form-control mt-2"
                                        placeholder="Số nhà, tên đường"
                                        onChange={(e) => setHnumSname(e.target.value)}
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
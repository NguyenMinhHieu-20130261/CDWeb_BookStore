import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../my-account/sub-components/LeftSideBar";

const UpdateAddress = () => {
    const navigate = useNavigate();

    // 👉 Mock data (giả lập dữ liệu từ API)
    const mockAddress = {
        fullName: "Nguyễn Văn A",
        phoneNumber: "0912345678",
        provinceCity: "TP. Hồ Chí Minh",
        countyDistrict: "Quận 1",
        wardCommune: "Phường Bến Nghé",
        hnumSname: "123 Lê Lợi"
    };

    // 👉 State (bind UI)
    const [fullName, setFullName] = useState(mockAddress.fullName);
    const [phoneNumber, setPhoneNumber] = useState(mockAddress.phoneNumber);
    const [hnumSname, setHnumSname] = useState(mockAddress.hnumSname);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const [error, setError] = useState('');

    // 👉 Mock data select
    const provinces = [
        { ProvinceID: 1, ProvinceName: "TP. Hồ Chí Minh" },
        { ProvinceID: 2, ProvinceName: "Hà Nội" }
    ];

    const districts = [
        { DistrictID: 1, DistrictName: "Quận 1" },
        { DistrictID: 2, DistrictName: "Quận Bình Thạnh" }
    ];

    const wards = [
        { WardCode: "001", WardName: "Phường Bến Nghé" },
        { WardCode: "002", WardName: "Phường 2" }
    ];

    // 👉 validate
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
        if (isPhoneNumberValid(value)) setError('');
    };

    // 👉 submit fake
    const handleButtonUpdate = (e) => {
        e.preventDefault();

        console.log("Mock update:", {
            fullName,
            phoneNumber,
            selectedProvince,
            selectedDistrict,
            selectedWard,
            hnumSname
        });

        navigate('/user/address');
    };

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
                                        value={hnumSname}
                                        onChange={(e) => setHnumSname(e.target.value)}
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
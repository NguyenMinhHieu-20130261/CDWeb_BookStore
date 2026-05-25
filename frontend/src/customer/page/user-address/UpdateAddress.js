import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../user-account/sub-components/LeftSideBar";
import { useSelector } from "react-redux";
import api from "../../../service/ApiService";
import ProvinceService from "../../../service/ProvinceService";
import PhoneValidService from "../../../service/PhoneValidService";

const UpdateAddress = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const { id } = useParams();
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
            const res = await api.updateData(
                `/address/update/${id}`,
                payload
            );
            alert("Địa chỉ đã được cập nhật thành công!");            
            navigate("/user/address");
        } catch (error) {
            console.log("Lỗi khi cập nhật địa chỉ");
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        const loadProvinces = async () => {
            const provinces = await ProvinceService.getProvinces();
            setProvinces(provinces);
        };
        loadProvinces();
    }, []);
    useEffect(() => {
        const loadAddress = async () => {
            try {
                const data = await api.fetchData(`/address/update/${id}`);
                console.log("ADDRESS:", data);
                setFullName(data.fullName || '');
                setPhoneNumber(data.phoneNumber || '');
                setDetailAdrs(data.detailAdrs || '');
            } catch (error) {
                console.error("Load address error:", error);
            }
        };  
        if (id) {
            loadAddress();
        }
    }, [id]);
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
                                        placeholder="Nhập họ tên"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="form-control"
                                    />

                                    <label style={{ marginTop: "10px" }}>Số điện thoại</label>
                                    <input
                                        placeholder="Nhập số điện thoại"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
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

                                    <label>Tỉnh/Thành phố:</label>
                                    <select
                                        className="pdw"
                                        value={selectedProvince}
                                        onChange={async (e) => {
                                            const value = e.target.value;
                                            setSelectedProvince(value);
                                            const data = await ProvinceService.getDistricts(value);
                                            setDistricts(data);
                                            setSelectedDistrict('');
                                            setSelectedWard('');
                                        }}
                                    >
                                        <option value="">Chọn tỉnh/Thành phố</option>
                                        {provinces.map(p => (
                                            <option key={p.code} value={p.code}>
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Huyện:</label>
                                    <select
                                        className="pdw"
                                        value={selectedDistrict}
                                        onChange={async (e) => {
                                            const value = e.target.value;
                                            setSelectedDistrict(value);
                                            const data = await ProvinceService.getWards(value);
                                            setWards(data);
                                            setSelectedWard('');
                                        }}
                                    >
                                        <option value="">Chọn huyện</option>
                                        {districts.map(d => (
                                            <option key={d.code} value={d.code}>
                                                {d.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Xã:</label>
                                    <select
                                        className="pdw"
                                        value={selectedWard}
                                        onChange={(e) => setSelectedWard(e.target.value)}
                                    >
                                        <option value="">Chọn xã</option>
                                        {wards.map(w => (
                                            <option key={w.code} value={w.code}>
                                                {w.name}
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
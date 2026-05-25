import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../user-account/sub-components/LeftSideBar";
import {useSelector} from "react-redux";
import api from "../../../service/ApiService";
import ProvinceService from "../../../service/ProvinceService";
import PhoneValidService from "../../../service/PhoneValidService";
import LoadingPage from "../../components/general/LoadingPage";

const UpdateAddress = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const {id} = useParams();
    const [addressData, setAddressData] = useState({
        fullName: "",
        phoneNumber: "",
        detailAdrs: "",
        provinceId: "",
        districtId: "",
        wardCode: ""
    });
    const [locations, setLocations] = useState({provinces: [],districts: [],wards: []});
    const {isPhoneNumberValid, handleBlur} = PhoneValidService();

    const findLocation = (list, code) => {
        return list.find(item => item.code === Number(code) || item.code === code);
    };
    const handleButtonUpdate = async (e) => {
        e.preventDefault();
        if (!user?.id) {
            alert("Không tìm thấy user");
            return;
        }
        if (!addressData.fullName || !addressData.phoneNumber || !addressData.detailAdrs ||
            !addressData.provinceId || !addressData.districtId || !addressData.wardCode) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        if (!isPhoneNumberValid(addressData.phoneNumber)) {
            alert("Số điện thoại không hợp lệ");
            return;
        }
        try {
            const provinceObj = findLocation(locations.provinces, addressData.provinceId);
            const districtObj = findLocation(locations.districts, addressData.districtId);
            const wardObj = findLocation(locations.wards, addressData.wardCode);
            const payload = {
                fullName: addressData.fullName,
                phoneNumber: addressData.phoneNumber,
                detailAdrs: addressData.detailAdrs,
                provinceCity: provinceObj?.name,
                countyDistrict: districtObj?.name,
                wardCommune: wardObj?.name,
                districtId: Number(addressData.districtId),
                wardCode: addressData.wardCode,
                isDefault: false,
                user: {
                    id: user.id
                }
            };
            await api.updateData(`/address/update/${id}`, payload);

            alert("Địa chỉ đã được cập nhật thành công!");
            navigate("/user/address");
        } catch (error) {
            console.log("Lỗi khi cập nhật địa chỉ");
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        const loadAddressData = async () => {
            if (!id) return;
            try {
                setLoading(true);
                // Lấy thông tin địa chỉ hiện tại 
                const address = await api.fetchData(`/address/update/${id}`);
                // Lấy danh sách tỉnh thành để tìm provinceId
                const provinces = await ProvinceService.getProvinces();
                console.log("ADDRESS:", address);
                const provinceObj = provinces.find(p => p.name === address.provinceCity);
                // Nếu tìm được province, lấy danh sách quận huyện và xã tương ứng
                const provinceId = provinceObj? String(provinceObj.code) : "";
                const districts = provinceId ? await ProvinceService.getDistricts(provinceId): [];
                const districtId = address.districtId? String(address.districtId): "";
                const wards = districtId? await ProvinceService.getWards(districtId): [];
                setLocations({
                    provinces,
                    districts,
                    wards
                });
                setAddressData({
                    fullName: address.fullName || "",
                    phoneNumber: address.phoneNumber || "",
                    detailAdrs: address.detailAdrs || "",
                    provinceId,
                    districtId,
                    wardCode: address.wardCode || ""
                });
            } catch (error) {
                console.error("Load address error:", error);
            } finally {
                setLoading(false);
            }
        };
        loadAddressData();
    }, [id]);
    if (loading) {
        return <LoadingPage />;
    }
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
                                        value={addressData.fullName}
                                        onChange={(e) => setAddressData(prev => ({ ...prev, fullName: e.target.value }))}
                                        className="form-control"
                                    />

                                    <label style={{ marginTop: "10px" }}>Số điện thoại</label>
                                    <input
                                        placeholder="Nhập số điện thoại"
                                        value={addressData.phoneNumber}
                                        onChange={(e) => setAddressData(prev => ({ ...prev, phoneNumber: e.target.value }))}
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
                                        value={addressData.provinceId}
                                        onChange={async (e) => {
                                            const value = e.target.value;
                                            setAddressData(prev => ({ ...prev, provinceId: value }));
                                            const data = await ProvinceService.getDistricts(value);
                                            setLocations(prev => ({ ...prev, districts: data }));
                                            setAddressData(prev => ({ ...prev, districtId: '', wardCode: '' }));
                                        }}
                                    >
                                        <option value="">Chọn tỉnh/Thành phố</option>
                                        {locations.provinces.map(p => (
                                            <option key={p.code} value={p.code}>
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Huyện:</label>
                                    <select
                                        className="pdw"
                                        value={addressData.districtId}
                                        onChange={async (e) => {
                                            const value = e.target.value;
                                            setAddressData(prev => ({ ...prev, districtId: value }));
                                            const data = await ProvinceService.getWards(value);
                                            setLocations(prev => ({ ...prev, wards: data }));
                                            setAddressData(prev => ({ ...prev, wardCode: '' }));
                                        }}
                                    >
                                        <option value="">Chọn huyện</option>
                                        {locations.districts.map(d => (
                                            <option key={d.code} value={d.code}>
                                                {d.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Xã:</label>
                                    <select
                                        className="pdw"
                                        value={addressData.wardCode}
                                        onChange={(e) => setAddressData(prev => ({ ...prev, wardCode: e.target.value }))}
                                    >
                                        <option value="">Chọn xã</option>
                                        {locations.wards.map(w => (
                                            <option key={w.code} value={w.code}>
                                                {w.name}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        value={addressData.detailAdrs}
                                        onChange={(e) => setAddressData(prev => ({ ...prev, detailAdrs: e.target.value }))}
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
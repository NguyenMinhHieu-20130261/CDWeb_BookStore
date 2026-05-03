import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "../my-account/sub-components/LeftSideBar";
import APIService from "../../../service/APIService";
import {isEmpty} from "react-admin";
import axios from "axios";

const AddNewAddress = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user ? user.token : null;
    const apiServiceWithToken = new APIService(token);
    const apiService = new APIService();
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hnumSname, setHnumSname] = useState('');
    const [wardCommune, setWardCommune] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [countyDistrict, setCountyDistrict] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [provinceCity, setProvinceCity] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const checkSaveButton = () => {
        setSaveButtonEnabled(fullName != '' && phoneNumber != '' && isPhoneNumberValid(phoneNumber) && provinceCity != '' && selectedProvince != '' &&
            countyDistrict != '' && selectedDistrict != '' && wardCommune != '' && selectedWard != '' && hnumSname != '');
    };
    useEffect(() => {
        checkSaveButton();
    }, [fullName, phoneNumber, provinceCity, countyDistrict, wardCommune, hnumSname])

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

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_GHN_ADDRESS}/province`, {
                    headers: {
                        token: `${process.env.REACT_APP_GHN_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                });
                setProvinces(response.data.data);
            } catch (error) {
                console.error('Error fetching province', error);
            }
        }
        fetchProvinces();
    }, [])

    const fetchDistrict = async (selectedProvince) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_GHN_ADDRESS}/district?province_id=${selectedProvince}`, {
                headers: {
                    token: `${process.env.REACT_APP_GHN_TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });
            setDistricts(response.data.data)
        } catch (error) {
            console.error('Error fetching province', error);
        }
    }

    const fetchWard = async (selectedDistrict) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_GHN_ADDRESS}/ward?district_id=${selectedDistrict}`, {
                headers: {
                    token: `${process.env.REACT_APP_GHN_TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });
            setWards(response.data.data)
        } catch (error) {
            console.error('Error fetching province', error);
        }
    }
    const handleProvinceChange = async (e) => {
        const selectedValue = parseInt(e.target.value);
        if (selectedValue !== '') {
            await fetchDistrict(selectedValue);
            const selectedProvince = provinces.find(province => province.ProvinceID === selectedValue);
            if (selectedProvince) {
                setSelectedDistrict('');
                setCountyDistrict('')
                setSelectedWard('');
                setWardCommune('')
                setSelectedProvince(selectedProvince.ProvinceID);
                setProvinceCity(selectedProvince.ProvinceName);
            } else {
                setProvinceCity('');
            }
        }
    }

    const handleDistrictChange = async (e) => {
        const selectedValue = parseInt(e.target.value);
        if (selectedValue !== '') {
            await fetchWard(selectedValue);
            const selectedDistrict = districts.find(district => district.DistrictID === selectedValue);

            if (selectedDistrict) {
                setSelectedWard('');
                setWardCommune('')
                setSelectedDistrict(selectedDistrict.DistrictID);
                setCountyDistrict(selectedDistrict.DistrictName);
            } else {
                setCountyDistrict('');
            }
        }
    }

    const handleWardChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue !== '') {
            const selectedWard = wards.find(ward => ward.WardCode === selectedValue);

            if (selectedWard) {
                setSelectedWard(selectedWard.WardCode);
                setWardCommune(selectedWard.WardName);
            } else {
                setWardCommune('');
            }
        }
    }

    const addAddress = async () => {
        const request = {
            fullName: fullName,
            phoneNumber: phoneNumber,
            provinceCity: provinceCity,
            countyDistrict: countyDistrict,
            wardCommune: wardCommune,
            hnumSname: hnumSname,
            districtId: selectedDistrict,
            wardCode: selectedWard
        }
        try {
            const response = await apiServiceWithToken.sendData(`${process.env.REACT_APP_ENDPOINT_API}/user/addresses`, request)
            console.log("Address created successfully", response)
        } catch (error) {
            console.error("Error creating address");
        }
    }
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
        if (isPhoneNumberValid(value)) {
            setError('');
        }
    };
    const handleButtonSave = async (e) => {
        e.preventDefault();
        await addAddress();
        navigate('/user/address');
    }
    return (
        <>
            <Breadcrumb/>
            <div className="container information mt-5 mb-5 px-0">
                <LeftSideBar/>
                <div className="col-md-9 address">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right">Thêm địa chỉ mới</h4>
                        <p style={{
                            color: "#11ff02",
                            textAlign: "center",
                            textTransform: "none",
                            paddingTop: "5px"
                        }}>
                        </p>
                    </div>
                    <form method="post" encType="multipart/form-data" className="infor_user">
                        <div className="row border py-3 m-0" style={{borderRadius: "10px"}}>
                            <div className="col-md-6 border-right">
                                <div className="p-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="text-right">Thông tin liên hệ</h5>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12"><label className="labels">Họ và tên</label>
                                            <input type="text" id="fullname" className="form-control" name="fullname"
                                                   placeholder="Nhập họ tên"
                                                   onChange={(e) => setFullName(e.target.value)}
                                                   required/>
                                        </div>
                                        <div className="col-md-12"><label className="labels"
                                                                          style={{paddingTop: "10px"}}>Số
                                            điện
                                            thoại</label><input id="phone" type="text" className="form-control"
                                                                name="phone"
                                                                placeholder="Nhập số điện thoại tại đây"
                                                                onChange={handlePhoneNumberChange}
                                                                maxLength={10}
                                                                onBlur={handleBlur}
                                                                required/>
                                            {error && <div style={{color: 'red', marginTop: '5px'}}>{error}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="text-right">Địa chỉ</h5>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Tỉnh/Thành phố:</label>
                                        <select id="province" className="pdw"
                                                onChange={handleProvinceChange}>
                                            <option value="">Tỉnh/Thành phố</option>
                                            {provinces.map(province => (
                                                <option key={province.ProvinceID} value={province.ProvinceID}
                                                        selected={selectedProvince === province.ProvinceID}>
                                                    {province.ProvinceName}
                                                </option>
                                            ))}
                                        </select>
                                        <br/>
                                        <label>Quận/Huyện:</label>
                                        <select id="district" className="pdw" onChange={handleDistrictChange}>
                                            <option value="">Quận/Huyện</option>
                                            {districts.map(district => (
                                                <option key={district.DistrictID} value={district.DistrictID}
                                                        selected={selectedDistrict === district.DistrictID}>
                                                    {district.DistrictName}
                                                </option>))}
                                        </select>
                                        <br/>
                                        <label>Phường/Xã:</label>
                                        <select id="ward" className="pdw" onChange={handleWardChange}>
                                            <option value="">Phường/Xã</option>
                                            {wards.map(ward => (
                                                <option key={ward.WardCode} value={ward.WardCode}
                                                        selected={selectedWard === ward.WardCode}>
                                                    {ward.WardName}
                                                </option>))}
                                        </select>
                                        <br/>
                                        <input type="text" id="soNha" className="form-control"
                                               placeholder="Số nhà, Tên đường"
                                               onChange={(e) => setHnumSname(e.target.value)}/>
                                        <br/>
                                        <div id="error" style={{textAlign: "center", color: "red"}}></div>
                                    </div>
                                    <p style={{
                                        color: "red",
                                        textAlign: "center",
                                        textTransform: "none",
                                        paddingTop: "5px"
                                    }}>
                                    </p>
                                    <div className="mt-3 text-center">
                                        <button disabled={!saveButtonEnabled} onClick={handleButtonSave}
                                                className="btn btn-primary profile-button"
                                                type="submit">Thêm địa chỉ
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
}
export default AddNewAddress;

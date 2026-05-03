import React, {useEffect, useState} from "react";
import "../../assets/css/style-myaccount.css"
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "./sub-components/LeftSideBar";
import APIService from "../../../service/APIService";
import {isEmpty} from "react-admin";
import axios from "axios";

const MyAccount = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [avatar, setAvatar] = useState('');
    const [day, setDay] = useState('0');
    const [month, setMonth] = useState('0');
    const [year, setYear] = useState('0');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [popupInfo, setPopupInfo] = useState({message: '', type: '', visible: false});
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user ? user.token : null;
    const apiService = new APIService(token);
    const [isChecked, setIsChecked] = useState(false);
    const [information, setInformation] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [updateSideBar, setUpdateSideBar] = useState(false);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let dayCheck;
        let monthCheck;
        let yearCheck;
        if (information?.userInfo?.dateOfBirth) {
            const [fetchedYear, fetchedMonth, fetchedDay] = information?.userInfo?.dateOfBirth.split('-');

            const indexOfT = fetchedDay.indexOf('T');
            if (indexOfT !== -1) {
                dayCheck = fetchedDay.substring(0, indexOfT).padStart(2, '0');
            }
            monthCheck = fetchedMonth.padStart(2, '0');
            yearCheck = fetchedYear;
        }
        const hasChanges = (fullName !== information?.userInfo?.fullName && fullName !== '') || (phoneNumber !== information?.userInfo?.phoneNumber && phoneNumber !== '' && isPhoneNumberValid(phoneNumber)) || gender !== information?.userInfo?.gender
            || selectedFile !== null || (day !== dayCheck && day !== '0' && month !== '0' && year !== '0') || (month !== monthCheck && month !== '0' && day !== '0' && year !== '0') || (year !== yearCheck && year !== '0' && day !== '0' && month !== '0') ||
            (isChecked && (currentPassword !== '' || newPassword !== '' || newPasswordConfirm !== ''));
        setIsSaveEnabled(hasChanges);
    }, [fullName, phoneNumber, gender, day, month, year, selectedFile, isChecked, currentPassword, newPassword, newPasswordConfirm]);

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
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedFile(null);
        }
    };
    const fetchInformation = async () => {
        const result = await apiService.fetchData(`${process.env.REACT_APP_ENDPOINT_API}/user/info`);
        setInformation(result);
        setFullName(result.userInfo?.fullName);
        setPhoneNumber(result.userInfo?.phoneNumber);
        setGender(result.userInfo?.gender);
        if (result.userInfo?.dateOfBirth) {
            const [fetchedYear, fetchedMonth, fetchedDay] = result.userInfo?.dateOfBirth.split('-');
            const indexOfT = fetchedDay.indexOf('T');
            let day;
            if (indexOfT !== -1) {
                day = fetchedDay.substring(0, indexOfT);
            }
            setDay(day.padStart(2, '0'));
            setMonth(fetchedMonth.padStart(2, '0'));
            setYear(fetchedYear);
        }
        if (result.userInfo?.avatar) {
            setAvatar(result.userInfo.avatar);
        }
    }

    useEffect(() => {
        fetchInformation();
    }, [])

    const handleGenderChange = (event) => {
        const selectedGender = event.target.value;
        setGender(selectedGender);
    };
    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
        if (isPhoneNumberValid(event.target.value)) {
            setError('');
        }
    };
    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const updateInformation = async (requestData) => {
        try {
            const responseData = await apiService.updateData(`${process.env.REACT_APP_ENDPOINT_API}/user/info`, requestData)
            setIsSaveEnabled(false);
            setIsChecked(false);
            setCurrentPassword('');
            setNewPassword('');
            setNewPasswordConfirm('');
            setPopupInfo({message: responseData, type: 'success', visible: true});
            fetchInformation();
            setUpdateSideBar(true);
        } catch (error) {
            if (error.response) {
                setPopupInfo({message: error.response.data, type: 'error', visible: true});
            }
        }
    }

    const handleSaveAvatar = async () => {
        if (selectedFile) {
            setUploading(true);

            const formData = new FormData();
            formData.append('image', selectedFile);

            try {
                const response = await axios.post(`https://api.imgbb.com/1/upload?key=c383fa3727851be15a713c4c41085099`, formData);
                if (response.data && response.data.data && response.data.data.url) {
                    console.log('Uploaded image URL:', response.data.data.url);
                    setSelectedFile(null);
                    setUploading(false);
                    return response.data.data.url;
                } else {
                    alert('Không tải được hình ảnh lên.');
                    setUploading(false);
                    return null;
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Lỗi upload hình ảnh');
                setUploading(false);
                return null;
            }
        }
        return null;
    };
    const handleButtonSave = async (e) => {
        e.preventDefault();
        const uploadedAvatarUrl = await handleSaveAvatar();

        let formattedDate;
        if (day !== '0' && month !== '0' && year !== '0') {
            formattedDate = `${year}-${month}-${day}`;
        } else {
            formattedDate = '';
        }
        if (isChecked) {
            if (!currentPassword || !newPassword || !newPasswordConfirm) {
                setPopupInfo({
                    message: 'Vui lòng điền tất cả các trường trong đổi mật khẩu',
                    type: 'error',
                    visible: true
                });
                return;
            }
            if (currentPassword.length < 8 || newPassword.length < 8) {
                setPopupInfo({
                    message: 'Mật khẩu phải có ít nhất 8 ký tự',
                    type: 'error',
                    visible: true
                });
                return;
            }
            if (newPasswordConfirm !== newPassword) {
                setPopupInfo({
                    message: 'Mật khẩu nhập lại không trùng khớp',
                    type: 'error',
                    visible: true
                });
                return;
            }
        }
        const requestData = {
            fullName: !isEmpty(fullName) ? fullName : null,
            phoneNumber: !isEmpty(phoneNumber) ? phoneNumber : null,
            gender: !isEmpty(gender) ? gender : null,
            dateOfBirth: !isEmpty(formattedDate) ? formattedDate : null,
            avatar: !isEmpty(uploadedAvatarUrl) ? uploadedAvatarUrl : avatar,
            ...(isChecked && {
                currentPassword: currentPassword,
                newPassword: newPassword,
                newPasswordConfirm: newPasswordConfirm,
            }),
        };
        await updateInformation(requestData);
    }
    const hidePopup = () => {
        setPopupInfo((prevInfo) => ({...prevInfo, visible: false}));
    };
    return (
        <>
            <Breadcrumb/>
            <div className="container information mt-5 mb-5 px-0">
                <LeftSideBar update={updateSideBar}/>
                <div className="col-md-9 user-info">
                    <form onSubmit={handleButtonSave}>
                        <div className="row border py-3 m-0" style={{borderRadius: "10px"}}>
                            <div className="col-md-9 border-right">
                                <div className="">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Thông tin tài khoản</h4>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6"><label className="labels">Tên đăng nhập</label>
                                            <input type="text" id="username" value={information.username}
                                                   className="form-control" name="username"
                                                   placeholder="Nhập username" readOnly/>
                                        </div>
                                        <div className="col-md-6 fullName"><label className="labels">Họ và tên</label>
                                            <input onChange={handleFullNameChange} type="text" id="fullname"
                                                   value={fullName}
                                                   className="form-control" name="fullname"
                                                   placeholder="Nhập họ tên"/>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12"><label className="labels">Email</label>
                                            <input type="email" id="email" value={information.email}
                                                   className="form-control" name="email"
                                                   placeholder="Nhập email tại đây" readOnly/>
                                        </div>
                                        <div className="col-md-12"><label className="labels mt-3">Số
                                            điện
                                            thoại</label><input onChange={handlePhoneNumberChange} id="phone"
                                                                type="text"
                                                                value={phoneNumber}
                                                                className="form-control" name="phone" maxLength="10"
                                                                placeholder="Nhập số điện thoại tại đây"
                                                                onBlur={handleBlur}/>
                                            {error && <div style={{color: 'red', marginTop: '5px'}}>{error}</div>}
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mt-4">
                                        <label className="mb-0 mr-8">Giới tính</label>
                                        <label className="label-radio">
                                            <input type="radio" name="gender" value="male"
                                                   checked={gender === 'male'}
                                                   onChange={handleGenderChange}/>
                                            <span className="radio-fake"></span>
                                            <span className="label">Nam</span>
                                        </label>
                                        <label className="label-radio">
                                            <input type="radio" name="gender" value="female"
                                                   checked={gender === 'female'}
                                                   onChange={handleGenderChange}/>
                                            <span className="radio-fake"></span>
                                            <span className="label">Nữ</span>
                                        </label>
                                        <label className="label-radio">
                                            <input type="radio" name="gender" value="other"
                                                   checked={gender === 'other'}
                                                   onChange={handleGenderChange}/>
                                            <span className="radio-fake"></span>
                                            <span className="label">Khác</span>
                                        </label>
                                    </div>
                                    <div className="d-flex align-items-center mt-4">
                                        <label className="labels mb-0 mr-8">Ngày sinh</label>
                                        <div className="select-birthday">
                                            <select name="day" value={day} onChange={(e) => setDay(e.target.value)}>
                                                <option value="0">Ngày</option>
                                                {Array.from({length: 31}, (_, i) => (i + 1).toString().padStart(2, '0')).map((day) => (
                                                    <option key={day} value={day}>{day}</option>
                                                ))}
                                            </select>
                                            <select name="month" value={month}
                                                    onChange={(e) => setMonth(e.target.value)}>
                                                <option value="0">Tháng</option>
                                                {Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0')).map((month) => (
                                                    <option key={month} value={month}>{month}</option>
                                                ))}
                                            </select>
                                            <select name="year" value={year} onChange={(e) => setYear(e.target.value)}>
                                                <option value="0">Năm</option>
                                                {Array.from({length: 75}, (_, i) => 2024 - i).map((year) => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12 d-flex align-items-center">
                                            <input type="checkbox" id="checkbox" className="mr-2"
                                                   checked={isChecked}
                                                   onChange={() => setIsChecked(!isChecked)}
                                                   style={{width: "15px", height: "15px"}}/>
                                            <label className="form-check-label" style={{marginTop: "2px"}}>Đổi mật
                                                khẩu</label>
                                        </div>
                                        {isChecked && (<div className="mt-3 w-100">
                                            <div className="col-md-12"><label className="labels">Mật khẩu hiện
                                                tại</label><input
                                                type="password" id="current-password" className="form-control"
                                                name="current-password"
                                                placeholder="Nhập mật khẩu hiện tại"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                            />
                                            </div>
                                            <br/>
                                            <div className="col-md-12"><label className="labels">Mật khẩu
                                                mới</label><input
                                                type="password" id="new-password" className="form-control"
                                                name="new-password"
                                                placeholder="Nhập mật khẩu mới"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                            </div>
                                            <br/>
                                            <div className="col-md-12"><label className="labels">Nhập lại mật khẩu
                                                mới</label><input
                                                type="password" id="new-password-confirm" className="form-control"
                                                name="new-password-confirm" placeholder="Nhập lại mật khẩu mới"
                                                value={newPasswordConfirm}
                                                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                                            />
                                            </div>

                                            <p style={{
                                                color: "red",
                                                textAlign: "center",
                                                textTransform: "none",
                                                paddingTop: "5px"
                                            }}>
                                            </p>
                                        </div>)}
                                    </div>
                                    <div className="mt-5 text-center">
                                        <button disabled={!isSaveEnabled} className="btn btn-primary profile-button">Lưu
                                            thông tin
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="d-flex justify-content-between align-items-center"><h4
                                    className="text-right">Ảnh đại diện</h4>
                                </div>
                                <div className="d-flex flex-column align-items-center text-center">
                                    <div className="image-container">
                                        <div id="container">
                                            <div className="avatar-wrapper">
                                                <img className="img-avt-review profile-pic" alt="User avatar"
                                                     src={selectedFile ? avatar : information?.userInfo?.avatar}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="image-container">
                                        <div id="container">
                                            <input type="file" id="imageUpload" name="files" className="input-file"
                                                   accept="image/*" onChange={handleImageChange} disabled={uploading}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div
                className={`popup popup--icon -success js_success-popup ${popupInfo.visible && popupInfo.type === 'success' ? 'popup--visible' : ''}`}>
                <div className="popup__background"></div>
                <div className="popup__content">
                    <h3 className="popup__content__title">
                        Thành công
                    </h3>
                    <p style={{marginBottom: "10px"}}>{popupInfo.message}</p>
                    <p>
                        <button className="button-popup button--success" data-for="js_success-popup"
                                onClick={hidePopup}>Ẩn thông báo
                        </button>
                    </p>
                </div>
            </div>

            <div
                className={`popup popup--icon -error js_error-popup ${popupInfo.visible && popupInfo.type === 'error' ? 'popup--visible' : ''}`}>
                <div className="popup__background"></div>
                <div className="popup__content">
                    <h3 className="popup__content__title">
                        Thất bại
                    </h3>
                    <p style={{marginBottom: "10px"}}>{popupInfo.message}</p>
                    <p>
                        <button className="button-popup button--error" data-for="js_error-popup"
                                onClick={hidePopup}>Ẩn thông báo
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
}
export default MyAccount;

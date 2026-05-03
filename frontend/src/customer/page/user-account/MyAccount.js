import React, {useState} from "react";
import "../../assets/css/style-myaccount.css"
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "./sub-components/LeftSideBar";

const MyAccount = () => {
    const [fullName, setFullName] = useState("Nguyễn Văn A");
    const [phoneNumber, setPhoneNumber] = useState("0123456789");
    const [gender, setGender] = useState("male");
    const [avatar, setAvatar] = useState("https://via.placeholder.com/150");

    const [day, setDay] = useState("01");
    const [month, setMonth] = useState("01");
    const [year, setYear] = useState("2000");

    const [isChecked, setIsChecked] = useState(false);

    const information = {
        username: "demo_user",
        email: "demo@gmail.com",
        userInfo: {
            avatar: avatar
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Breadcrumb/>
            <div className="container information mt-5 mb-5 px-0">
                <LeftSideBar/>
                <div className="col-md-9 user-info">
                    <form>
                        <div className="row border py-3 m-0" style={{borderRadius: "10px"}}>
                            
                            {/* LEFT */}
                            <div className="col-md-9 border-right">
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4>Thông tin tài khoản</h4>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Tên đăng nhập</label>
                                            <input value={information.username}
                                                   className="form-control" readOnly/>
                                        </div>

                                        <div className="col-md-6">
                                            <label>Họ và tên</label>
                                            <input value={fullName}
                                                   onChange={(e) => setFullName(e.target.value)}
                                                   className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <label>Email</label>
                                            <input value={information.email}
                                                   className="form-control" readOnly/>
                                        </div>

                                        <div className="col-md-12">
                                            <label className="mt-3">Số điện thoại</label>
                                            <input value={phoneNumber}
                                                   onChange={(e) => setPhoneNumber(e.target.value)}
                                                   className="form-control"/>
                                        </div>
                                    </div>

                                    {/* Gender */}
                                    <div className="d-flex align-items-center mt-4">
                                        <label className="mr-3">Giới tính</label>

                                        <label className="label-radio">
                                            <input type="radio" value="male"
                                                   checked={gender === 'male'}
                                                   onChange={(e) => setGender(e.target.value)}/>
                                            <span className="label">Nam</span>
                                        </label>

                                        <label className="label-radio">
                                            <input type="radio" value="female"
                                                   checked={gender === 'female'}
                                                   onChange={(e) => setGender(e.target.value)}/>
                                            <span className="label">Nữ</span>
                                        </label>

                                        <label className="label-radio">
                                            <input type="radio" value="other"
                                                   checked={gender === 'other'}
                                                   onChange={(e) => setGender(e.target.value)}/>
                                            <span className="label">Khác</span>
                                        </label>
                                    </div>

                                    {/* Birthday */}
                                    <div className="d-flex align-items-center mt-4">
                                        <label className="mr-3">Ngày sinh</label>
                                        <div className="select-birthday">
                                            <select value={day} onChange={(e) => setDay(e.target.value)}>
                                                {Array.from({length: 31}, (_, i) => (
                                                    <option key={i}>{String(i + 1).padStart(2, '0')}</option>
                                                ))}
                                            </select>

                                            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                                                {Array.from({length: 12}, (_, i) => (
                                                    <option key={i}>{String(i + 1).padStart(2, '0')}</option>
                                                ))}
                                            </select>

                                            <select value={year} onChange={(e) => setYear(e.target.value)}>
                                                {Array.from({length: 50}, (_, i) => (
                                                    <option key={i}>{2025 - i}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Change password */}
                                    <div className="mt-3">
                                        <input type="checkbox"
                                               checked={isChecked}
                                               onChange={() => setIsChecked(!isChecked)}/>
                                        <label className="ml-2">Đổi mật khẩu</label>
                                    </div>

                                    {isChecked && (
                                        <div className="mt-3">
                                            <input type="password" placeholder="Mật khẩu hiện tại"
                                                   className="form-control mb-2"/>
                                            <input type="password" placeholder="Mật khẩu mới"
                                                   className="form-control mb-2"/>
                                            <input type="password" placeholder="Nhập lại mật khẩu"
                                                   className="form-control"/>
                                        </div>
                                    )}

                                    <div className="mt-5 text-center">
                                        <button className="btn btn-primary">
                                            Lưu thông tin
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT - AVATAR */}
                            <div className="col-md-3">
                                <h4>Ảnh đại diện</h4>

                                <div className="text-center">
                                    <img src={avatar}
                                         alt="avatar"
                                         style={{width: "120px", borderRadius: "50%"}}/>

                                    <input type="file"
                                           className="form-control mt-3"
                                           onChange={handleImageChange}/>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default MyAccount;
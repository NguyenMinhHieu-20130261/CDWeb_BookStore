import React, {useState,useEffect} from "react";
import "../../assets/css/user-account.css"
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "./sub-components/LeftSideBar";
import { useSelector,useDispatch  } from "react-redux";
import { loginSuccess } from "../../../Store/AuthSlice";

const UserAccount = () => {
    const user = useSelector(state => state.auth.login.currentUser);
    const dispatch = useDispatch();
    // Form data state
    const [userData, setUserData] = useState({
        fullName: "",
        phoneNumber: "",
        gender: "",
        username: "",
        email: "",
        avatar: "https://via.placeholder.com/150",
        day: "01",
        month: "01",
        year: "2000"
    });

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        // console.log("CURRENT USER:", user);
        if (!user || !user.id) {
            console.log("User chưa có id");
            return;
        }
        const fetchUserInfo = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/userinfo/${user.id}`
                );
                if (!res.ok) {
                    throw new Error("API ERROR: " + res.status);
                }

                const data = await res.json();
                // console.log("USER INFO:", data);

                 const birthday = data.birthday
                    ? new Date(data.birthday)
                    : null;

                const updatedData = {
                    fullName: data.fullName || "",
                    phoneNumber: data.phoneNumber || "",
                    gender: data.gender || "",
                    username: user.username || "",
                    email: user.email || "",
                    avatar:
                        data.avatar ||
                        "https://via.placeholder.com/150",

                    day: birthday
                        ? String(birthday.getDate()).padStart(2, "0")
                        : "01",

                    month: birthday
                        ? String(birthday.getMonth() + 1).padStart(2, "0")
                        : "01",

                    year: birthday
                        ? String(birthday.getFullYear())
                        : "2000"
                };
                setUserData(updatedData);
                // Cập nhật thông tin người dùng trong Redux
                const updatedUser = {
                    ...user,
                    userInformation: data
                };
                dispatch(loginSuccess(updatedUser));
                // Cập nhật thông tin người dùng trong localStorage
                localStorage.setItem(
                    "user",
                    JSON.stringify(updatedUser)
                );
            } catch (error) {
                console.log("Load user info error:", error);
            }
        };
        fetchUserInfo();
    }, [user]);
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
                                            <input value={userData.username}
                                                   className="form-control" readOnly/>
                                        </div>

                                        <div className="col-md-6">
                                            <label>Họ và tên</label>
                                            <input value={userData.fullName}
                                                   onChange={(e) => setUserData(prev => ({ ...prev, fullName: e.target.value }))}
                                                   className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <label>Email</label>
                                            <input value={userData.email}
                                                   className="form-control" readOnly/>
                                        </div>

                                        <div className="col-md-12">
                                            <label className="mt-3">Số điện thoại</label>
                                            <input value={userData.phoneNumber}
                                                   onChange={(e) => setUserData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                                   className="form-control"/>
                                        </div>
                                    </div>

                                    {/* Gender */}
                                    <div className="d-flex align-items-center mt-4">
                                        <label className="mr-3">Giới tính</label>

                                        <label className="label-radio">
                                            <input type="radio" value="male"
                                                   checked={userData.gender === 'male'}
                                                   onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}/>
                                            <span className="label">Nam</span>
                                        </label>

                                        <label className="label-radio">
                                            <input type="radio" value="female"
                                                   checked={userData.gender === 'female'}
                                                   onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}/>
                                            <span className="label">Nữ</span>
                                        </label>

                                        <label className="label-radio">
                                            <input type="radio" value="other"
                                                   checked={userData.gender === 'other'}
                                                   onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}/>
                                            <span className="label">Khác</span>
                                        </label>
                                    </div>

                                    {/* Birthday */}
                                    <div className="d-flex align-items-center mt-4">
                                        <label className="mr-3">Ngày sinh</label>
                                        <div className="select-birthday">
                                            <select value={userData.day} onChange={(e) => setUserData(prev => ({ ...prev, day: e.target.value }))}>
                                                {Array.from({length: 31}, (_, i) => (
                                                    <option key={i}>{String(i + 1).padStart(2, '0')}</option>
                                                ))}
                                            </select>

                                            <select value={userData.month} onChange={(e) => setUserData(prev => ({ ...prev, month: e.target.value }))}>
                                                {Array.from({length: 12}, (_, i) => (
                                                    <option key={i}>{String(i + 1).padStart(2, '0')}</option>
                                                ))}
                                            </select>

                                            <select value={userData.year} onChange={(e) => setUserData(prev => ({ ...prev, year: e.target.value }))}>
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
                                    <img src={ userData.avatar}
                                         alt="avatar"
                                         style={{width: "120px", borderRadius: "50%"}}/>

                                    <input type="file"
                                           className="form-control mt-3"
                                        //    onChange={handleImageChange}
                                    />
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UserAccount;
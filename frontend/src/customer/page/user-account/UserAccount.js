import React, {useState,useEffect} from "react";
import "../../assets/css/user-account.css"
import Breadcrumb from "../../components/general/Breadcrumb";
import LeftSideBar from "./sub-components/LeftSideBar";
import { useSelector,useDispatch  } from "react-redux";
import { loginSuccess } from "../../../Store/AuthSlice";
import api from "../../../service/ApiService";
import { useNavigate } from "react-router-dom";

const UserAccount = () => {
    const user = useSelector(state => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    // load info người dùng khi component mount
    useEffect(() => {
        if (!user || !user.id) {
            console.log("User chưa có id");
            return;
        }
        const fetchUserInfo = async () => {
            try {
                const data = await api.fetchData(`/userinfo/customer/${user.id}`);
                console.log("USER INFO DATA:", data);
                // chia ngày sinh thành day, month, year
                const birthdayParts = data.birthday
                    ? data.birthday.split("-")
                    : null;
                // Cập nhật userData state với dữ liệu từ API
                const updatedData = {
                    fullName: data.fullName || "",
                    phoneNumber: data.phoneNumber || "",
                    gender: data.gender || "",
                    username: user.username || "",
                    email: user.email || "",
                    avatar: data.avatar || "https://via.placeholder.com/150",

                    year: birthdayParts ? birthdayParts[0] : "2000",
                    month: birthdayParts ? birthdayParts[1] : "01",
                    day: birthdayParts ? birthdayParts[2] : "01"
                };
                setUserData(updatedData);
                // Cập nhật thông tin người dùng trong Redux store
                const updatedUser = {
                    ...user,
                    userInformation: data
                };
                dispatch(loginSuccess(updatedUser));
                localStorage.setItem("user", JSON.stringify(updatedUser));

            } catch (error) {
                console.log("Load user info error:", error);
            }
        };
        fetchUserInfo();
    }, [user?.id, dispatch]);
    // Xử lý cập nhật thông tin người dùng
    const handleUpdateUserInfo = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            alert("Bạn chưa đăng nhập");
            return;
        }
        const birthday = `${userData.year}-${userData.month}-${userData.day}`;

        const payload = {
            fullName: userData.fullName,
            phoneNumber: userData.phoneNumber,
            gender: userData.gender,
            birthday: birthday,
            avatar: userData.avatar
        };

        try {
            const res = await api.updateData(`/userinfo/update/${user.id}`, payload);

            const updatedUser = {
                ...user,
                userInformation: res.data
            };

            dispatch(loginSuccess(updatedUser));
            localStorage.setItem("user", JSON.stringify(updatedUser));

            alert("Cập nhật thông tin thành công");
            navigate("/user/info");
        } catch (error) {
            console.log("Update user info error:", error);
            alert("Cập nhật thông tin thất bại");
        }
    };

    return (
        <>
            <Breadcrumb/>
            <div className="container information mt-5 mb-5 px-0">
                <LeftSideBar/>
                <div className="col-md-9 user-info">
                    <form 
                    onSubmit={handleUpdateUserInfo}
                    >
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
                                            <input 
                                            value={userData.username}
                                            onChange={(e) => setUserData(prev => ({ ...prev, username: e.target.value }))}
                                            className="form-control"/>
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
                                    <div className="form-group mt-4">
                                        <label className="form-label d-block mb-2">Giới tính</label>
                                        <div className="gender-options">
                                            <label className="gender-radio">
                                                <input type="radio" value="male"
                                                    checked={userData.gender === 'male'}
                                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}/>
                                                <span className="radio-fake"/>
                                                <span className="label">Nam</span>
                                            </label>

                                            <label className="gender-radio">
                                                <input type="radio" value="female"
                                                    checked={userData.gender === 'female'}
                                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}/>
                                                <span className="radio-fake"/>
                                                <span className="label">Nữ</span>
                                            </label>

                                            <label className="gender-radio">
                                                <input type="radio" value="other"
                                                    checked={userData.gender === 'other'}
                                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}/>
                                                <span className="radio-fake"/>
                                                <span className="label">Khác</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Birthday */}
                                    <div className="d-flex align-items-center mt-4">
                                        <label className="mr-3">Ngày sinh</label>
                                        <div className="select-birthday">
                                            <select value={userData.day} onChange={(e) => setUserData(prev => ({ ...prev, day: e.target.value }))} >
                                                {Array.from({ length: 31 }, (_, i) => {
                                                    const day = String(i + 1).padStart(2, "0");
                                                    return (
                                                        <option key={day} value={day}> {day} </option>
                                                    );
                                                })}
                                            </select>
                                            <select value={userData.month} onChange={(e) => setUserData(prev => ({ ...prev, month: e.target.value }))} >
                                                {Array.from({ length: 12 }, (_, i) => {
                                                    const month = String(i + 1).padStart(2, "0");
                                                    return (
                                                        <option key={month} value={month}> {month} </option>
                                                    );
                                                })}
                                            </select>
                                            <select value={userData.year} onChange={(e) => setUserData(prev => ({ ...prev, year: e.target.value }))}>
                                                {Array.from({ length: 100 }, (_, i) => {
                                                    const year = new Date().getFullYear() - i;
                                                    return (
                                                        <option key={year} value={String(year)}> {year} </option>
                                                    );
                                                })}
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
                                        <button className="btn btn-primary"
                                            type="submit"
                                        >
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
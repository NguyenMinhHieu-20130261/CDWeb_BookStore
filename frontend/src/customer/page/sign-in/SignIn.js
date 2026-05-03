import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import BreadCrumb from "../../components/general/Breadcrumb";
import {loginUser} from "../../../Store/ApiRequest";
import {useDispatch} from "react-redux";
import "../../assets/css/sign-in.css";

const SignIn = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = React.useState("");
    const newUser = {
        username: username,
        password: password
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const res = await loginUser(newUser, dispatch);
            console.log(res);
            navigate("/"); 
        } catch (error) {
            const msg =
                error.response?.data?.message ||
                "Tài khoản hoặc mật khẩu không đúng";

            setErrorMessage(msg);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <BreadCrumb location={location}/>
            <div className="content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="form-block">
                                        <div className="mb-4">
                                            <h3>Đăng nhập</h3>
                                        </div>
                                        <form onSubmit={handleLogin}>
                                            <div className="form-group first">
                                                <p> Tên đăng nhập</p>
                                                <input type="text" className="form-control" id="username"
                                                        name="username" required
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        style ={{padding: "2px 10px"}}
                                                       />
                                            </div>
                                            <div className="form-group last mb-4">
                                                <p>Mật khẩu</p>
                                                <input type="password" className="form-control" id="password"
                                                       name="password" required
                                                       onChange={(e) => setPassword(e.target.value)}
                                                       style ={{padding: "2px 10px"}}
                                                      />
                                            </div>

                                            <div className=" mb-5 align-items-center">
                                            {errorMessage && (
                                                <div className="error" role="alert">
                                                    {errorMessage}
                                                </div>
                                            )}
                                            <span className="ml-auto">
                                                <Link to={"/forgot-password"}
                                                className="forgot-pass">Quên mật khẩu</Link></span>
                                            </div>
                                 
                                            <button className="button_login" 
                                            type="submit" 
                                            style={{textAlign: "center", padding :"15px"}}
                                            disabled={loading}
                                            >Đăng nhập</button>

                                            <span className="d-block text-center my-4 text-muted"> Đăng nhập với:</span>

                                            <div className="social-login text-center">
                                                <Link to={"/not-found"} className="facebook">
                                                    <span><i className="fa-brands fa-facebook-f"></i></span>
                                                </Link>
                                                <Link to={"/user/account"} className="twitter">
                                                    <span><i className="fa-brands fa-twitter"></i></span>
                                                </Link>
                                                <Link to={"/user/wishlist"} className="google">
                                                    <span> <i className="fa-brands fa-google"></i></span>
                                                </Link>

                                                <span className="d-block text-center my-4 text-muted"><Link
                                                    to={"/sign-up"}
                                                    style={{width: "60px", color: "#6c757d"}}>Đăng kí</Link> </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SignIn;
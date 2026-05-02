import React from "react";
import {Link} from "react-router-dom";

const ForgotPassword = () => {
    return (
        <div className="content">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 contents">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="form-block">
                                    <div className="mb-4">
                                        <h3>Quên mật khẩu</h3>
                                    </div>
                                    <form action="#" method="post">
                                        <div className="form-group first">
                                            <p className="inline-text">Tên đăng nhập hoặc Email</p>
                                            <input type="text" className="form-control" id="username" 
                                            placeholder="Điền tên đăng nhập hoặc email"
                                            style ={{padding: "2px 10px"}} required
                                            />

                                        </div>
                                        <Link to={"/forgot-password"} style={{textDecoration: "none"}}>
                                            <div className="button_forgot">Đặt lại mật khẩu</div>
                                        </Link>
                                        <Link to={"/sign-in"} className="d-block text-center my-4 text-muted"
                                              style={{textDecoration: "none"}}> Trở lại đăng nhập</Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ForgotPassword;
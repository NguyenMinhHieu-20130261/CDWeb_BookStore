import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/general/Breadcrumb";
import PayForm from "./sub-components/PayForm";
import Bill from "./sub-components/Bill";
import api from "../../../service/ApiService";
import ProvinceService from "../../../service/ProvinceService";
import PhoneValidService from "../../../service/PhoneValidService";
import WindowPopup from "../../components/general/WindowPopup";

export const Coupon = () => {
    const handleCouponLinkClick = (e) => {
        e.preventDefault();
        const inputEl = document.querySelector(".checkout__coupon__section input");
        if (inputEl) {
            inputEl.scrollIntoView({ behavior: "smooth", block: "center" });
            inputEl.focus();
        }
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <h6><span className="icon_tag_alt"></span> Bạn có mã giảm giá ? <a href="#" onClick={handleCouponLinkClick}>Nhấn vào đây</a> để nhập mã giảm giá
                </h6>
            </div>
        </div>
    );
};

export const Checkout = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    // State for inputs
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [detailAdrs, setDetailAdrs] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");

    const [note, setNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Thanh toán khi nhận hàng");
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Cart and UI state
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const [popupInfo, setPopupInfo] = useState({
        visible: false,
        title: "",
        message: "",
        type: ""
    });

    // Coupon states
    const [couponCode, setCouponCode] = useState("");
    const [appliedPromotion, setAppliedPromotion] = useState(null);
    const [couponError, setCouponError] = useState("");
    const [couponSuccess, setCouponSuccess] = useState("");

    const { isPhoneNumberValid } = PhoneValidService ? PhoneValidService() : {};

    useEffect(() => {
        if (!user || !user.id) {
            setPopupInfo({
                visible: true,
                type: "warning",
                title: "Yêu cầu đăng nhập",
                message: "Bạn cần đăng nhập để thực hiện thanh toán!"
            });
            setTimeout(() => {
                navigate("/sign-in");
            }, 2000);
            return;
        }

        const fetchCartAndProvinces = async () => {
            try {
                // Fetch cart items
                const items = await api.fetchData(`/cart/items/${user.id}`);
                setCartItems(items);

                // Fetch provinces
                const provinceList = await ProvinceService.getProvinces();
                setProvinces(provinceList);
            } catch (err) {
                console.error("Lỗi khi tải thông tin giỏ hàng/tỉnh thành:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCartAndProvinces();
    }, [navigate]);

    const handleProvinceChange = async (provinceCode) => {
        setSelectedProvince(provinceCode);
        setSelectedDistrict("");
        setSelectedWard("");
        setWards([]);
        if (provinceCode) {
            const data = await ProvinceService.getDistricts(provinceCode);
            setDistricts(data);
        } else {
            setDistricts([]);
        }
    };

    const handleDistrictChange = async (districtCode) => {
        setSelectedDistrict(districtCode);
        setSelectedWard("");
        if (districtCode) {
            const data = await ProvinceService.getWards(districtCode);
            setWards(data);
        } else {
            setWards([]);
        }
    };

    const hidePopup = () => {
        setPopupInfo((prev) => ({
            ...prev,
            visible: false
        }));
    };

    const handleApplyCoupon = async (e) => {
        if (e) e.preventDefault();
        if (!user || !user.id) {
            setCouponError("Bạn cần đăng nhập để áp dụng mã giảm giá");
            setCouponSuccess("");
            return;
        }
        if (!couponCode.trim()) {
            setCouponError("Vui lòng nhập mã giảm giá");
            setCouponSuccess("");
            return;
        }
        try {
            setCouponError("");
            setCouponSuccess("");
            const res = await api.fetchData(`/promotions/validate?code=${couponCode.trim()}&userId=${user.id}`);
            if (res) {
                setAppliedPromotion(res);
                setCouponSuccess(`Áp dụng mã giảm giá "${res.code}" thành công! Giảm ${res.discountPercent}%`);
                setCouponError("");
            }
        } catch (err) {
            console.error("Lỗi khi áp dụng mã giảm giá:", err);
            setAppliedPromotion(null);
            setCouponSuccess("");
            const errMsg = err.response?.data?.message || err.response?.data || "Mã giảm giá không hợp lệ hoặc đã hết hạn";
            setCouponError(errMsg);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedPromotion(null);
        setCouponCode("");
        setCouponError("");
        setCouponSuccess("");
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!user || !user.id) {
            setPopupInfo({
                visible: true,
                type: "error",
                title: "Lỗi",
                message: "Không tìm thấy người dùng"
            });
            return;
        }

        if (!fullName || !phoneNumber || !detailAdrs || !selectedProvince || !selectedDistrict || !selectedWard) {
            setPopupInfo({
                visible: true,
                type: "warning",
                title: "Thiếu thông tin",
                message: "Vui lòng nhập đầy đủ thông tin giao hàng"
            });
            return;
        }

        if (isPhoneNumberValid && !isPhoneNumberValid(phoneNumber)) {
            setPopupInfo({
                visible: true,
                type: "error",
                title: "Số điện thoại không hợp lệ",
                message: "Vui lòng kiểm tra lại số điện thoại"
            });
            return;
        } else if (!isPhoneNumberValid && phoneNumber.length < 10) {
            setPopupInfo({
                visible: true,
                type: "error",
                title: "Số điện thoại không hợp lệ",
                message: "Số điện thoại phải từ 10 chữ số"
            });
            return;
        }

        if (!isConfirmed) {
            setPopupInfo({
                visible: true,
                type: "warning",
                title: "Chưa xác nhận",
                message: "Vui lòng tích chọn xác nhận thông tin đơn hàng"
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const provinceObj = provinces.find((p) => p.code === Number(selectedProvince));
            const districtObj = districts.find((d) => d.code === Number(selectedDistrict));
            const wardObj = wards.find((w) => w.code === selectedWard);

            const payload = {
                userId: user.id,
                fullName,
                phoneNumber,
                detailAdrs,
                provinceCity: provinceObj?.name,
                countyDistrict: districtObj?.name,
                wardCommune: wardObj?.name,
                wardCode: selectedWard,
                districtId: Number(selectedDistrict),
                note,
                paymentMethod,
                promotionId: appliedPromotion ? appliedPromotion.id : null
            };

            await api.sendData("/orders/create", payload);

            setPopupInfo({
                visible: true,
                type: "success",
                title: "Thành công",
                message: "Đặt hàng thành công!"
            });

            setTimeout(() => {
                navigate("/user/order");
            }, 1500);
        } catch (error) {
            console.error("Lỗi đặt hàng:", error);
            setPopupInfo({
                visible: true,
                type: "error",
                title: "Đặt hàng thất bại",
                message: error.response?.data || "Đã xảy ra lỗi trong quá trình xử lý đơn hàng"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div>
                <Breadcrumb />
                <section className="checkout spad">
                    <div className="container">
                        <p>Đang tải thông tin thanh toán...</p>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div>
            <WindowPopup
                visible={popupInfo.visible}
                type={popupInfo.type}
                title={popupInfo.title}
                message={popupInfo.message}
                onClose={hidePopup}
            />
            <Breadcrumb />
            <section className="checkout spad">
                <div className="container">
                    <Coupon />
                    <div className="checkout__form">
                        <h4>Thông tin thanh toán</h4>
                        <form onSubmit={handlePlaceOrder}>
                            <div className="row">
                                <PayForm
                                    fullName={fullName}
                                    setFullName={setFullName}
                                    phoneNumber={phoneNumber}
                                    setPhoneNumber={setPhoneNumber}
                                    detailAdrs={detailAdrs}
                                    setDetailAdrs={setDetailAdrs}
                                    provinces={provinces}
                                    districts={districts}
                                    wards={wards}
                                    selectedProvince={selectedProvince}
                                    selectedDistrict={selectedDistrict}
                                    selectedWard={selectedWard}
                                    handleProvinceChange={handleProvinceChange}
                                    handleDistrictChange={handleDistrictChange}
                                    setSelectedWard={setSelectedWard}
                                    note={note}
                                    setNote={setNote}
                                    phoneError={phoneError}
                                />
                                <Bill
                                    cartItems={cartItems}
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                    isConfirmed={isConfirmed}
                                    setIsConfirmed={setIsConfirmed}
                                    isSubmitting={isSubmitting}
                                    couponCode={couponCode}
                                    setCouponCode={setCouponCode}
                                    appliedPromotion={appliedPromotion}
                                    couponError={couponError}
                                    couponSuccess={couponSuccess}
                                    handleApplyCoupon={handleApplyCoupon}
                                    handleRemoveCoupon={handleRemoveCoupon}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Checkout;
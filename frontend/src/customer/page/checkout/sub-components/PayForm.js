import React from "react";

const PayForm = ({
    fullName,
    setFullName,
    phoneNumber,
    setPhoneNumber,
    detailAdrs,
    setDetailAdrs,
    provinces,
    districts,
    wards,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    handleProvinceChange,
    handleDistrictChange,
    setSelectedWard,
    note,
    setNote,
    phoneError
}) => {
    return (
        <div className="col-lg-8 col-md-6">
            <div className="checkout__input">
                <p>Họ và tên<span>*</span></p>
                <input
                    style={{color:"black"}}
                    type="text"
                    value={fullName}
                    placeholder="Nhập họ và tên người nhận"
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </div>
            
            <div className="checkout__input">
                <p>Số điện thoại<span>*</span></p>
                <input
                    style={{color:"black"}}
                    type="text"
                    value={phoneNumber}
                    placeholder="Nhập số điện thoại"
                    maxLength={10}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                {phoneError && (
                    <div style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                        {phoneError}
                    </div>
                )}
            </div>

            <div className="checkout__input">
                <p>Tỉnh/Thành phố<span>*</span></p>
                <select
                    className="checkout__input__select"
                    value={selectedProvince}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    required
                >
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {provinces?.map((p) => (
                        <option key={p.code} value={p.code}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="checkout__input">
                <p>Quận/Huyện<span>*</span></p>
                <select
                    className="checkout__input__select"
                    value={selectedDistrict}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    disabled={!selectedProvince}
                    required
                >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts?.map((d) => (
                        <option key={d.code} value={d.code}>
                            {d.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="checkout__input">
                <p>Phường/Xã<span>*</span></p>
                <select
                    className="checkout__input__select"
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                    disabled={!selectedDistrict}
                    required
                >
                    <option value="">Chọn Phường/Xã</option>
                    {wards?.map((w) => (
                        <option key={w.code} value={w.code}>
                            {w.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="checkout__input">
                <p>Địa chỉ chi tiết<span>*</span></p>
                <input
                    type="text"
                    value={detailAdrs}
                    placeholder="Số nhà, tên đường"
                    onChange={(e) => setDetailAdrs(e.target.value)}
                    required
                />
            </div>

            <div className="checkout__input">
                <p>Ghi chú đơn hàng</p>
                <input
                    type="text"
                    value={note}
                    placeholder="Ghi chú về đơn hàng của bạn, ví dụ: Hàng dễ vỡ."
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>
        </div>
    );
};

export default PayForm;
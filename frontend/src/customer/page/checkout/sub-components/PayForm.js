const PayForm = () => {
    return (
        <div className="col-lg-8 col-md-6">
            <div className="row">
                <div className="col-lg-6">
                    <div className="checkout__input">
                        <p>Họ<span>*</span></p>
                        <input type="text"/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="checkout__input">
                        <p>Tên<span>*</span></p>
                        <input type="text"/>
                    </div>
                </div>
            </div>
            <div className="checkout__input">
                <p>Quốc gia<span>*</span></p>
                <input type="text"/>
            </div>
            <div className="checkout__input">
                <p>Địa chỉ<span>*</span></p>
                <input type="text" placeholder="Street Address" className="checkout__input__add"/>
                    <input type="text" placeholder="Apartment, suite, unite ect (optinal)"/>
            </div>
            <div className="checkout__input">
                <p>Quận/Huyện<span>*</span></p>
                <input type="text"/>
            </div>
            <div className="checkout__input">
                <p>Tỉnh/Thành phố<span>*</span></p>
                <input type="text"/>
            </div>
            <div className="checkout__input">
                <p>Mã bưu điện (tùy chọn)<span>*</span></p>
                <input type="text"/>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="checkout__input">
                        <p>Điện thoại<span>*</span></p>
                        <input type="text"/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="checkout__input">
                        <p>Email<span>*</span></p>
                        <input type="text"/>
                    </div>
                </div>
            </div>
            <div className="checkout__input__checkbox">
                <label htmlFor="diff-acc">
                    Giao đến địa chỉ khác?
                    <input type="checkbox" id="diff-acc"/>
                        <span className="checkmark"></span>
                </label>
            </div>
            <div className="checkout__input">
                <p>Ghi chú<span>*</span></p>
                <input type="text" placeholder="Ghi chú về đơn hàng của bạn, ví dụ:Hàng dễ vỡ."/>
            </div>
        </div>
    )
}
export default PayForm;
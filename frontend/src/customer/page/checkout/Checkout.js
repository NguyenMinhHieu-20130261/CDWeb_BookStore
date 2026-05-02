import Breadcrumb from "../../components/general/Breadcrumb"
import PayForm from "./sub-components/PayForm"
import Bill from "./sub-components/Bill"

export const Coupon = () => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <h6><span className="icon_tag_alt"></span> Bạn có mã giảm giá ? <a href="#">Nhấn vào đây</a> để nhận mã
                    giảm giá
                </h6>
            </div>
        </div>
    )
}
export const Checkout = () => {
    return (
        <div>
            <Breadcrumb />
        <section className="checkout spad">
            <div className="container">
                <Coupon/>
                <div className="checkout__form">
                    <h4>Thông tin thanh toán</h4>
                    <form action="#">
                        <div className="row">
                            <PayForm/>
                            <Bill/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </div>
    )
}
export default Checkout;
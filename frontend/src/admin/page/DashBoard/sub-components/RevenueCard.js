export default function RevenueCard() {
  return (
    <div className="card">
        <div className="card-header">
            <h5>Thống kê doanh thu của cửa hàng</h5>
        </div>
        <div className="card-body">
            <div className="card-body">
                <div className="row pb-2">
                    <div className="col-auto m-b-10">
                        <h3 className="mb-1">724.000.000đ</h3>
                        <span>Tổng doanh thu</span>
                    </div>
                    <div className="col-auto m-b-10">
                        <h3 className="mb-1">315.000.000đ</h3>
                        <span>Trung bình</span>
                    </div>
                </div>
                <div id="account-chart"></div>
            </div>
        </div>
    </div>
  );
}
export default function StatsCards() {
  return (
    <div className="card flat-card">
        <div className="row">
            <div className="col-md-6">
                <div className="card support-bar overflow-hidden">
                    <div className="card-body pb-0">
                        <h2 className="m-0">75.38%</h2>
                        <span className="text-primary">Đơn hàng hoàn tất</span>
                        <p className="mb-3 mt-3">Số lượng đơn hàng đã vận chuyển thành công trong
                            tháng </p>
                    </div>
                    <div id="support-chart"></div>
                    <div
                        className="card-footer border-0 bg-primary text-white background-pattern-white">
                        <div className="row text-center">
                            <div className="col">
                                <h4 className="m-0 text-white">20</h4>
                                <span>08/2021</span>
                            </div>
                            <div className="col">
                                <h4 className="m-0 text-white">15</h4>
                                <span>09/2021</span>
                            </div>
                            <div className="col">
                                <h4 className="m-0 text-white">19</h4>
                                <span>10/2021</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card support-bar overflow-hidden">
                    <div className="card-body pb-0">
                        <h2 className="m-0">112</h2>
                        <span className="text-primary">Đơn hàng đã vận chuyển</span>
                        <p className="mb-3 mt-3">Tổng số lượng đơn hàng đã vận chuyển trong
                            tháng</p>
                    </div>
                    <div className="card-footer border-0">
                        <div className="row text-center">
                            <div className="col">
                                <h4 className="m-0">35</h4>
                                <span>8/2021</span>
                            </div>
                            <div className="col">
                                <h4 className="m-0">47</h4>
                                <span>9/2021</span>
                            </div>
                            <div className="col">
                                <h4 className="m-0">30</h4>
                                <span>10/2021</span>
                            </div>
                        </div>
                    </div>
                    <div id="support-chart1"></div>
                </div>
            </div>
        </div>  
    </div>
  );
}
export default function Notification() {
  return (
    <div className="card feed-card">
        <div className="card-header">
            <h5>Thông báo</h5>
        </div>
        <div className="feed-scroll ps" style={{height: '385px', position: 'relative'}}>
            <div className="card-body">
                <div className="row m-b-25 align-items-center">
                    <div className="col-auto p-r-0">
                        <i className="fa-solid fa-cart-shopping bg-light-primary feed-icon p-2 wid-30 hei-30"></i>
                    </div>
                    <div className="col">
                        <a href="#!">
                            <h6 className="m-b-5">Bạn có 5 order mới<span
                                className="text-muted float-right f-14">Vừa xong</span></h6>
                        </a>
                    </div>
                </div>
                <div className="row m-b-25 align-items-center">
                    <div className="col-auto p-r-0">
                        <i data-feather="shopping-cart"
                            className="bg-light-danger feed-icon p-2 wid-30 hei-30"></i>
                    </div>
                    <div className="col">
                        <a href="#!">
                            <h6 className="m-b-5">Đã nhận 3 order <span
                                className="text-muted float-right f-14">30 phút trước</span>
                            </h6>
                        </a>
                    </div>
                </div>
                <div className="row m-b-25 align-items-center">
                    <div className="col-auto p-r-0">
                        <i data-feather="file-text"
                            className="bg-light-success feed-icon p-2 wid-30 hei-30"></i>
                    </div>
                    <div className="col">
                        <a href="#!">
                            <h6 className="m-b-5">Bạn có 3 công việc mới <span
                                className="text-muted float-right f-14">Vừa xong</span></h6>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
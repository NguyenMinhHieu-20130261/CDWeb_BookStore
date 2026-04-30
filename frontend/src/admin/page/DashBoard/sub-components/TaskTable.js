export default function TaskTable() {
  return (
    <div className="card table-card">
      <div className="card-header">
        <h5>Trạng thái công việc</h5>
      </div>
      <div className="pro-scroll" style={{height: "255px", position: "relative"}}>
        <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover m-b-0">
                    <thead>
                    <tr>
                        <th>Tên công việc</th>
                        <th>Số lượng</th>
                        <th>Trạng thái</th>
                        <th>Chỉnh sửa</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Nhập 10 chó Husky</td>
                        <td style={{textAlign: "center"}}>1</td>
                        <td>
                            <div><label className="badge bg-light-warning">Đang thực
                                hiện</label></div>
                        </td>
                        <td style={{textAlign: "center"}}><a href="#!"><i
                            className="icon feather icon-edit f-16  text-success"></i></a><a
                            href="#!"><i
                            className="feather icon-trash-2 ml-3 f-16 text-danger"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>Nhập 40 áo len cún</td>
                        <td style={{textAlign: "center"}}>2</td>
                        <td>
                            <div><label className="badge bg-light-danger">Đã hủy</label>
                            </div>
                        </td>
                        <td style={{textAlign: "center"}}><a href="#!"><i
                            className="icon feather icon-edit f-16  text-success"></i></a><a
                            href="#!"><i
                            className="feather icon-trash-2 ml-3 f-16 text-danger"></i></a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>
  );
}
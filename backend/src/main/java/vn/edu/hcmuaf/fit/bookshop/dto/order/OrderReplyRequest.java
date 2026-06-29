package vn.edu.hcmuaf.fit.bookshop.dto.order;

import lombok.*;

@Getter
@Setter
public class OrderReplyRequest {
    private Integer statusId;
    private String shopReply;
}
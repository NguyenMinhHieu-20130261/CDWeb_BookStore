package vn.edu.hcmuaf.fit.bookshop.dto.order;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderRequest {
    private Integer userId;
    private String fullName;
    private String phoneNumber;
    private String detailAdrs;
    private String provinceCity;
    private String countyDistrict;
    private String wardCommune;
    private String wardCode;
    private Integer districtId;
    private String note;
    private String paymentMethod;
    private Integer promotionId;
}

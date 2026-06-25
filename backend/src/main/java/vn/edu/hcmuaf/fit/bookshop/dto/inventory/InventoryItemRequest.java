package vn.edu.hcmuaf.fit.bookshop.dto.inventory;

import lombok.Data;

@Data
public class InventoryItemRequest {
    private Integer productId;
    private Integer importPrice;
    private Integer salePrice;
    private Integer quantity;
    private String note;
}

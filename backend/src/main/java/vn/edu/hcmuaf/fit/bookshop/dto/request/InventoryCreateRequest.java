package vn.edu.hcmuaf.fit.bookshop.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class InventoryCreateRequest {
    private Integer supplierId;
    private List<InventoryItemRequest> inventoryRequest;
}
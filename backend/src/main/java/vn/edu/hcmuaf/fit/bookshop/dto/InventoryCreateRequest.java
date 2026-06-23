package vn.edu.hcmuaf.fit.bookshop.dto;

import lombok.Data;
import java.util.List;

@Data
public class InventoryCreateRequest {
    private List<InventoryItemRequest> inventoryRequest;
}
package vn.edu.hcmuaf.fit.bookshop.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class InventoryCreateRequest {
    private List<InventoryItemRequest> inventoryRequest;
}
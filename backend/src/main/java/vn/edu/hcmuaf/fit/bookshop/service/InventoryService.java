package vn.edu.hcmuaf.fit.bookshop.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import vn.edu.hcmuaf.fit.bookshop.dto.request.InventoryCreateRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.Inventory;

import java.util.List;

public interface InventoryService {
    Page<Inventory> getAll(String q, Boolean active, Pageable pageable);
    List<Inventory> createInventory(InventoryCreateRequest request);
    Inventory getById(Integer id);
    Inventory updateInventory(Integer id, Inventory request);
}
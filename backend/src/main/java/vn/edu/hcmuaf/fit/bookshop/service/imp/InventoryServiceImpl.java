package vn.edu.hcmuaf.fit.bookshop.service.imp;

import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.dto.request.InventoryCreateRequest;
import vn.edu.hcmuaf.fit.bookshop.dto.request.InventoryItemRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.Inventory;
import vn.edu.hcmuaf.fit.bookshop.entity.Product;
import vn.edu.hcmuaf.fit.bookshop.repository.InventoryRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.ProductRepo;
import vn.edu.hcmuaf.fit.bookshop.service.InventoryService;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepo inventoryRepo;

    @Autowired
    private ProductRepo productRepo;

    @Override
    public Page<Inventory> getAll(String q, Boolean active, Pageable pageable) {
        Specification<Inventory> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (q != null && !q.trim().isEmpty()) {
                predicates.add(
                        cb.like(
                                cb.lower(root.get("product").get("title")),
                                "%" + q.toLowerCase().trim() + "%"
                        )
                );
            }

            if (active != null) {
                predicates.add(cb.equal(root.get("active"), active));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return inventoryRepo.findAll(spec, pageable);
    }

    @Override
    public List<Inventory> createInventory(InventoryCreateRequest request) {
        if (request.getInventoryRequest() == null || request.getInventoryRequest().isEmpty()) {
            throw new RuntimeException("Danh sách nhập kho không được rỗng");
        }

        List<Inventory> result = new ArrayList<>();
        Date now = new Date();

        for (InventoryItemRequest item : request.getInventoryRequest()) {
            Product product = productRepo.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID: " + item.getProductId()));
            if (item.getQuantity() == null || item.getQuantity() <= 0) {
                throw new RuntimeException("Số lượng phải lớn hơn 0");
            }
            if (item.getImportPrice() == null || item.getImportPrice() < 1000) {
                throw new RuntimeException("Giá nhập không hợp lệ");
            }
            if (item.getSalePrice() == null || item.getSalePrice() < item.getImportPrice()) {
                throw new RuntimeException("Giá bán không được nhỏ hơn giá nhập");
            }
            Inventory inventory = new Inventory();

            inventory.setBatchCode(generateBatchCode());
            inventory.setProduct(product);
            inventory.setImportedQuantity(item.getQuantity());
            inventory.setRemainingQuantity(item.getQuantity());
            inventory.setImportPrice(item.getImportPrice());
            inventory.setSalePrice(item.getSalePrice());
            inventory.setImportedAt(now);
            inventory.setCreatedAt(now);
            inventory.setUpdatedAt(now);
            inventory.setActive(true);
            inventory.setNote(item.getNote());
            result.add(inventoryRepo.save(inventory));
        }
        return result;
    }
    private String generateBatchCode() {
        String date = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
        return "INV-" + date;
    }

    @Override
    public Inventory getById(Integer id) {
        return inventoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lô hàng ID: " + id));
    }

    @Override
    public Inventory updateInventory(Integer id, Inventory request) {
        Inventory inventory = inventoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lô hàng ID: " + id));

        inventory.setActive(request.getActive());
        inventory.setNote(request.getNote());
        inventory.setUpdatedAt(new Date());

        return inventoryRepo.save(inventory);
    }
}
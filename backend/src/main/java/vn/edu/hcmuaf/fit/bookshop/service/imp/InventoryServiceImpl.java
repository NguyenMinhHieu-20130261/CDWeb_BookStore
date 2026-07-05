package vn.edu.hcmuaf.fit.bookshop.service.imp;

import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.dto.inventory.InventoryCreateRequest;
import vn.edu.hcmuaf.fit.bookshop.dto.inventory.InventoryItemRequest;
import vn.edu.hcmuaf.fit.bookshop.entity.Inventory;
import vn.edu.hcmuaf.fit.bookshop.entity.Product;
import vn.edu.hcmuaf.fit.bookshop.repository.InventoryRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.ProductRepo;
import vn.edu.hcmuaf.fit.bookshop.service.InventoryService;
import vn.edu.hcmuaf.fit.bookshop.service.SystemLogService;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepo inventoryRepo;

    @Autowired
    private ProductRepo productRepo;
    
    @Autowired
    private SystemLogService systemLogService;

    @Override
    public Page<Inventory> getAll(String q, Boolean active, Pageable pageable,String stockStatus) {
        log.debug(
            "Lấy danh sách lô hàng: q={}, active={}, stockStatus={}",
            q,
            active,
            stockStatus
        );
        Specification<Inventory> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (q != null && !q.trim().isEmpty()) {
                String keyword = "%" + q.trim().toLowerCase() + "%";
                var productJoin = root.join("product");
                predicates.add(
                    cb.or(
                        cb.like(cb.lower(root.get("batchCode")), keyword),
                        cb.like(cb.lower(productJoin.get("title")), keyword)
                    )
                );
            }
            if(stockStatus != null){
                switch(stockStatus){
                    case "OUT_OF_STOCK":
                        predicates.add(
                            cb.equal( root.get("remainingQuantity"),0 )
                        );
                    break;

                    case "LOW_STOCK":
                        predicates.add(
                            cb.and(
                                cb.equal( root.get("active"), true ),
                                cb.gt( root.get("remainingQuantity"), 0),
                                cb.lessThanOrEqualTo(
                                    root.get("remainingQuantity").as(Integer.class),
                                    cb.quot(
                                        root.get("importedQuantity")
                                            .as(Integer.class),
                                        5
                                    )
                                    .as(Integer.class)
                                )
                            )
                        );
                    break;

                    case "DISABLED":
                        predicates.add(
                            cb.equal( root.get("active"),false )
                        );
                    break;
        
                    case "ACTIVE":
                        predicates.add(
                            cb.and(
                                cb.equal( root.get("active"),true),
                                cb.gt( root.get("remainingQuantity"),0),
                                cb.greaterThan(
                                    root.get("remainingQuantity")
                                        .as(Integer.class),
                                    cb.quot(
                                        root.get("importedQuantity")
                                            .as(Integer.class),
                                        5
                                    )
                                    .as(Integer.class)
                                )
                            )
                        );
                    break;
                }
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
        log.info("Bắt đầu nhập kho");
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
            log.info(
                "Nhập kho sản phẩm id={}, title={}, quantity={}, importPrice={}, salePrice={}",
                product.getId(),
                product.getTitle(),
                item.getQuantity(),
                item.getImportPrice(),
                item.getSalePrice()
            );
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
            Inventory saved = inventoryRepo.save(inventory);

            log.info(
                "Tạo lô hàng thành công: id={}, batchCode={}",
                saved.getId(),
                saved.getBatchCode()
            );
            result.add(saved);
        }
        log.info("Nhập kho hoàn tất, tổng số lô={}", result.size());
        systemLogService.saveLog(
            "CREATE_INVENTORY",
            "INFO",
            "ADMIN tạo lô hàng có = "+ result,
            null,
            "ADMIN"
        );
        return result;
    }
    private String generateBatchCode() {
        String date = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
        return "INV-" + date;
    }

    @Override
    public Inventory getById(Integer id) {
        log.debug("Lấy lô hàng id={}", id);
        return inventoryRepo.findById(id)
                .orElseThrow(() -> {
                    log.warn("Không tìm thấy lô hàng id={}", id);
                    return new RuntimeException("Không tìm thấy lô hàng ID: " + id);
                });
    }

    @Override
    public Inventory updateInventory(Integer id, Inventory request) {
        log.info("Cập nhật lô hàng id={}", id);
        Inventory inventory = inventoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lô hàng ID: " + id));

        inventory.setActive(request.getActive());
        inventory.setNote(request.getNote());
        inventory.setUpdatedAt(new Date());
        Inventory saved = inventoryRepo.save(inventory);
        log.info("Cập nhật lô hàng thành công id={}", saved.getId());
        systemLogService.saveLog(
            "UPDATE_INVENTORY",
            "INFO",
            "ADMIN cập nhật lô hàng có id = " + saved.getId(),
            null,
            "ADMIN"
        );
        return saved;
    }
}
package vn.edu.hcmuaf.fit.bookshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import vn.edu.hcmuaf.fit.bookshop.entity.Inventory;

public interface InventoryRepo extends JpaRepository<Inventory, Integer>, JpaSpecificationExecutor<Inventory> {
    List<Inventory> findByProductIdAndActiveTrueOrderByImportedAtAsc(Integer productId);

    List<Inventory> findByProductIdAndActiveTrueOrderByImportedAtDesc(Integer productId);
}
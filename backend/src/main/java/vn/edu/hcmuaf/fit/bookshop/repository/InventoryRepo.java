package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import vn.edu.hcmuaf.fit.bookshop.entity.Inventory;

public interface InventoryRepo extends JpaRepository<Inventory, Integer>, JpaSpecificationExecutor<Inventory> {
}
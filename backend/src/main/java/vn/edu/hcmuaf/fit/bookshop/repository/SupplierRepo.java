package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.fit.bookshop.entity.Supplier;

public interface SupplierRepo extends JpaRepository<Supplier, Integer> {
}
package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.edu.hcmuaf.fit.bookshop.entity.EnumRole;
import vn.edu.hcmuaf.fit.bookshop.entity.Role;
import java.util.Optional;

public interface RoleRepo extends JpaRepository<Role, Integer> {
    Optional<Role> findByDescription(EnumRole description);
}
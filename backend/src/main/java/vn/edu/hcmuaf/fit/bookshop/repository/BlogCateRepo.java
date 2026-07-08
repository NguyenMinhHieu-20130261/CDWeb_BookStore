package vn.edu.hcmuaf.fit.bookshop.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.fit.bookshop.entity.BlogCategory;

public interface BlogCateRepo extends JpaRepository<BlogCategory, Integer> {
     Optional<BlogCategory> findByName(String name);
     List<BlogCategory> findByActiveTrue();
}

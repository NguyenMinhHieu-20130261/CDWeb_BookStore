package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;
import vn.edu.hcmuaf.fit.bookshop.entity.Category;
// Repository interface cho Category, kế thừa JpaRepository để có các phương thức CRUD cơ bản và JpaSpecificationExecutor để hỗ trợ tìm kiếm nâng cao
public interface CategoryRepo extends JpaRepository<Category, Integer>,JpaSpecificationExecutor<Category>  {
    Optional<Category> findByName(String name);
    // Phương thức để tìm các danh mục con dựa trên ID của danh mục cha
    List<Category> findByParentCategory_Id(Integer parentId);
    // Phương thức để tìm các danh mục chính (không có danh mục cha)
    List<Category> findByParentCategoryIsNull();

}

package vn.edu.hcmuaf.fit.bookshop.service.imp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.bookshop.entity.Category;
import vn.edu.hcmuaf.fit.bookshop.entity.Product;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
// import vn.edu.hcmuaf.fit.bookshop.repository.ProductImageRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.ProductRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;
import vn.edu.hcmuaf.fit.bookshop.service.CategoryService;
import vn.edu.hcmuaf.fit.bookshop.service.ProductService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final CategoryService categoryService;
    private final UserRepo userRepo;
    // @Autowired
    // private ProductImageRepo productImageRepo;

    @Override
    public List<Product> getActiveProducts() {
        return productRepo.findByActiveTrue();
    }
    @Override
    public List<Product> getProductsByCategory(Integer categoryId) {
        return productRepo.findByCategoryIdAndActiveTrue(categoryId);
    }
    @Override
    public Product findBySlugAndActiveTrue(String slug) {
        return productRepo.findBySlugAndActiveTrue(slug)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
    }
    @Override
    public List<Product> getProductsByCategoryTree(Integer categoryId) {
        List<Integer> categoryIds = new ArrayList<>();

        categoryIds.add(categoryId);
        List<Category> subCategories = categoryService.getSubCategories(categoryId);
        for (Category subCategory : subCategories) {
            categoryIds.add(subCategory.getId());
        }
        return productRepo.findByCategoryIdInAndActiveTrue(categoryIds);
    }
    @Override
    public List<Product> getThreeLatestProductByCategoryTree(Integer categoryId) {
        //
        List<Integer> categoryIds = new ArrayList<>();
        categoryIds.add(categoryId);
        //
        List<Category> subCategories = categoryService.getSubCategories(categoryId);
        for (Category subCategory : subCategories) {
            categoryIds.add(subCategory.getId());
        }
        return productRepo.findTop3ByCategoryIdInAndActiveTrueOrderByIdDesc(categoryIds);
    }

    @Override
    public Product getTopRatedProduct() {
        return productRepo.findTopRatedProduct().orElse(null);
    }

    @Override
    public List<Product> getTop2MostReviewedProducts() {
        return productRepo.findTop2MostReviewedProducts();
    }
    private String toSlug(String input) {
        String slug = java.text.Normalizer.normalize(input, java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .toLowerCase()
                .replaceAll("đ", "d")
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");

        return slug;
    }
    //Admin
    @Override
    public Product getProductById(Integer id) {
        log.debug("Lấy sản phẩm id={}",id);
        return productRepo.findById(id)
            .orElseThrow(() -> {
                log.warn("Không tìm thấy sản phẩm id={}",id);
                return new RuntimeException("Không tìm thấy sản phẩm");
            });
    }
    @Override
    public Product updateProduct(Integer id, Product product) {
        log.info("Cập nhật sản phẩm id={}",id);
        Product newProduct  = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
        newProduct .setCategory(product.getCategory());
        newProduct .setTitle(product.getTitle());
        newProduct .setSlug(toSlug(product.getTitle()));
        newProduct .setOldPrice(product.getOldPrice());
        newProduct .setCurrentPrice(product.getCurrentPrice());
        newProduct .setActive(product.isActive());
        if (product.getDetail() != null) {
            if (newProduct .getDetail() == null) {
                newProduct .setDetail(product.getDetail());
            } else {
                newProduct .getDetail().setSupplier(product.getDetail().getSupplier());
                newProduct .getDetail().setPublisher(product.getDetail().getPublisher());
                newProduct .getDetail().setPublishYear(product.getDetail().getPublishYear());
                newProduct .getDetail().setAuthor(product.getDetail().getAuthor());
                newProduct .getDetail().setBrand(product.getDetail().getBrand());
                newProduct .getDetail().setOrigin(product.getDetail().getOrigin());
                newProduct .getDetail().setColor(product.getDetail().getColor());
                newProduct .getDetail().setWeight(product.getDetail().getWeight());
                newProduct .getDetail().setSize(product.getDetail().getSize());
                newProduct .getDetail().setQuantityOfPage(product.getDetail().getQuantityOfPage());
                newProduct .getDetail().setDescription(product.getDetail().getDescription());
            }
        }
        Product saved = productRepo.save(newProduct);

        log.info("Sản phẩm {} đã được cập nhật", saved.getId() );
        return saved;
    }
    @Override
    public Product createProduct(Product product, User admin) {
        log.info(
            "Admin {} tạo sản phẩm '{}'",
            admin.getUsername(),
            product.getTitle()
        );
        product.setSlug(
            toSlug(product.getTitle()) 
            + "-" 
            + System.currentTimeMillis()
        );
        product.setCreatedBy(admin);
        product.setUpdatedBy(admin);

        product.setCreatedAt(new Date());
        product.setUpdatedAt(new Date());

        if(product.getDetail() != null){
            product.getDetail().setProduct(product);
        }
        if(product.getImages() != null){
            product.getImages().forEach(img -> {
                img.setProduct(product);
            });
        }
        product.setActive(true);
        Product saved = productRepo.save(product);

        log.info(
            "Tạo sản phẩm thành công: id={}, slug={}",
            saved.getId(),
            saved.getSlug()
        );
        return saved;
    }
    @Override
    public Product deleteProduct(Integer id, User admin) {
        log.warn("Admin {} xóa sản phẩm {}", admin.getUsername(),id);
        Product product = productRepo.findById(id)
                .orElseThrow(() ->new RuntimeException("Không tìm thấy sản phẩm"));
        product.setActive(false);
        product.setUpdatedBy(admin);
        product.setUpdatedAt(new Date());
        Product saved = productRepo.save(product);

        log.info("Đã chuyển sản phẩm {} sang inactive",saved.getId());
        return saved;
    }
    @Override
    public Page<Product> getProducts(int page, int size, String sort, String filter, String order) {
        log.debug("Admin lấy danh sách sản phẩm: page={}, size={}, filter={}",
            page, size, filter
        );
        Sort.Direction direction = order.equalsIgnoreCase("DESC")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(direction, sort)
        );
        String q = "";
        Boolean active = null;
        if (filter != null && !filter.isBlank()) {
            if (filter.contains("\"q\"")) {
                q = filter.replaceAll(".*\"q\":\"", "")
                        .replaceAll("\".*", "");
            }
            if (filter.contains("\"active\":true")) {
                active = true;
            } else if (filter.contains("\"active\":false")) {
                active = false;
            }
        }
        if (!q.isBlank() && active != null) {
            return productRepo.findByTitleContainingIgnoreCaseAndActive(q, active, pageable);
        }
        if (!q.isBlank()) {
            return productRepo.findByTitleContainingIgnoreCase(q, pageable);
        }
        if (active != null) {
            return productRepo.findByActive(active, pageable);
        }
        return productRepo.findAll(pageable);
    }
}
package vn.edu.hcmuaf.fit.bookshop.service.imp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
        return productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
    }
    @Override
    public Product updateProduct(Integer id, Product product) {
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
        return productRepo.save(newProduct );
    }
    @Override
    public Product createProduct(Product product, User admin) {
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

        return productRepo.save(product);
    }
}
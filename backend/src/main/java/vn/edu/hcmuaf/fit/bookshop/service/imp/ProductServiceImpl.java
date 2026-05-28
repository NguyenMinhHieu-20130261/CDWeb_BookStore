package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.entity.Category;
import vn.edu.hcmuaf.fit.bookshop.entity.Product;
import vn.edu.hcmuaf.fit.bookshop.repository.ProductImageRepo;
import vn.edu.hcmuaf.fit.bookshop.repository.ProductRepo;
import vn.edu.hcmuaf.fit.bookshop.service.CategoryService;
import vn.edu.hcmuaf.fit.bookshop.service.ProductService;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final CategoryService categoryService;
    @Autowired
    private ProductImageRepo productImageRepository;

    @Autowired
    private ProductDetailRepo productDetailRepository;

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
}
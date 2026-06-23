package vn.edu.hcmuaf.fit.bookshop.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.bookshop.entity.BlogCategory;
import vn.edu.hcmuaf.fit.bookshop.repository.BlogCateRepo;
import vn.edu.hcmuaf.fit.bookshop.service.BlogCateService;

import java.util.List;
import java.util.Optional;

@Service
public class BlogCateServiceImpl implements BlogCateService {
    @Autowired
    private BlogCateRepo blogCateRepo;

    @Override
    public List<BlogCategory> getAllBlogCate() {
        return blogCateRepo.findAll();
    }

    @Override
    public Page<BlogCategory> getAllBlogCate(int page, int perPage, String sort, String filter, String order) {

        Sort.Direction direction = order.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, perPage, Sort.by(direction, sort));
        return blogCateRepo.findAll(pageable);
    }
    @Override
    public Optional<BlogCategory> getBlogCateById(Integer id) {
        return blogCateRepo.findById(id);
    }
    @Override
    public BlogCategory createBlogCate(BlogCategory blogCategory) {
        return blogCateRepo.save(blogCategory);
    }

    @Override
    public BlogCategory updateBlogCate(Integer id, BlogCategory blogCategory) {
        BlogCategory old = blogCateRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục blog"));

        old.setName(blogCategory.getName());
        old.setActive(blogCategory.isActive());

        return blogCateRepo.save(old);
    }

    @Override
    public void deleteBlogCate(Integer id) {
        BlogCategory old = blogCateRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục blog"));

        blogCateRepo.delete(old);
    }
}

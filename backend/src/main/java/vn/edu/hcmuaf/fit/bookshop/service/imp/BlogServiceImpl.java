package vn.edu.hcmuaf.fit.bookshop.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.fit.bookshop.entity.Blog;
import vn.edu.hcmuaf.fit.bookshop.repository.BlogRepo;
import vn.edu.hcmuaf.fit.bookshop.service.BlogService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepo blogRepo;

    @Override
    public List<Blog> getActiveBlogs() {
        return blogRepo.findByStatusOrderByCreatedAtDesc(1);
    }
}
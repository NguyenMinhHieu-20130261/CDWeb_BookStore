package vn.edu.hcmuaf.fit.bookshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.edu.hcmuaf.fit.bookshop.entity.Banner;

public interface BannerRepo extends JpaRepository<Banner, Integer> {
    List<Banner> findByActiveTrueOrderByPositionAsc();
}
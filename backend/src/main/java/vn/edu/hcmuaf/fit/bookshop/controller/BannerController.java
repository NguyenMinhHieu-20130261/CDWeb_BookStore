package vn.edu.hcmuaf.fit.bookshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import vn.edu.hcmuaf.fit.bookshop.entity.Banner;
import vn.edu.hcmuaf.fit.bookshop.repository.BannerRepo;


@RestController
@RequestMapping("/api/banners")
public class BannerController {

    @Autowired
    private BannerRepo bannerRepo;

    @GetMapping("/active")
    public ResponseEntity<?> getActiveBanners() {
        return ResponseEntity.ok(
            bannerRepo.findByActiveTrueOrderByPositionAsc()
        );
    }

    @GetMapping
    public ResponseEntity<?> getAllBanners() {
        return ResponseEntity.ok(bannerRepo.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBannerById(@PathVariable Integer id) {
        return ResponseEntity.ok(
            bannerRepo.findById(id).orElseThrow()
        );
    }
}
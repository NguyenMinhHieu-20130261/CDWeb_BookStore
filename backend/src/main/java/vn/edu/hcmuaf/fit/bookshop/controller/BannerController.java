package vn.edu.hcmuaf.fit.bookshop.controller;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createBanner(@RequestBody Banner banner) {
        banner.setCreatedAt(new Date());
        banner.setUpdatedAt(new Date());
        return ResponseEntity.ok(bannerRepo.save(banner));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBanner(
            @PathVariable Integer id,
            @RequestBody Banner banner
    ) {
        Banner old = bannerRepo.findById(id).orElseThrow();

        old.setTitle(banner.getTitle());
        old.setSubtitle(banner.getSubtitle());
        old.setImage(banner.getImage());
        old.setLink(banner.getLink());
        old.setPosition(banner.getPosition());
        old.setActive(banner.getActive());
        old.setUpdatedAt(new Date());

        return ResponseEntity.ok(bannerRepo.save(old));
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteBanner(@PathVariable Integer id) {
        bannerRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
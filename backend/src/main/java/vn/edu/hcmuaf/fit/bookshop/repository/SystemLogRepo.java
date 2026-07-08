package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.edu.hcmuaf.fit.bookshop.entity.SystemLog;

public interface SystemLogRepo extends JpaRepository<SystemLog, Long> {
}

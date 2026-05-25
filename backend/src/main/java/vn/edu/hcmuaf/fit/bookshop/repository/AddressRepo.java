package vn.edu.hcmuaf.fit.bookshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.edu.hcmuaf.fit.bookshop.entity.Address;

public interface AddressRepo extends JpaRepository<Address, Integer> {

    List<Address> findByUserId(Integer userId);
}
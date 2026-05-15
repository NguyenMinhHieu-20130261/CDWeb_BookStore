package vn.edu.hcmuaf.fit.bookshop.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.entity.Address;
import vn.edu.hcmuaf.fit.bookshop.repository.AddressRepo;
import vn.edu.hcmuaf.fit.bookshop.service.AddressService;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepo addressRepo;

    @Override
    public List<Address> getUserAddresses(Integer userId) {
        return addressRepo.findByUserId(userId);
    }
}
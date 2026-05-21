package vn.edu.hcmuaf.fit.bookshop.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.entity.Address;
import vn.edu.hcmuaf.fit.bookshop.repository.AddressRepo;
import vn.edu.hcmuaf.fit.bookshop.service.AddressService;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public List<Address> getUserAddresses(Integer userId) {
        return addressRepo.findByUserId(userId);
    }
    @Override
    public Address saveAddress(Address address) {
        Integer userId = address.getUser().getId();
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));
        address.setUser(user);
        return addressRepo.save(address);
    }
}
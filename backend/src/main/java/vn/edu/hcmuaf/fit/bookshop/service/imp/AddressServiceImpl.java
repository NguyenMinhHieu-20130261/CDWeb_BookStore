package vn.edu.hcmuaf.fit.bookshop.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.entity.Address;
import vn.edu.hcmuaf.fit.bookshop.repository.AddressRepo;
import vn.edu.hcmuaf.fit.bookshop.service.AddressService;
import vn.edu.hcmuaf.fit.bookshop.service.ValidationService;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ValidationService validationService;

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
    @Override
    public void deleteAddress(Integer addressId, Integer userId) {
        Address address = addressRepo.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy địa chỉ"));
        if (!address.getUser().getId().equals(userId)) {
            throw new RuntimeException("Bạn không có quyền xóa địa chỉ này");
        }
        addressRepo.delete(address);
    }
    @Override
    public Address getAddressById(Integer addressId) {
        return addressRepo.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy địa chỉ"));
    }
    @Override
    public Address updateAddress(Integer addressId, Address address) {

        Address existingAddress = getAddressById(addressId);

        existingAddress.setFullName(address.getFullName());
        existingAddress.setPhoneNumber(address.getPhoneNumber());
        existingAddress.setDetailAdrs(address.getDetailAdrs());

        existingAddress.setProvinceCity(address.getProvinceCity());
        existingAddress.setCountyDistrict(address.getCountyDistrict());
        existingAddress.setWardCommune(address.getWardCommune());

        existingAddress.setDistrictId(address.getDistrictId());
        existingAddress.setWardCode(address.getWardCode());

        existingAddress.setIsDefault(address.getIsDefault());

        return addressRepo.save(existingAddress);
    }
    @Override
    public void setDefaultAddress(java.lang.Integer addressId) {
        Address defaultAdrs = addressRepo.findById(addressId)
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy địa chỉ"));
        Integer userId = defaultAdrs.getUser().getId();

        List<Address> userAddresses = addressRepo.findByUserId(userId);
        for (Address address : userAddresses) {
            address.setIsDefault(false);
        }
        defaultAdrs.setIsDefault(true);
        addressRepo.saveAll(userAddresses);
        addressRepo.save(defaultAdrs);
    }
    //admin
    @Override
    public Page<Address> getAllAddresses(int page, int perPage) {
        return addressRepo.findAll(PageRequest.of(page, perPage));
    }
    @Override
    public void adminDeleteAddress(Integer addressId) {
        Address address = addressRepo.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy địa chỉ"));

        addressRepo.delete(address);
    }
}
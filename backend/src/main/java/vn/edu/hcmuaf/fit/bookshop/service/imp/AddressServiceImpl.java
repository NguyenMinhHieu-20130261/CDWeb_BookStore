package vn.edu.hcmuaf.fit.bookshop.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import vn.edu.hcmuaf.fit.bookshop.entity.Address;
import vn.edu.hcmuaf.fit.bookshop.repository.AddressRepo;
import vn.edu.hcmuaf.fit.bookshop.service.AddressService;
import vn.edu.hcmuaf.fit.bookshop.service.SystemLogService;
import vn.edu.hcmuaf.fit.bookshop.service.ValidationService;
import vn.edu.hcmuaf.fit.bookshop.entity.User;
import vn.edu.hcmuaf.fit.bookshop.repository.UserRepo;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ValidationService validationService;
    
    @Autowired
    private SystemLogService systemLogService;

    @Override
    public List<Address> getUserAddresses(Integer userId) {
        log.debug("Lấy danh sách địa chỉ của userId={}", userId);
        return addressRepo.findByUserId(userId);
    }

    //Validate
    private void validateAddress(Address address) {
        validationService.validateFullName(address.getFullName());
        validationService.validatePhone(address.getPhoneNumber());
        validationService.validateAddress(address.getDetailAdrs());
        validationService.validateAddress(address.getProvinceCity());
        validationService.validateAddress(address.getCountyDistrict());
        validationService.validateAddress(address.getWardCommune());
    }
    //userfunc
    @Override
    public Address saveAddress(Address address) {
        log.info("User {} thêm địa chỉ mới", address.getUser().getId());

        validateAddress(address);
        Integer userId = address.getUser().getId();
        User user = userRepo.findById(userId)
                .orElseThrow(() -> {
                    log.warn("Không tìm thấy user id={}", userId);
                    return new RuntimeException("Không tìm thấy user");
                });
        address.setUser(user);
        Address saved = addressRepo.save(address);

        log.info("Thêm địa chỉ thành công: addressId={}, userId={}", saved.getId(), userId);
        return saved;
    }
    @Override
    public void deleteAddress(Integer addressId, Integer userId) {
        log.warn("User {} yêu cầu xóa địa chỉ {}", userId, addressId);
        Address address = addressRepo.findById(addressId)
            .orElseThrow(() -> {
                log.warn("Không tìm thấy địa chỉ id={}", addressId);
                return new RuntimeException("Không tìm thấy địa chỉ");
            });
        if (!address.getUser().getId().equals(userId)) {
            log.warn("User {} không có quyền xóa địa chỉ {}", userId, addressId);
            throw new RuntimeException("Bạn không có quyền xóa địa chỉ này");
        }
        addressRepo.delete(address);
        log.info("Đã xóa địa chỉ id={} của userId={}", addressId, userId);
        systemLogService.saveLog(
            "DELETE_USER_ADDRESS",
            "INFO",
            "User xóa địa chỉ có id = "+ address.getId(),
            null,
            "User"
        );
    }

    @Override
    public Address getAddressById(Integer addressId) {
        log.debug("Lấy địa chỉ id={}", addressId);
        return addressRepo.findById(addressId)
            .orElseThrow(() -> {
                log.warn("Không tìm thấy địa chỉ id={}", addressId);
                return new RuntimeException("Không tìm thấy địa chỉ");
            });
    }

    @Override
    public Address updateAddress(Integer addressId, Address address) {
        log.info("Cập nhật địa chỉ id={}", addressId);
        validateAddress(address);

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
        Address saved = addressRepo.save(existingAddress);

        log.info("Cập nhật địa chỉ thành công id={}", saved.getId());
        systemLogService.saveLog(
            "UPDATE_USER_ADDRESS",
            "INFO",
            "User cập nhật địa chỉ có id = "+ address.getId(),
            null,
            "User"
        );
        return saved;
    }
    @Override
    public void setDefaultAddress(java.lang.Integer addressId) {
        log.info("Đặt địa chỉ mặc định id={}", addressId);
        Address defaultAdrs = addressRepo.findById(addressId)
            .orElseThrow(() -> {
                log.warn("Không tìm thấy địa chỉ id={}", addressId);
                return new RuntimeException("Không tìm thấy địa chỉ");
            });
        Integer userId = defaultAdrs.getUser().getId();

        List<Address> userAddresses = addressRepo.findByUserId(userId);
        for (Address address : userAddresses) {
            address.setIsDefault(false);
        }
        defaultAdrs.setIsDefault(true);
        addressRepo.saveAll(userAddresses);
        addressRepo.save(defaultAdrs);

        log.info("User {} đã đặt địa chỉ {} làm mặc định", userId, addressId);
        systemLogService.saveLog(
            "DEFAULT_USER_ADDRESS",
            "INFO",
            "User cập nhật mặc định cho địa chỉ có id = "+ defaultAdrs.getId(),
            null,
            "User"
        );
    }
    //admin
    @Override
    public Page<Address> getAllAddresses(int page, int perPage) {
        return addressRepo.findAll(PageRequest.of(page, perPage));
    }
    @Override
    public void adminDeleteAddress(Integer addressId) {
        log.warn("Admin xóa địa chỉ id={}", addressId);
        Address address = addressRepo.findById(addressId)
                .orElseThrow(() -> {
                    log.warn("Không tìm thấy địa chỉ id={}", addressId);
                    return new RuntimeException("Không tìm thấy địa chỉ");
                });
        addressRepo.delete(address);
        systemLogService.saveLog(
            "DELETE_USER_ADDRESS",
            "INFO",
            "User xóa địa chỉ có id = "+ address.getId(),
            null,
            "User"
        );
        log.info("Admin đã xóa địa chỉ id={}", addressId);
    }
}
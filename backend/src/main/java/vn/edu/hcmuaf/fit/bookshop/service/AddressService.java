package vn.edu.hcmuaf.fit.bookshop.service;

import java.util.List;

import vn.edu.hcmuaf.fit.bookshop.entity.Address;

public interface AddressService {
    List<Address> getUserAddresses(Integer userId);
    Address saveAddress(Address address);
    Address getAddressById(Integer addressId);
    Address updateAddress(Integer addressId, Address address);
    void deleteAddress(Integer addressId);
} 

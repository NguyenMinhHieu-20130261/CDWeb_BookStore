package vn.edu.hcmuaf.fit.bookshop.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
public class ValidationService {

    private static final Pattern USERNAME =
            Pattern.compile("^[a-zA-Z0-9_]{4,30}$");

    private static final Pattern PHONE_VN =
            Pattern.compile("^0(3|5|7|8|9)[0-9]{8}$");

    private static final Pattern EMAIL =
            Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    private static final Pattern SLUG =
            Pattern.compile("^[a-z0-9]+(?:-[a-z0-9]+)*$");
    //từ xấu
    private static final List<String> BAD_WORDS = List.of(
            "null", 
            "undefined",
            "test", 
            "dm"
    );
    //tên
    private static final List<String> RESERVED_NAMES = List.of(
            "admin",
            "administrator",
            "root",
            "system",
            "support",
            "moderator"
    );
    // validate username
    public void validateUsername(String username){

        require(username,"Username không được trống");

        username=username.trim();

        if(!USERNAME.matcher(username).matches()){
            throw new RuntimeException(
                "Username không hợp lệ"
            );
        }

        checkReserved(username);
    }
    // validate full tên
    public void validateFullName(String fullName){

        require(fullName,"Họ tên không được trống");

        fullName=fullName.trim();

        if(fullName.length()<2 || fullName.length()>100){
            throw new RuntimeException(
                "Họ tên phải từ 2-100 ký tự"
            );
        }

        if(containsHtml(fullName)){
            throw new RuntimeException(
                "Họ tên không hợp lệ"
            );
        }
    }
    //validatephone
    public void validatePhone(String phone) {
        require(phone, "Số điện thoại không được để trống");

        if (!PHONE_VN.matcher(phone.trim()).matches()) {
            throw new RuntimeException("Số điện thoại không hợp lệ");
        }
    }
    //validate email
    public void validateEmail(String email) {
        require(email, "Email không được để trống");

        if (!EMAIL.matcher(email.trim()).matches()) {
            throw new RuntimeException("Email không hợp lệ");
        }
    }
    //vaidate địa chỉ
    public void validateAddress(String address) {
        require(address, "Địa chỉ không được để trống");

        address = address.trim();

        if (address.length() < 5 || address.length() > 255) {
            throw new RuntimeException("Địa chỉ phải từ 5-255 ký tự");
        }

        if (containsHtml(address)) {
            throw new RuntimeException("Địa chỉ không được chứa mã HTML/script");
        }
    }

    // public void validateSlug(String slug) {
    //     require(slug, "Slug không được để trống");

    //     if (!SLUG.matcher(slug.trim()).matches()) {
    //         throw new RuntimeException("Slug chỉ gồm chữ thường, số và dấu gạch ngang");
    //     }
    // }

    public void validateImageUrl(String url) {
        if (url == null || url.isBlank()) return;

        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            throw new RuntimeException("Link ảnh không hợp lệ");
        }

        if (containsHtml(url)) {
            throw new RuntimeException("Link ảnh không hợp lệ");
        }
    }

    private void require(String value, String message) {
        if (value == null || value.trim().isEmpty()) {
            throw new RuntimeException(message);
        }
    }
    //check từ xấu
    private void checkBadWords(String value, String message) {

        String lower = value.toLowerCase();

        for (String word : BAD_WORDS) {

            if (lower.equals(word)) {
                throw new RuntimeException(message);
            }
        }
    }
    //check tên 
    private void checkReserved(String value){

        String lower=value.toLowerCase();

        for(String word: RESERVED_NAMES){

            if(lower.equals(word)){
                throw new RuntimeException(
                    "Tên này không được sử dụng"
                );
            }
        }
    }
    //coi text có bao gồm html ko
    private boolean containsHtml(String value) {
        return value.contains("<") || value.contains(">") || value.toLowerCase().contains("script");
    }
}
const BAD_WORDS = [
    "admin",
    "administrator",
    "root",
    "system",
    "support",
    "moderator",
];

const isPhoneValid = (phone) => {
    return /^0(3|5|7|8|9)[0-9]{8}$/.test(phone);
};

const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const hasBadWord = (value) => {
    if (!value) return false;
    const text = value.toLowerCase();
    return BAD_WORDS.some(word => text.includes(word));
};

const hasHtml = (value) => {
    return /<[^>]*>/g.test(value);
};

const validatePhone = (phone) => {
    if (!phone?.trim()) return "Số điện thoại không được để trống";
    if (!isPhoneValid(phone)) return "Số điện thoại không hợp lệ";
    return "";
};

const validateEmail = (email) => {
    if (!email?.trim()) return "Email không được để trống";
    if (!isEmailValid(email)) return "Email không hợp lệ";
    return "";
};

const validateFullName = (name) => {
    if (!name?.trim()) return "Họ tên không được để trống";
    if (name.length < 2) return "Họ tên quá ngắn";
    if (name.length > 100) return "Họ tên quá dài";
    if (hasHtml(name)) return "Họ tên chứa ký tự không hợp lệ";
    if (hasBadWord(name)) return "Họ tên chứa từ không phù hợp";
    return "";
};

const validateAddress = (address) => {
    if (!address?.trim()) return "Địa chỉ không được để trống";
    if (address.length < 5) return "Địa chỉ quá ngắn";
    if (address.length > 255) return "Địa chỉ quá dài";
    if (hasHtml(address)) return "Địa chỉ chứa ký tự không hợp lệ";
    if (hasBadWord(address)) return "Địa chỉ chứa từ không phù hợp";
    return "";
};

const validateUsername = (username) => {
    if (!username?.trim()) return "Tên đăng nhập không được để trống";
    username = username.trim();

    if (username.length < 4) return "Tên đăng nhập phải ít nhất 4 ký tự";
    if (username.length > 30) return "Tên đăng nhập không được quá 30 ký tự";

    if (!/^[a-zA-Z0-9_]+$/.test(username))return "Tên đăng nhập chỉ chứa chữ, số và dấu _";
    if (hasHtml(username)) return "Tên đăng nhập chứa ký tự không hợp lệ";
    if (hasBadWord(username)) return "Tên đăng nhập không được sử dụng";
    return "";
};

const validatePassword = (password) => {

    if (!password)  return "Mật khẩu không được để trống";
    if (password.length < 8) return "Mật khẩu phải ít nhất 8 ký tự";
    if (password.length > 50) return "Mật khẩu quá dài";

    if (!/[A-Z]/.test(password)) return "Mật khẩu cần ít nhất 1 chữ hoa";
    if (!/[a-z]/.test(password))  return "Mật khẩu cần ít nhất 1 chữ thường";
    if (!/[0-9]/.test(password))  return "Mật khẩu cần ít nhất 1 chữ số";

    return "";
};

const ValidateService = {
    isPhoneValid,
    isEmailValid,

    validatePhone,
    validateEmail,
    validateFullName,
    validateAddress,

    validateUsername,
    validatePassword
};

export default ValidateService;
import { useState } from "react";

const PhoneValidService = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const isPhoneNumberValid = (number) => {
        return /^0(3|5|7|8|9)+([0-9]{8})\b/.test(number);
    };
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
        if (isPhoneNumberValid(value)) {
            setError('');
        }
    };
    const handleBlur = () => {
        if (
            phoneNumber !== '' &&
            !isPhoneNumberValid(phoneNumber)
        ) {
            setError('Số điện thoại không hợp lệ');
        } else {
            setError('');
        }
    };
    return {
        phoneNumber,
        setPhoneNumber,
        error,
        isPhoneNumberValid,
        handlePhoneNumberChange,
        handleBlur
    };
};

export default PhoneValidService;
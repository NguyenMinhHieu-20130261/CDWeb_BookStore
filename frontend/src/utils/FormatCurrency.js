const FormatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    return formatter.format(amount);
};

export default FormatCurrency;
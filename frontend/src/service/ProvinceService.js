const BASE_URL = "https://provinces.open-api.vn/api";

const ProvinceService = {
    // lấy tỉnh/thành
    getProvinces: async () => {
        const res = await fetch(
            `${BASE_URL}/p/`
        );

        return await res.json();
    },
    // lấy quận/huyện theo tỉnh
    getDistricts: async (provinceCode) => {
        const res = await fetch(
            `${BASE_URL}/p/${provinceCode}?depth=2`
        );
        const data = await res.json();
        return data.districts || [];
    },
    // lấy xã/phường theo huyện
    getWards: async (districtCode) => {
        const res = await fetch(
            `${BASE_URL}/d/${districtCode}?depth=2`
        );
        const data = await res.json();
        return data.wards || [];
    }
};

export default ProvinceService;
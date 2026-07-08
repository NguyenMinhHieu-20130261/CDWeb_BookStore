const IMGBB_KEY = "35adc62bfad0d01b4ea0eda4bad2b1b8";

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error("Không kết nối được ImgBB");
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.error?.message || "Upload thất bại");
    }

    return data.data.url;
};
// upload nhiều ảnh
export const uploadImages = async (files) => {
    if (!files) return [];
    return Promise.all(
        files.map(async (item) => {
            if (item.rawFile instanceof File) {
                const url = await uploadImage(
                    item.rawFile
                );
                return {
                    image: url
                };
            }
            return {
                image: item.image
            };
        })
    );
};
import React, {useEffect, useState} from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"

const ProductImagesSlider = ({images}) => {
    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
        if (images) {
            const updatedProductImages = images.map(url => ({
                original: url.image,
                thumbnail: url.image
            }));
            setProductImages(updatedProductImages);
        }
    }, [images]);
    return (
        <ImageGallery showPlayButton={false}
                      // autoPlay={true}
                      showNav={false}
                      items={productImages}/>
    );
}
export default ProductImagesSlider;
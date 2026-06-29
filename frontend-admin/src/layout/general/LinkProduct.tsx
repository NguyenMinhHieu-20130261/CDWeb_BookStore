import * as React from "react";
import { Link } from "react-router-dom";

type Props = {
    product?: {
        id?: number;
        title?: string;
    };
};

const LinkProduct = ({ product }: Props) => {

    if (!product?.id) {
        return <>Không có sản phẩm</>;
    }

    return (
        <Link
            to={`/products/${product.id}/show`}
            style={{
                textDecoration: "none",
                fontWeight: 600,
                color: "#1976d2",
            }}
        >
            {product.title}
        </Link>
    );
};

export default LinkProduct;
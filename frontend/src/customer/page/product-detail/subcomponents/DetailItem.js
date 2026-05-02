import React from "react";

const DetailItem = ({name, value})=>{
    return(
        <tr className="woocommerce-product-attributes-item woocommerce-product-attributes-item--attribute_pa_format">
            <th className="woocommerce-product-attributes-item__label px-4 px-xl-5">
                {name}
            </th>
            <td className="woocommerce-product-attributes-item__value">
                <p>{value}</p>
            </td>
        </tr>
    );
}
export default DetailItem;
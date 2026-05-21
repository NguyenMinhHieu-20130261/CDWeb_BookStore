import React from "react";

const AddressItem = ({ address }) => {

    return (
        <div className="address-item-container">
            <div className="address-item">

                {/* HEADER */}
                <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "4px" }}
                >

                    <div className="address-card_header">

                        <span className="name-span">
                            <div className="user-name">
                                {address.fullName}
                            </div>
                        </span>

                        <div className="separate"></div>

                        <div className="phone-number d-flex align-items-center">
                            {address.phoneNumber}
                        </div>

                    </div>

                </div>

                {/* CONTENT */}
                <div
                    className="address-card_content"
                    style={{ marginBottom: "4px" }}
                >

                    <div className="address-content">

                        <div>
                            {address.hnumSname}
                        </div>

                        <div>
                            {address.wardCommune},
                            {" "}
                            {address.countyDistrict},
                            {" "}
                            {address.provinceCity}
                        </div>

                    </div>

                </div>

                {/* DEFAULT BADGE */}
                {address.isDefault && (
                    <div className="d-flex align-items-center">
                        <span className="span-default">
                            Mặc định
                        </span>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AddressItem;
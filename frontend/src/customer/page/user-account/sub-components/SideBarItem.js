import React from "react";
import {Link, useLocation} from "react-router-dom";

const SideBarItem = ({to, iconClassName, itemName,badge}) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <li className={`left-side py-2 px-3 ${isActive ? 'active' : ''}`}>
            <div className="stardust-dropdown">
                <Link className="sidebar-item" to={to}>
                    <div className="sidebar-item-icon">
                        <i className={iconClassName}/>
                    </div>
                    <div
                        style={{
                            lineHeight: "1rem",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%"
                        }}
                    >
                        <span
                            className="item-name"
                            style={{ fontWeight: 500 }}
                        >
                            {itemName}
                        </span>

                        {badge > 0 && (
                            <span className="badge bg-danger">
                                {badge}
                            </span>
                        )}
                    </div>
                </Link>
            </div>
        </li>
    );
}
export default SideBarItem;

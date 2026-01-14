import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


const MoreToggleIcon = React.forwardRef(({ onClick }, ref) => {
    return (
        <Link
            to="#"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            style={{ cursor: "pointer", display: "inline-block" }}
            >
                <MoreOutlined />
        </Link>
    );
});


export default MoreToggleIcon;
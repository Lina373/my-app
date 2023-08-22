
import React from "react";
import { Navigate } from "react-router-dom";
import Register from "../Register";

const AdminPage = ({ userRole }) => {
    const role = userRole === "admin";
    if (!role) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <Register />
        </div>
    );
};

export default AdminPage;

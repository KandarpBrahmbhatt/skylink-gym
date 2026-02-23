// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//         return <Navigate to="/authentication/login/creative" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;



import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    // const token = localStorage.getItem("token");
    // const user = JSON.parse(localStorage.getItem("user"));

    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");// remember checked button mate
    const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));

    // Not logged in
    if (!token || !user) {
        return <Navigate to="/authentication/login/creative" replace />;
    }

    // Role check
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

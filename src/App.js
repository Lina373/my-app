//
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './Pages/Home';
// import TablePage from './Pages/TablePage';
// import Login from './Login';
// import Cookies from 'js-cookie';
// import AdminPage from "./Pages/AdminPage";
//
// const App = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));
//
//     useEffect(() => {
//         const token = Cookies.get('token');
//         setIsLoggedIn(!!token);
//     }, []);
//
//     const handleLogin = () => {
//         setIsLoggedIn(true);
//     };
//
//     const handleLogout = () => {
//         Cookies.remove('token');
//         setIsLoggedIn(false);
//     };
//
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
//                 <Route path="/table" element={<TablePage onLogout={handleLogout} />} />
//                 <Route
//                     path="/login"
//                     element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
//                 />
//                 <Route path="/admin">
//                     <Route path="/admin" element={<AdminPage onLogout={handleLogout} />} />
//                     {/*<Route path="/admin" element={<AdminPage />} />*/}
//                 </Route>
//             </Routes>
//         </Router>
//     );
// };
//
// export default App;
//
//
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import TablePage from './Pages/TablePage';
import Login from './Login';
import Cookies from 'js-cookie';
import AdminPage from "./Pages/AdminPage";
import Appbar from "./Appbar";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        setIsLoggedIn(!!token);

        if (token) {
            const tokenPayload = token.split(".")[1];
            const decodedToken = JSON.parse(atob(tokenPayload));
            console.log("Decoded Token:", decodedToken);
            setUserRole(decodedToken.role);
        } else {
            setUserRole(null);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            // Обработка изменения токена и роли при входе
            const token = Cookies.get('token');
            const tokenPayload = token.split(".")[1];
            const decodedToken = JSON.parse(atob(tokenPayload));
            setUserRole(decodedToken.role);
        } else {
            // Обработка изменения токена и роли при выходе
            setUserRole(null);
        }
    }, [isLoggedIn]);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        Cookies.remove('token');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            {isLoggedIn && <Appbar onLogout={handleLogout} userRole={userRole} />}
            <Routes>
                <Route path="/" element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
                <Route path="/table" element={<TablePage onLogout={handleLogout} />} />
                <Route
                    path="/login"
                    element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
                />
                <Route path="/admin">
                    <Route path="/admin" element={<AdminPage userRole={userRole} onLogout={handleLogout} />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;

//
//
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './Pages/Home';
// import TablePage from './Pages/TablePage';
// import Login from './Login';
// import Cookies from 'js-cookie';
// import AdminPage from "./Pages/AdminPage";
// import Appbar from './Appbar';
//
// const App = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));
//     const [userRole, setUserRole] = useState(null);
//
//     useEffect(() => {
//         const token = Cookies.get('token');
//         setIsLoggedIn(!!token);
//
//         if (token) {
//             const tokenPayload = token.split(".")[1];
//             const decodedToken = JSON.parse(atob(tokenPayload));
//             console.log("Decoded Token:", decodedToken);
//             setUserRole(decodedToken.role);
//         } else {
//             setUserRole(null);
//         }
//     }, []);
//
//     const handleLogin = () => {
//         setIsLoggedIn(true);
//     };
//
//     const handleLogout = () => {
//         Cookies.remove('token');
//         setIsLoggedIn(false);
//         setUserRole(null);
//     };
//
//     return (
//         <Router>
//
//             {isLoggedIn && <Appbar onLogout={handleLogout} userRole={userRole} />}
//
//             <Routes>
//                 {isLoggedIn ? (
//                     <>
//                         <Route path="/" element={<Home onLogout={handleLogout} />} />
//                         <Route path="/table" element={<TablePage onLogout={handleLogout} />} />
//                         <Route path="/admin">
//                             <Route path="/admin" element={<AdminPage userRole={userRole} onLogout={handleLogout} />} />
//                         </Route>
//                     </>
//                 ) : (
//                     <Route path="/" element={<Navigate to="/login" />} />
//                 )}
//                 <Route
//                     path="/login"
//                     element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
//                 />
//             </Routes>
//         </Router>
//     );
// };
//
// export default App;
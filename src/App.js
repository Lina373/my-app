//
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './Pages/Home';
// import TablePage from './Pages/TablePage';
// import Login from './Login';
// import Cookies from 'js-cookie';
// import AdminPage from "./Pages/AdminPage";
// import Appbar from "./Appbar";
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
//             setUserRole(decodedToken.role);
//         } else {
//             setUserRole(null);
//         }
//     }, []);
//
//     useEffect(() => {
//         if (isLoggedIn) {
//             const token = Cookies.get('token');
//             const tokenPayload = token.split(".")[1];
//             const decodedToken = JSON.parse(atob(tokenPayload));
//             setUserRole(decodedToken.role);
//         } else {
//             setUserRole(null);
//         }
//     }, [isLoggedIn]);
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
//             {isLoggedIn && <Appbar onLogout={handleLogout} userRole={userRole} />}
//             <Routes>
//                 <Route path="/" element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
//                 <Route path="/table" element={isLoggedIn ?<TablePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
//                 <Route
//                     path="/login"
//                     element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
//                 />
//                 <Route path="/admin">
//                     <Route path="/admin" element={isLoggedIn ?<AdminPage userRole={userRole} onLogout={handleLogout} /> : <Navigate to="/login" />} />
//                 </Route>
//             </Routes>
//         </Router>
//     );
// };
//
// export default App;
//
//
//
//
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
            setUserRole(decodedToken.role);
        } else {
            setUserRole(null);
        }

        // Установка интервала для проверки времени жизни токена каждые 30 секунд
        const tokenExpirationCheckInterval = setInterval(() => {
            checkTokenExpiration();
        }, 30000); // 30 секунд

        return () => {
            // Очистка интервала при размонтировании компонента
            clearInterval(tokenExpirationCheckInterval);
        };
    }, []);

    // Функция для проверки времени жизни токена и удаления его
    const checkTokenExpiration = () => {
        const token = Cookies.get('token');
        if (token) {
            const tokenPayload = token.split(".")[1];
            const decodedToken = JSON.parse(atob(tokenPayload));
            const tokenExpiration = new Date(decodedToken.exp * 1000);
            const currentTime = new Date();

            if (currentTime > tokenExpiration) {
                // Токен просрочен, удаляем его
                Cookies.remove('token');
                setIsLoggedIn(false);
                setUserRole(null);
            }
        }
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        Cookies.remove('token');
        setIsLoggedIn(false);
        setUserRole(null);
    };

    return (
        <Router>
            {isLoggedIn && <Appbar onLogout={handleLogout} userRole={userRole} />}
            <Routes>
                <Route path="/" element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
                <Route path="/table" element={isLoggedIn ? <TablePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
                <Route
                    path="/login"
                    element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
                />
                <Route path="/admin">
                    <Route path="/admin" element={isLoggedIn ? <AdminPage userRole={userRole} onLogout={handleLogout} /> : <Navigate to="/login" />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;


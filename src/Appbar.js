import React, {useState} from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Appbar = ({ onLogout, userRole }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleMouseEnter = () => {
        setShowMenu(true);
    };

    const handleMouseLeave = () => {
        setShowMenu(false);
    };

    return (
        <div style={{ backgroundColor: "#4CBD20"}}>
            <Navbar variant="dark"  style={{ marginLeft: "10px" }} >
                <Nav className="me-auto" >
                <Nav.Link className="nav-link text-white" as={Link}  to="/">
                    Головна
                </Nav.Link>
                    <NavDropdown
                        title="Кнопка"
                        id="basic-nav-dropdown"
                        show={showMenu}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <NavDropdown.Item href="#">
                            Розрахункові документи
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">ВСП</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link className="nav-link text-white" href="#">
                        Розрахункові дані технологічні
                    </Nav.Link>
                    {userRole === "admin" && (
                        <Nav.Link as={Link} to="/admin" className="nav-link text-white">
                            Реєстрація нових користувачів
                        </Nav.Link>
                    )}
                    <Nav.Link className="nav-link text-white" href="#">
                        Товарний випуск
                    </Nav.Link>
                    <Nav.Link as={Link} to="/table" className="nav-link text-white">
                        Номери підприємств
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login" className="nav-link text-white">
                        Login
                    </Nav.Link>
                    <Nav.Link className="nav-link text-white" href="#" onClick={onLogout}>
                        Вийти
                    </Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Appbar;

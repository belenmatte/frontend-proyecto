import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

function Navbar() {
    const { logout, token } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
        setIsLoggedIn(token !== null && token !== "null");
    }, [token]);

    return (
        <header>
            <nav className="navbar">
                <NavLink to="/" className="logo-display">
                    <img src="/brain.png" alt="logo-image" className="logo-image" />
                    <span className="name title"> Memory Challenge </span>
                </NavLink>
                <ul className="navbar-links-container">
                    <li className="navbar-element">
                        <NavLink to="/" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                            Home
                        </NavLink>
                    </li>
                    <li className="navbar-element">
                        <NavLink to="login" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                            Inicio Sesión
                        </NavLink>    
                    </li>
                    {!isLoggedIn && (
                        <li className="navbar-element">
                        <NavLink to="signup" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                            Registrar
                        </NavLink>    
                    </li>)}
                    <li className="navbar-element"> 
                        <NavLink to="about-us" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                            About Us
                        </NavLink>
                    </li>
                    <li className="navbar-element">
                        <NavLink to="instructions" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                            Instructions
                        </NavLink>    
                    </li>
                    {isLoggedIn && (
                        <li className="navbar-element">
                        <NavLink
                            to="logout"
                            className={({ isActive }) =>
                            isActive ? "navbar-link name" : "navbar-link"
                            }
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
    }

    export default Navbar;
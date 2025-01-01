import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ onCategoryChange, getLatest }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="nav-container">
            <div className="logo">
                <h1>The MetroPulse</h1>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
            <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
                <li><Link to="/">Home</Link></li>
                <li><button className="latest-news" onClick={getLatest}>Latest News</button></li>
                <li>
                    <select
                        id="category"
                        name="category"
                        onChange={(e) => onCategoryChange(e.target.value)}
                        defaultValue="All"
                    >
                        <option value="All">All Categories</option>
                        <option value="Weather">Weather</option>
                        <option value="Crime">Crime</option>
                        <option value="Sports">Sports</option>
                        <option value="Tech">Tech</option>
                        <option value="Health">Health</option>
                        <option value="Politics">Politics</option>
                    </select>
                </li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    );
}

export default Navbar;

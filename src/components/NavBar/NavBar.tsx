import "./NavBar.css";
import {NavLink} from "react-router-dom";

export default function NavBar() {
    return (
        <>
            <div id="nav-bar-content">
                <div className="selections">
                    <i className="fa-solid fa-location-dot select-theater-icon"></i>
                    <span>Select theater</span>
                </div>
                <div className="nav-links">
                    <div className="nav-link">Discounts</div>
                    <NavLink to="/about-us" className="nav-link">About us</NavLink>
                </div>
            </div>
        </>
    );
}
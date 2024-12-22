import "./NavBar.css";
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../constants/routes.ts";

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
                    <NavLink to={ROUTES.ABOUT_US} className="nav-link">About us</NavLink>
                </div>
            </div>
        </>
    );
}
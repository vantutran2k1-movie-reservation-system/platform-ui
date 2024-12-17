import "./Header.css";
import QuickAction from "../QuickAction/QuickAction.tsx";
import MovieSearchBar from "../MovieSearchBar/MovieSearchBar.tsx";
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <header>
            <div id="header-content">
                <NavLink to="/">
                    <img id="company-logo" src="/src/assets/company-logo.png" alt="company-logo"/>
                </NavLink>
                <div className="quick-actions">
                    <QuickAction iconPath="/src/assets/buy-tickets-icon.svg" content="BUY TICKETS"
                                 style={{backgroundColor: "#DDBD61", color: "black"}}/>
                    <QuickAction iconPath="/src/assets/buy-popcorn-icon.svg" content="BUY POPCORN"
                                 style={{backgroundColor: "#771EB0", color: "white"}}/>
                </div>
                <MovieSearchBar/>
                <div id="login-section">
                    <i className="fa-regular fa-circle-user login-icon"></i>
                    <span className="login-action">Sign in</span>
                </div>
            </div>
            <div className="line"></div>
        </header>
    );
}
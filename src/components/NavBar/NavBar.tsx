import "./NavBar.css";

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
                    <div className="nav-link">About us</div>
                </div>
            </div>
        </>
    );
}
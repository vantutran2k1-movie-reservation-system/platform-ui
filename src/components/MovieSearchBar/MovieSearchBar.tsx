import "./MovieSearchBar.css";

export default function MovieSearchBar() {
    return (
        <div id="search-bar">
            <input type="text" placeholder="Search for movies"/>
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </div>
    );
}
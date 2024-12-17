import "./App.css";
import Header from "./components/Header/Header.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AboutUs from "./pages/AboutUs/AboutUs.tsx";

function App() {
    return (
        <>
            <Header/>
            <NavBar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/about-us" element={<AboutUs/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

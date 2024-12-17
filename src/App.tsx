import "./App.css";
import {Route, Routes} from "react-router-dom";
import AboutUs from "./pages/AboutUs/AboutUs.tsx";
import Layout from "./pages/Layout/Layout.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/about-us" element={<AboutUs/>}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;

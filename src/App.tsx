import "./App.css";
import {Route, Routes} from "react-router-dom";
import AboutUs from "./pages/AboutUs/AboutUs.tsx";
import Layout from "./pages/Layout/Layout.tsx";
import Login from "./pages/Login/Login.tsx";
import VerifyUser from "./pages/VerifyUser/VerifyUser.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/about-us" element={<AboutUs/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/verify-user" element={<VerifyUser/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;

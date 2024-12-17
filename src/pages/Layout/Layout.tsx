import Header from "../../components/Header/Header.tsx";
import NavBar from "../../components/NavBar/NavBar.tsx";
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <>
            <Header/>
            <NavBar/>

            <Outlet/>
        </>
    );
}
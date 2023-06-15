import { Outlet } from "react-router-dom"
import { Footer } from "./components/elements/Footer/Footer"
import { Header } from "./components/elements/Header/Header"
import { Container } from "./components/Container/Container"


export const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>

    )
}
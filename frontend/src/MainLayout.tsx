
import { Outlet } from "react-router-dom"
import Footer from "./ui/footer/Footer"
import Navbar from "./ui/header/Navbar"

const MainLayout = () => {
  return (
    <div >
        <Navbar/>
        <main >
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout
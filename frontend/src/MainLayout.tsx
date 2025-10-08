
import { Outlet } from "react-router-dom"
import Footer from "./ui/footer/Footer"
import Navbar from "./ui/header/Navbar"
import { useEffect } from "react"
import axios from "axios"
import { baseUrl } from "./utils/constant"

const MainLayout = () => {

  // 

  const fetchUser = async ()=>{

    try {
      const res = await axios.get(baseUrl + "")
    } catch (error:unknown) {
      console.log("Error : ",error)
    }
  }
  
  useEffect(()=>{
    fetchUser()
  },[])
  
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
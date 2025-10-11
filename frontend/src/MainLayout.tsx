
import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./ui/footer/Footer"
import Navbar from "./ui/header/Navbar"
import { useEffect } from "react"
import axios, { AxiosError } from "axios"
import { baseUrl } from "./utils/constant"
import { useDispatch } from "react-redux"
import { addUser } from "./features/user/userSlice"

const MainLayout = () => {

  // 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const fetchUser = async ()=>{
    try {
      const res = await axios.get(baseUrl + "/profile/view",{
        withCredentials:true
      })
      dispatch(addUser(res.data))

      
    } catch (error) {

       if (axios.isAxiosError(error)) {
        const AxiosError = error as AxiosError;

        if(AxiosError.response?.status === 401 ){
          navigate("/login")
        }
       
      console.log("Error : ",error)
  }}
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
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./MainLayout"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

const Router = createBrowserRouter([{
  path:'/',
  element:<MainLayout/>,
  children:[
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'signUp',
      element:<SignUp/>
    },
  ]
}])

const App = () => {
  return (
   <RouterProvider router={Router} />
  )
}

export default App
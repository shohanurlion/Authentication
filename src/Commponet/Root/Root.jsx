import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default Root
import { Outlet } from "react-router-dom"
import Header from "../Header/header"

const Layout = () => {
  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>

    </>
  )
}

export default Layout
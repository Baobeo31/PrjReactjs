import React from 'react'
import styles from './Navbar.module.css'
import logo_light from '../../components/assets/techno_d.png';
import search_icon_light from '../../components/assets/search_light.png';
import Login from '../../pages/SignIn/SignIn';
import { useNavigate } from 'react-router-dom';



//C:\Users\LAPTOP\OneDrive\Documents\Downloads\JS\login-signup\src\components\assets\light.png
const Navbar = () => {

  const navigate = useNavigate();
  const handleNavigatetoLogin = () => {
    navigate('/login')
  }
  const handleNavigatetoHome = () => {
    navigate('/home')
  }

  return (
    <div className={styles.navbar}>
      <img src={logo_light} alt='' className={styles.logo} />
      <ul>
        <li onClick={handleNavigatetoHome}>Home</li>
        <li>Products</li>
        <li>About</li>
      </ul>
      <div className={styles.search_box}>
        <input type='text' placeholder='Search' />
        <img src={search_icon_light} alt='' />

      </div>
      <div className={styles.login} onClick={handleNavigatetoLogin}>Login</div>
    </div>
  )
}

export default Navbar

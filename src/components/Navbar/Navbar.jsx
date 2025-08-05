import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import logo_light from '../../components/assets/b1.png';
import search_icon_light from '../../components/assets/search_light.png';
import Login from '../../pages/SignIn/SignIn';
import { useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hook/useMutation';
import { logout } from '../../services/UserService'
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true')
  const navigate = useNavigate();
  const mutation = useMutationHooks(logout)
  const handleNavigatetoLogin = () => {
    navigate('/login')
  }
  const handleNavigatetoHome = () => {
    navigate('/home')
  }
  const handleNavigatetoProduct = () => {
    navigate('/product')
  }
  const handleLogout = () => {
    mutation.mutate(null, {
      onSuccess: () => {
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false)
        navigate('/login')
      },
    })
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(loginStatus)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <div className={styles.navbar}>
        <img src={logo_light} alt='' className={styles.logo} />TECHNO.C
        <ul className={styles.menu}>
          <li onClick={handleNavigatetoHome}>Home</li>
          <li onClick={handleNavigatetoProduct}>Products</li>
          <li>About</li>
        </ul>
        <div className={styles.search_box}>
          <input type='text' placeholder='Search' />
          <img src={search_icon_light} alt='' />

        </div>
        {isLoggedIn ? (
          <div className={styles.login} onClick={handleLogout}>Logout</div>
        ) : (
          <div className={styles.login} onClick={handleNavigatetoLogin}>Login</div>
        )}
      </div>
    </>
  )
}

export default Navbar

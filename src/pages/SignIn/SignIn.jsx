import styles from './SignIn.module.css'
import user_icon from '../../components/assets/person.png';
import password_icon from '../../components/assets/password.png';
import email_icon from '../../components/assets/email.png';
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames';
import { useMutationHooks } from '../../hook/useMutation'
import { loginUser } from '../../services/UserService'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [action, setAction] = useState("Login");
  const location = useLocation()
  //Sử dụng CustomHook gọi API đăng nhập 
  const mutation = useMutationHooks(loginUser)

  const { data, isSuccess } = mutation
  const navigate = useNavigate()
  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state)
      } else {
        navigate('/')
      }
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
    }
  }, [isSuccess])
  const handleOnChangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnChangePassWord = (value) => {
    setPassword(value)
  }
  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
  }


  const handlerNavigateSignUp = () => {
    navigate("/sign-up")
  }
  const handleNavigateForgot = () => {
    navigate("/forgot-pass")
  }

  return (
    <div>
      <div className={styles.container}>

        <div className={styles.header}>
          <div className={styles.text}>{action}</div>
          <div className={styles.underline}></div>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault(); // Ngăn reload
          handleSignIn();     // Gọi hàm login
        }}>
          <div className={styles.input}>
            <img className={styles.img} src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleOnChangeEmail(e.target.value)}
              autoComplete="email" //để tránh warning tự động điền cái mình đã điền trc đó 
            />
          </div>

          <div className={styles.input}>
            <img className={styles.img} src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleOnChangePassWord(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className={styles.forgotpassword}>
            Lost Password? <span onClick={handleNavigateForgot}>Click here</span>
          </div>

          <div className={styles.submitcontainer}>
            <button type="submit" className={styles.submit}>
              Log In
            </button>
            <button
              type="button"
              className={styles.submit}
              onClick={handlerNavigateSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login
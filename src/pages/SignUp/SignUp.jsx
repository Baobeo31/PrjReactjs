import styles from './SignUp.module.css'
import user_icon from '../../components/assets/person.png'
import password_icon from '../../components/assets/password.png'
import email_icon from '../../components/assets/email.png'
import { useState, useEffect } from 'react'
import { useMutationHooks } from '../../hook/useMutation'
import { signupUser } from '../../services/UserService'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  // const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [action, setAction] = useState('Sign Up')

  const mutation = useMutationHooks(signupUser)
  const { data, isError, isSuccess } = mutation
  const navigate = useNavigate()

  const handleSignUp = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp.')
      return
    }

    setErrorMessage('')
    mutation.mutate({ email, password })
  }

  const handleNavigateSignIn = () => {
    navigate('/login')
  }

  useEffect(() => {
    if (isSuccess) {
      alert('Đăng ký thành công!')
      handleNavigateSignIn()
    } else if (isError) {
      alert('Đăng ký thất bại!')
      console.error('Lỗi:', mutation.error)
    }
  }, [isSuccess, isError])

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.text}>{action}</div>
          <div className={styles.underline}></div>
        </div>

        <form className={styles.inputs} onSubmit={handleSignUp}>
          {/* <div className={styles.input}>
            <img className={styles.img} src={user_icon} alt="name" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div> */}

          <div className={styles.input}>
            <img className={styles.img} src={email_icon} alt="email" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.input}>
            <img className={styles.img} src={password_icon} alt="password" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <div className={styles.input}>
            <img className={styles.img} src={password_icon} alt="confirm password" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          {errorMessage && (
            <div style={{ color: 'red', textAlign: 'center', marginBottom: 8 }}>
              {errorMessage}
            </div>
          )}

          <div className={styles.forgotpassword}>
            Lost Password? <span onClick={() => navigate('/forgot-pass')}>Click here</span>
          </div>

          <div className={styles.submitcontainer}>
            <button type="button" className={styles.submit} onClick={handleNavigateSignIn}>
              Log In
            </button>
            <button type="submit" className={styles.submit}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp

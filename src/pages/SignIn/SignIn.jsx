import styles from './SignIn.module.css';
import password_icon from '../../components/assets/password.png';
import email_icon from '../../components/assets/email.png';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hook/useMutation';
import { loginUser } from '../../services/UserService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('Login');

  const location = useLocation();
  const navigate = useNavigate();

  const mutation = useMutationHooks(loginUser);
  const { data, isSuccess, isError, error, isLoading } = mutation;

  useEffect(() => {
    if (isSuccess) {
      navigate('/home')
    }
  }, [isSuccess, data, location, navigate]);

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassWord = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  const handlerNavigateSignUp = () => {
    navigate('/sign-up');
  };

  const handleNavigateForgot = () => {
    navigate('/forgot-pass');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>{action}</div>
        <div className={styles.underline}></div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault(); // Ngăn reload
          handleSignIn();     // Gọi hàm login
        }}
      >
        <div className={styles.input}>
          <img className={styles.img} src={email_icon} alt="email icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleOnChangeEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className={styles.input}>
          <img className={styles.img} src={password_icon} alt="password icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handleOnChangePassWord(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <div className={styles.forgotpassword}>
          Lost Password? <span onClick={handleNavigateForgot}>Click here</span>
        </div>

        {/* Hiển thị lỗi nếu có */}
        {isError && (
          <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
            {error?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'}
          </div>
        )}

        <div className={styles.submitcontainer}>
          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? 'Đang đăng nhập...' : 'Log In'}
          </button>
          <button type="button" className={styles.submit} onClick={handlerNavigateSignUp}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
import styles from './SignUp.module.css'
import user_icon from '../../components/assets/person.png';
import password_icon from '../../components/assets/password.png';
import email_icon from '../../components/assets/email.png';
import { useState, useEffect } from 'react'
import classNames from 'classnames';
import { useMutationHooks } from '../../hook/useMutation'
import { signupUser } from '../../services/UserService'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [action, setAction] = useState('Sign Up');

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )
  const { data, isError, isSuccess } = mutation;
  const navigate = useNavigate();

  // Dùng các hàm riêng để xử lý thay đổi input
  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnChangePassWord = (e) => {
    setPassword(e.target.value);
  };

  const handleOnChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault(); // Ngăn reload trang
    mutation.mutate({
      email,
      password,
      confirmPassword,
    });
  };

  const handleNavigateSignIn = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (isSuccess) {
      alert('Success');
      handleNavigateSignIn();
    } else if (isError) {
      alert('Error');
      console.log(mutation.error);

    }
  }, [isSuccess, isError]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.text}>{action}</div>
          <div className={styles.underline}></div>
        </div>

        <form className={styles.inputs} onSubmit={handleSignUp}>
          <div className={styles.input}>
            <img className={styles.img} src={email_icon} alt="email" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleOnChangeEmail}
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
              onChange={handleOnChangePassWord}
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
              onChange={handleOnChangeConfirmPassword}
              autoComplete="new-password"
              required
            />
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
  );
}

export default SignUp;
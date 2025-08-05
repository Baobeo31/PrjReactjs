import styles from './forgot.module.css'
import password_icon from '../../components/assets/password.png';
import email_icon from '../../components/assets/email.png';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hook/useMutation';
import { verifyOTPAndResetPassword } from '../../services/UserService';

function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const mutation = useMutationHooks(verifyOTPAndResetPassword)
  const { data, isError, isLoading, isSuccess } = mutation

  const handleResetPassword = async (e) => {
    e.preventDefault();
    mutation.mutate({
      email,
      otp,
      newPassword
    })

  };
  useEffect(() => {
    if (data?.status === "OK") {
      navigate('/login')
    } else {
      alert("Không thành công")
    }
  }, [data])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>Xác minh OTP</div>
        <div className={styles.underline}></div>
      </div>

      <form onSubmit={handleResetPassword}>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className={styles.input}>
          <img className={styles.img} src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Nhập Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className={styles.input}>
          <input
            type="text"
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            autoComplete="one-time-code"
            required
          />
        </div>

        <div className={styles.input}>
          <img className={styles.img} src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        <div className={styles.submitcontainer}>
          <button type="submit" className={styles.submit}>Xác nhận</button>
        </div>
      </form>
    </div>
  );
}

export default Verify;

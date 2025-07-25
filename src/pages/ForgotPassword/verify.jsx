import styles from './forgot.module.css'
import password_icon from '../../components/assets/password.png';
import email_icon from '../../components/assets/email.png';
import { useState } from 'react';
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

  const handleVeriry = () => {
    mutation.mutate({
      email,
      otp,
      newPassword
    })
  }
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // if (newPassword !== confirm) {
    //   return setError("Mật khẩu xác nhận không khớp.");
    // }

    // Gọi API xác thực OTP và đổi mật khẩu
    console.log("Xác thực:", { email, otp, newPassword });

    // Nếu thành công:
    alert("Đặt lại mật khẩu thành công");
    navigate('/login');
  };

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

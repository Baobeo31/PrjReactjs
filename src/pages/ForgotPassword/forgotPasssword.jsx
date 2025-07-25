import styles from './forgot.module.css'
import email_icon from '../../components/assets/email.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hook/useMutation';
import { sendOTP } from '../../services/UserService';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const mutation = useMutationHooks(sendOTP)
  const handleOTP = () => {
    mutation.mutate(email)
  }
  const handleSendOTP = async (e) => {
    e.preventDefault();

    // Gọi API gửi OTP ở đây
    console.log("Gửi OTP tới email:", email);

    // Chuyển sang trang nhập mã OTP, truyền email
    navigate('/verify-otp');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>Quên mật khẩu</div>
        <div className={styles.underline}></div>
      </div>

      <form onSubmit={handleSendOTP}>
        <div className={styles.input}>
          <img className={styles.img} src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className={styles.submitcontainer}>
          <button type="submit" className={styles.submit} onClick={handleOTP}>Gửi mã OTP</button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;

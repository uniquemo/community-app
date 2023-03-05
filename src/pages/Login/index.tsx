import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import useLocalStorage from 'hooks/useLocalStorage';

import styles from './index.module.scss';

const LoginPage = () => {
  const [storedValue, setStoredValue] = useLocalStorage('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const disabled = !username || !password;

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    setStoredValue(username);
    navigate('/');
  };

  useEffect(() => {
    if (storedValue) {
      navigate('/');
      return;
    }
  }, [navigate, storedValue]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Please login first!</h2>
      <div className={styles.loginForm}>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Username: </span>
          <input
            className={styles.fieldInput}
            placeholder='Type your username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Password: </span>
          <input
            className={styles.fieldInput}
            type='password'
            placeholder='Type your password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div
          className={cn(styles.loginBtn, disabled && styles.disabled)}
          onClick={handleLogin}
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

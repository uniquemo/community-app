import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import useLocalStorage from 'hooks/useLocalStorage';

import styles from './index.module.scss';

const LoginPage = () => {
  const [user, setUser] = useLocalStorage('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = () => {
    setUser(username);
    navigate('/');
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const disabled = !username || !password;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Please login first!</h2>

      <div className={styles.loginForm}>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Username: </span>
          <input
            name='username'
            className={styles.fieldInput}
            placeholder='Type your username'
            value={username}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Password: </span>
          <input
            name='password'
            className={styles.fieldInput}
            type='password'
            placeholder='Type your password'
            value={password}
            onChange={handleChange}
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

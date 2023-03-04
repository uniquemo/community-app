import { useRouteError } from 'react-router-dom';

import styles from './index.module.scss';

const ErrorPage = () => {
  const error = useRouteError() as (Error & { statusText: string });
  console.error(error);

  if (!error) return null;

  return (
    <div className={styles.container}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;

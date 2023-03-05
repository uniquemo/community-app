import { Link } from 'react-router-dom';

import { fakeMatchTitle } from 'constants/fake';

import styles from './index.module.scss';

const MatchPage = () => {
  return (
    <div className={styles.container}>
      <h2>Match Page</h2>
      {(new Array(5).fill(true)).map((item, index) => {
        return (
          <Link to='/match/1/hub' key={index}>
            <div className={styles.item}>{fakeMatchTitle}</div>
          </Link>
        );
      })}
    </div>
  );
}

export default MatchPage;

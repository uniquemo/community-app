import { Link } from 'react-router-dom';

import { FAKE_MATCH_TITLE } from 'constants/fake';

import styles from './index.module.scss';

const MatchPage = () => {
  return (
    <div className={styles.container}>
      <h2>Match Page</h2>
      {(new Array(5).fill(true)).map((item, index) => {
        return (
          <Link to='/match/1/hub' key={index}>
            <div className={styles.item}>{FAKE_MATCH_TITLE}</div>
          </Link>
        );
      })}
    </div>
  );
}

export default MatchPage;

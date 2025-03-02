import React from 'react';
import styles from '../CSS/WatchFest.module.css';
import { Link } from 'react-router-dom';
const WatchFest = () => {
    return (
        <div className={styles.watchFestMain}>
                <div className={styles.watchFestContent}>
                    <div className={styles.watchFestContentRow}>
                        <div className={`${styles.watchFestContentCol} ${styles.watchFesttopLogo}`}>
                            <img src={require('../assets/imgs/watchFest/WatchFest-Logo-BR.png')} alt="WatchFest Logo" />
                        </div>
                        <div className={`${styles.watchFestContentCol} ${styles.watchFestContentMobile}`}>
                            <Link to="/M6WatchFestRegForm">
                                <img className={styles.watchFestContentTab} src={require('../assets/imgs/watchFest/M6_TAB1.png')} alt="WatchFest Logo" />
                            </Link>
                            <Link to="/WatchFestPrimer">
                                <img className={styles.watchFestContentTab} src={require('../assets/imgs/watchFest/M6_TAB2.png')} alt="WatchFest Logo" />
                            </Link>
                            <Link to="/M6WatchFestChallenge">
                                <img className={styles.watchFestContentTab} src={require('../assets/imgs/watchFest/M6_TAB3.png')} alt="WatchFest Logo" />
                            </Link>
                            <Link to="/WatchFestPrediction">
                                <img className={styles.watchFestContentTab} src={require('../assets/imgs/watchFest/M6_TAB4.png')} alt="WatchFest Logo" />
                            </Link>
                            <Link to="/M6WFLocations">
                                <img className={styles.watchFestContentTab} src={require('../assets/imgs/watchFest/M6_TAB5.png')} alt="WatchFest Logo" />
                            </Link>
                        </div>
                        <div className={styles.watchFestContentCol}>
                            <img className={styles.watchFestContentbottomLogo} src={require('../assets/imgs/watchFest/M6_lowerlogos2.png')} alt="WatchFest Logo" />
                           
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default WatchFest;
import CurrentRate from '../../molecules/CurrentRate/CurrentRate';

import styles from './Header.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <p className={styles.title}>MyConvertr</p>
                <CurrentRate />
            </div>
        </header>
    );
}

import {
    useContext, useEffect, useState,
} from 'react';

import { CURRENT_RATE_CONFIG } from '../../../config';
import { LoadingContext } from '../../../context/LoadingContext';
import { convertMoney } from '../../../helpers/api';

import { rateFormat } from '../../../helpers/format';
import styles from './CurrentRate.module.scss';

export default function CurrentRate() {
    const { loading, toggleLoading } = useContext(LoadingContext);
    const [rates, setRates] = useState(CURRENT_RATE_CONFIG.from.map((currency) => ({
        currency,
        rate: null,
    })));

    useEffect(() => {
        toggleLoading('rate', true);
        const loadCurrentRates = async () => {
            const promises = CURRENT_RATE_CONFIG.from.map(
                (currency) => convertMoney(1, currency, CURRENT_RATE_CONFIG.to),
            );

            const responses = await Promise.allSettled(promises);

            setRates(
                responses.map(({ value }, index) => ({
                    currency: CURRENT_RATE_CONFIG.from[index],
                    rate: value.result,
                })),
            );
            toggleLoading('rate', false);
        };
        loadCurrentRates();
    }, []);

    return (
        <div className={styles.container}>
            {rates.map((rateItem) => (
                <div className={styles.item} key={rateItem.currency}>
                    <span className={styles.currency}>
                        {rateItem.currency}
                        :
                    </span>
                    {loading.rate
                        ? <span>Loading</span>
                        : <span className={styles.rate}>{rateFormat(rateItem.rate, rateItem.currency)}</span>}
                </div>
            ))}
        </div>
    );
}

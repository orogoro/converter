import debounce from 'lodash.debounce';
import {
    useCallback, useContext, useEffect, useState,
} from 'react';

import { CONVERTR_CONFIG } from '../../../config';
import { LoadingContext } from '../../../context/LoadingContext';
import { convertMoney, getSymbols } from '../../../helpers/api';
import { transformSymbolsToOptions } from '../../../helpers/data';
import InputGroup from '../../molecules/InputGroup/InputGroup';

import styles from './Convertr.module.scss';

export default function Convertr() {
    const { toggleLoading } = useContext(LoadingContext);

    const [symbolsOptions, setSymbolsOptions] = useState(null);
    const [convertrItems, setConvertrItems] = useState(CONVERTR_CONFIG);

    useEffect(() => {
        toggleLoading('symbols', true);
        const loadSymbols = async () => {
            const symbols = await getSymbols();
            setSymbolsOptions(transformSymbolsToOptions(symbols));
            toggleLoading('symbols', false);
        };
        loadSymbols();
    }, []);

    const convertDebounced = useCallback(debounce(async (itemsToConvert) => {
        const from = itemsToConvert.find(({ changed }) => changed);
        const targets = itemsToConvert.filter(({ changed }) => !changed);

        if (!from.value) {
            return;
        }

        toggleLoading('amount', true);

        const promises = targets.reduce((res, item) => (
            [...res, convertMoney(from.value, from.currency, item.currency)]
        ), []);

        const results = await Promise.allSettled(promises);

        setConvertrItems(itemsToConvert.map((item) => {
            if (item.changed) {
                return {
                    ...item,
                    changed: false,
                };
            }
            return {
                ...item,
                value: results.find((res) => res.value?.currency === item.currency)?.value?.result,
            };
        }));
        toggleLoading('amount', false);
    }, 500), [setConvertrItems]);

    useEffect(() => {
        if (!convertrItems.some(({ changed }) => changed)) {
            return;
        }

        convertDebounced(convertrItems);
    }, [convertrItems]);

    const handleMoneyValueChange = (id, value) => {
        setConvertrItems(convertrItems.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    changed: true,
                    value,
                };
            }
            return item;
        }));
    };

    const handleCurrencyChange = (id, newCurrency) => {
        setConvertrItems(convertrItems.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    changed: true,
                    currency: newCurrency,
                };
            }
            return item;
        }));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Convertr Component</h1>
            <div className={styles.groupContainer}>
                {convertrItems.map(({
                    changed, currency, id, value,
                }) => (
                    <InputGroup
                        changed={changed}
                        currency={currency}
                        handleCurrencyChange={handleCurrencyChange}
                        handleMoneyValueChange={handleMoneyValueChange}
                        id={id}
                        moneyValue={value}
                        symbolOptions={symbolsOptions?.filter(
                            (option) => (
                                option.value === currency
                                || !convertrItems.map((item) => item.currency).includes(option.value)
                            ),
                        )}
                        key={id}
                    />
                ))}
            </div>
        </div>
    );
}

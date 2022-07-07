import cls from 'classnames';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

import { LoadingContext } from '../../../context/LoadingContext';
import { moneyFormat } from '../../../helpers/format';
import { Input } from '../../atoms/Input';
import { Select } from '../../atoms/Select';

import styles from './InputGroup.module.scss';

const selectStyles = {
    control: (styleConf) => ({
        ...styleConf,
        borderWidth: 0,
        boxShadow: 'none',
        cursor: 'pointer',
    }),
    input: (styleConf) => ({
        ...styleConf,
        outline: 1,
    }),
};

export default function InputGroup({
    changed,
    currency,
    handleCurrencyChange,
    handleMoneyValueChange,
    id,
    moneyValue,
    symbolOptions,
}) {
    const { loading } = useContext(LoadingContext);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { value } = event.target;
        const clearValue = value.replace(/[\s,]/g, '');
        const isError = clearValue.search(/[^\d.]/) !== -1;

        if (isError) {
            setError('Please input only numbers');
            return;
        }

        setError(null);
        handleMoneyValueChange(id, clearValue);
    };

    const handleSelectChange = (option) => {
        handleCurrencyChange(id, option.value);
    };

    const onBlur = () => {
        setError(null);
    };

    return (
        <div className={styles.container}>
            <div className={cls(styles.inputContainer, {
                [styles.inputLoading]: loading.amount && !changed,
            })}
            >
                <Input
                    className={styles.input}
                    isDisabled={loading.amount}
                    onBlur={onBlur}
                    onChange={handleInputChange}
                    value={moneyValue === null ? '' : moneyFormat(moneyValue)}
                />
            </div>
            <Select
                className={styles.select}
                isDisabled={loading.symbols}
                onChange={handleSelectChange}
                options={symbolOptions}
                styles={selectStyles}
                value={symbolOptions?.find(({ value }) => value === currency)}
            />
            {error && <span>{error}</span>}
        </div>
    );
}

InputGroup.defaultProps = {
    moneyValue: null,
    symbolOptions: null,
};

InputGroup.propTypes = {
    changed: PropTypes.bool.isRequired,
    currency: PropTypes.string.isRequired,
    handleCurrencyChange: PropTypes.func.isRequired,
    handleMoneyValueChange: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    moneyValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    symbolOptions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })),
};

export const moneyFormat = (money) => {
    if (!money) {
        return '';
    }

    const moneyString = money.toString();
    const parts = moneyString.split('.');
    const mainPart = Number(parts[0]).toLocaleString();
    const decimalPart = parts[1] !== undefined ? `.${parts[1]}` : '';
    return `${mainPart}${decimalPart}`;
};

export const rateFormat = (value, currency) => (
    Number(value).toLocaleString(window.navigator.language, { currency, style: 'currency' })
);

export const transformSymbolsToOptions = (symbols) => Object.keys(symbols).map(
    (key) => ({ label: `${symbols[key]} (${key})`, value: key }),
);

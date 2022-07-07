import axios from 'axios';

import { API_URL, API_KEY } from '../config';

export const getSymbols = async () => {
    const response = await axios.get(`${API_URL}/symbols`, {
        headers: {
            apikey: API_KEY,
        },
    });
    if (response.data?.success && response.data?.symbols) {
        return response.data.symbols;
    }
    return null;
};

export const convertMoney = async (amount, from, to) => {
    const response = await axios.get(`${API_URL}/convert`, {
        headers: {
            apikey: API_KEY,
        },
        params: {
            amount,
            from,
            to,
        },
    });
    if (response.data?.success && response.data?.result) {
        return {
            currency: response.data.query.to,
            result: response.data.result,
        };
    }
    return null;
};

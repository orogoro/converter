import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';

import { LoadingContext } from './LoadingContext';

const defaultState = {
    amount: false,
    rate: false,
    symbols: false,
};

export function LoadingContextContainer({ children }) {
    const [loading, setLoading] = useState(defaultState);

    const toggleLoading = useCallback((type, isLoading) => {
        setLoading((state) => ({
            ...state,
            [type]: isLoading,
        }));
    }, [loading]);

    const contextValue = useMemo(() => ({ loading, toggleLoading }), [loading, toggleLoading]);

    return (
        <LoadingContext.Provider value={contextValue}>
            {children}
        </LoadingContext.Provider>
    );
}

LoadingContextContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

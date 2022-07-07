import PropTypes from 'prop-types';
import ReSelect from 'react-select';

export default function Select({
    className,
    isDisabled,
    onChange,
    options,
    styles,
    value,
}) {
    return (
        <ReSelect
            className={className}
            isDisabled={isDisabled}
            onChange={onChange}
            options={options}
            styles={styles}
            value={value}
        />
    );
}

Select.defaultProps = {
    className: '',
    isDisabled: false,
    options: null,
    styles: null,
    value: null,
};

Select.propTypes = {
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })),
    styles: PropTypes.objectOf(PropTypes.func),
    value: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }),
};

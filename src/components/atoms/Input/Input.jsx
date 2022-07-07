import PropTypes from 'prop-types';

export default function Input({
    className,
    isDisabled,
    onBlur,
    onChange,
    type,
    value,
}) {
    return (
        <input
            className={className}
            disabled={isDisabled}
            onBlur={onBlur}
            onChange={onChange}
            type={type}
            value={value}
        />
    );
}

Input.defaultProps = {
    className: '',
    isDisabled: false,
    onBlur: undefined,
    type: 'text',
};

Input.propTypes = {
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
};

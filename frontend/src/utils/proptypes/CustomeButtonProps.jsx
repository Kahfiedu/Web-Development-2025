import PropTypes from 'prop-types';

export const CustomButtonPropTypes = {
    title: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    padding: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropTypes.bool
};
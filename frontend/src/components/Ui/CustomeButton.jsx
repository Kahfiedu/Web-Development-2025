import { CustomButtonPropTypes } from "../../utils/proptypes/CustomeButtonProps";

const BUTTON_BASE_CLASSES = 'rounded-md font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed';

export default function CustomeButton({
    title,
    bgColor = 'bg-kahf-green',
    textColor = 'text-white',
    padding = 'px-5 py-3',
    className = '',
    onClick,
    type = 'button',
    disabled = false
}) {

    const buttonClasses = [
        bgColor,
        textColor,
        padding,
        className,
        BUTTON_BASE_CLASSES
    ].join(' ');

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={buttonClasses}
        >
            {title}
        </button>
    );
}

CustomeButton.propTypes = CustomButtonPropTypes;
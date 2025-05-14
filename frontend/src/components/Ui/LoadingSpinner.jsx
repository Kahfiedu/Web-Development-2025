import { LoadingBox, StyledCircularProgress, LoadingText } from "../../utils/loadingStyle"

function LoadingSpinner({ size = 60, text = "Loading..." }) {
    return (
        <LoadingBox>
            <StyledCircularProgress
                color="primary"
                size={size}
                thickness={4}
            />
            <LoadingText>{text}</LoadingText>
        </LoadingBox>
    );
}

export default LoadingSpinner;
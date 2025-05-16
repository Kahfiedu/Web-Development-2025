import PropTypes from 'prop-types';

export default function IconCard({ icon }) {
    return (
        <div className="p-2 flex justify-center items-center bg-white rounded-md">
            {icon}
        </div>
    )
}

IconCard.propTypes = {
    icon: PropTypes.any.isRequired
}
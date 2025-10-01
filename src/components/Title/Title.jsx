import PropTypes from 'prop-types';

export default function Title({ text, level, className }) {
    const Heading = `h${level}`;
    
    return (
        <Heading className={`text-black ${className}`}>
            {text}
        </Heading>
    );
}

Title.propTypes = {
    text: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    className: PropTypes.string,
};

Title.defaultProps = {
    className: '', 
};
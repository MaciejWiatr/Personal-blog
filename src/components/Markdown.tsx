import snarkdown from 'snarkdown';

const Markdown = ({ markdown }) => (
    <div dangerouslySetInnerHTML={{ __html: snarkdown(markdown) }} />
);

export default Markdown;

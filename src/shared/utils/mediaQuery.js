const mq = (size) => {
    const sizes = {
        lg: 1200,
        md: 992,
        sm: 768,
    };

    return `(max-width: ${sizes[size]}px)`;
};

export default mq;

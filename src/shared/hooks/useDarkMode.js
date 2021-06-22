import { useContext } from 'react';
import { ColormodeContext } from '../../contexts/ColormodeProvider';

const useDarkMode = () => {
    return useContext(ColormodeContext);
};

export default useDarkMode;

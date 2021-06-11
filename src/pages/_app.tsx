import { appWithTranslation } from 'next-i18next';
import { useRef } from 'react';
import '../../styles/globals.css';
import ColormodeProvider from '../contexts/ThemeContext';
import AppWrapper from '@components/Layout/AppWrapper';
import { MouseFollower } from '@components/Mouse';

function MyApp({ Component, pageProps }) {
    const appRef = useRef(null);

    return (
        <AppWrapper ref={appRef}>
            <MouseFollower appRef={appRef} />
            <ColormodeProvider>
                <Component {...pageProps} />
            </ColormodeProvider>
        </AppWrapper>
    );
}

export default appWithTranslation(MyApp);

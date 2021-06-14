import { appWithTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import '../../styles/globals.css';
import ColormodeProvider from '../contexts/ThemeContext';
import { AppWrapper } from '@components/Layout';

const MouseFollower = dynamic(
    () => import('../components/Mouse').then((mod) => mod.MouseFollower),
    { ssr: false }
);

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

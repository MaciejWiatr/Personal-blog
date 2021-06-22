if (process.env.NODE_ENV != 'production') {
    import('preact/debug');
}
import { appWithTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import '../../styles/globals.css';
import MotionProvider from '../contexts/MotionProvider';
import ColormodeProvider from '../contexts/ColormodeProvider';
import { AppWrapper } from '@components/Layout';


const MouseFollower = dynamic(
    () => import('../components/Mouse').then((mod) => mod.MouseFollower),
    { ssr: false }
);

function MyApp({ Component, pageProps }) {
    const appRef = useRef(null);

    return (
        <>
            <MotionProvider>
                <AppWrapper ref={appRef}>
                    <MouseFollower appRef={appRef} />
                    <ColormodeProvider>
                        <Component {...pageProps} />
                    </ColormodeProvider>
                </AppWrapper>
            </MotionProvider>
        </>
    );
}

export default appWithTranslation(MyApp);

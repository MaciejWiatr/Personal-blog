import Head from 'next/head';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const HomeHead: FC = () => {
    const { t } = useTranslation('common');

    return (
        <Head>
            <title>{t('homePageTitle')}</title>
            <meta name="description" content={t('homePageDescription')} />
        </Head>
    );
};
export default HomeHead;

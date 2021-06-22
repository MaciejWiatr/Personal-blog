import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { FC } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import {
    ColormodeButton,
    LanguageSwitchLink,
    NavContainer,
    NavHeader,
    NavItem,
    NavItemList,
} from './styles';
import useDarkMode from '@hooks/useDarkMode';
import useMediaQuery from '@hooks/useMediaQuery';
import { MouseHoverEffect } from '@components/Mouse';

const NavBar: FC = () => {
    const { isDark, toggleDark } = useDarkMode();
    const { t } = useTranslation('navbar');
    const { locale } = useRouter();
    const { isXs } = useMediaQuery();

    return (
        <NavContainer>
            <Link href="/" passHref>
                <a>
                    <NavHeader>{isXs ? 'MW' : 'Maciej Wiatr'}</NavHeader>
                </a>
            </Link>
            <NavItemList>
                {!isXs && (
                    <>
                        <NavItem>{t('posts')}</NavItem>
                        <NavItem>{t('search')}</NavItem>
                        <NavItem>{t('contact')}</NavItem>
                    </>
                )}
                <NavItem>
                    <Link href="/" locale={locale === 'pl' ? 'en' : 'pl'}>
                        <LanguageSwitchLink>
                            <p>
                                Switch to{' '}
                                {locale === 'pl' ? 'english' : 'polish'}
                            </p>
                        </LanguageSwitchLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <MouseHoverEffect>
                        <ColormodeButton
                            whileHover={{ rotate: 360 }}
                            onClick={toggleDark}
                        >
                            {isDark ? <FiSun /> : <FiMoon />}
                        </ColormodeButton>
                    </MouseHoverEffect>
                </NavItem>
            </NavItemList>
        </NavContainer>
    );
};

export default NavBar;

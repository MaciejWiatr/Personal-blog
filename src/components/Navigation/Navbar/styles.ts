import styled from '@emotion/styled';
import { m } from 'framer-motion';
import mq from '@shared/utils/mediaQuery';

const LanguageSwitchLink = styled.a`
    color: ${({ theme }) => theme.textBase};
    border: ${({ theme }) => theme.textBase} 0.1rem solid;
    height: 2.5rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3rem;
    margin-right: -0.5rem;
    cursor: pointer !important;
`;

const NavContainer = styled.nav`
    position: relative;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.5rem;
    background-color: ${({ theme }) => theme.backgroundColor};
    z-index: 98;
    @media ${mq('sm')} {
        position: fixed;
        top: 0;
        left: 0;
        padding: 2.5rem 1rem;
        height: 4rem;
    }
`;

const NavHeader = styled.h2`
    font-size: 1.25rem;
`;

const NavItemList = styled.ul`
    display: flex;
    list-style: none;
`;

const NavItem = styled.li`
    display: flex;
    align-items: center;
    z-index: 9;
    font-weight: 500;
    &:not(:last-child) {
        margin-right: 1rem;
    }
`;

const ColormodeButton = styled(m.button)`
    cursor: pointer;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.textBase};
    border: ${({ theme }) => theme.textBase} 0.1rem solid;
    background: none;
    font-size: medium;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    & > svg {
        transform: translateY(2px);
    }
`;

export {
    LanguageSwitchLink,
    NavContainer,
    NavHeader,
    NavItem,
    ColormodeButton,
    NavItemList,
};

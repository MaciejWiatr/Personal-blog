import styled from '@emotion/styled';
import { FC } from 'react';
import NavBar from '../Navigation/Navbar';
import mq from '@shared/utils/mediaQuery';

const BaseLayout: FC = ({ children }) => {
    return (
        <>
            <MainContainer>
                <NavBar />
                {children}
            </MainContainer>
        </>
    );
};

const MainContainer = styled.div`
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textBase};
    min-height: 100vh;
    padding: 5rem 15rem;
    @media ${mq('lg')} {
        padding-left: 7rem;
        padding-right: 7rem;
    }

    @media ${mq('md')} {
        padding-left: 5rem;
        padding-right: 5rem;
    }

    @media ${mq('sm')} {
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 5rem;
    }
`;

export default BaseLayout;

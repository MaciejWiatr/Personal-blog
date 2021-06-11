import styled from '@emotion/styled';
import BottomNav from '../Navigation/BottomNav';
import NavBar from '../Navigation/Navbar';
import useMediaQuery from '@hooks/useMediaQuery';
import mq from '@shared/utils/mediaQuery';

const BaseLayout = ({ children }) => {
    const { isXs } = useMediaQuery();

    return (
        <>
            <MainContainer>
                <NavBar />
                {children}
            </MainContainer>
            {isXs && <BottomNav />}
        </>
    );
};

const MainContainer = styled.div`
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textBase};
    min-height: 100vh;
    padding-top: 5rem;
    padding-left: 15rem;
    padding-right: 15rem;
    padding-bottom: 5rem;
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
        padding-top: 1rem;
    }
`;

export default BaseLayout;

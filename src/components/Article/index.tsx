import styled from '@emotion/styled';
import mq from '@shared/utils/mediaQuery';

export const ArticleMarkdownWrapper = styled.div`
    padding: 2.5rem;
    width: 100%;
    display: flex;
    justify-content: center;

    & > div {
        width: 75%;
    }

    & img {
        max-width: 100% !important;
        height: auto;
    }

    @media ${mq('md')} {
        & > div {
            width: 80%;
        }
    }

    @media ${mq('sm')} {
        padding: 1rem;
        & > div {
            width: 90%;
        }
    }
`;
export const ArticleReadTime = styled.p`
    z-index: 97;
    position: relative;
`;
export const ArticleWrapper = styled.article``;
export const ArticleTagList = styled.ul`
    position: relative;
    display: flex;
    z-index: 97;
    padding: 0;
    list-style: none;
    margin: 0.5rem 0;
`;
export const ArticleTag = styled.li`
    font-family: 'Open Sans', sans-serif !important;
    box-shadow: 1px 1px 23px -5px #000000 !important;
    position: relative;
    border: white 1px solid;
    border-radius: 1rem;
    padding: 0.25rem 0.75rem;
    color: white;
    font-size: small;

    &:not(:first-of-type) {
        margin-left: 0.25rem;
    }
`;
export const ArticleTitle = styled.h2`
    position: relative;
    z-index: 50;
    color: white;
    margin: 0;
    font-size: 2rem;

    @media ${mq('lg')} {
        font-size: 2.5rem;
    }
    @media ${mq('md')} {
        font-size: 2.25rem;
    }
    @media ${mq('sm')} {
        font-size: 1.5rem;
    }
`;
export const ArticleHeader = styled.header`
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
    height: 20rem;
    overflow: hidden;
    border-radius: 1rem;
    padding: 2rem;
    color: white;

    @media ${mq('sm')} {
        height: 10rem;
        padding: 0.5rem 1rem;
    }
`;
export const ArticleHeaderDimmer = styled.div`
    z-index: 20;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.6;
    top: 0;
    left: 0;
`;

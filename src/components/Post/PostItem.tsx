import styled from '@emotion/styled';
import Image from 'next/image';
import { FC } from 'react';
import mq from '../../shared/utils/mediaQuery';
import timeToRead from '../../shared/utils/timeToRead';

function GraphCMSImageLoader({ src, width }) {
    const relativeSrc = (src) => src.split('/').pop();

    return `https://media.graphcms.com/resize=width:${width}/output=format:webp/${relativeSrc(
        src
    )}`;
}
interface IPostItemProps {
    url: string;
    text: string;
    title: string;
}

const PostItem: FC<IPostItemProps> = (props) => {
    return (
        <PostElement>
            <PostImageWrapper>
                <PostImage
                    loader={GraphCMSImageLoader}
                    layout="fill"
                    src={props.url}
                    loading="lazy"
                />
                {/* <PostImage src={props.url} /> */}
            </PostImageWrapper>
            <PostDescription>
                <PostReadTime>{timeToRead(props.text)} min read</PostReadTime>
                <PostTitle>{props.title}</PostTitle>
            </PostDescription>
        </PostElement>
    );
};

const PostDescription = styled.div`
    width: 100%;
`;

const PostReadTime = styled.p`
    text-align: left;
    margin: 0.25rem 0px;
`;
const PostElement = styled.li`
    width: 100%;
    position: relative;
    overflow: hidden;
`;

const PostImageWrapper = styled.div`
    width: 100%;
    border-radius: 0.25rem;
    overflow: hidden;
    aspect-ratio: 16/9;
    position: relative;
`;

const PostImage = styled(Image)`
    width: 100%;
    overflow: hidden;
    border-radius: 0.25rem;
    object-fit: cover;
`;

const PostTitle = styled.h3`
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    flex-grow: 1;
    transition: color 0.25s ease;

    &:hover {
        color: ${({ theme }) => theme.textPrimary};
    }

    @media ${mq('lg')} {
        padding-bottom: 2rem !important;
    }
`;

export default PostItem;

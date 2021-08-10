import styled from '@emotion/styled';
import Image from 'next/image';
import { FC } from 'react';
import mq from '@shared/utils/mediaQuery';
import timeToRead from '@shared/utils/timeToRead';

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
    author: any;
}

const PostCard: FC<IPostItemProps> = (props) => {
    return (
        <PostWrapper>
            <PostImageWrapper>
                <PostImage
                    loader={GraphCMSImageLoader}
                    layout="fill"
                    src={props.url}
                    loading="lazy"
                />
            </PostImageWrapper>
            <PostDescription>
                <PostHeader>
                    <PostAuthor>{props.author}</PostAuthor>
                    {'·'}
                    <PostReadTime>
                        {timeToRead(props.text)} min read
                    </PostReadTime>
                </PostHeader>
                <PostTitle>{props.title}</PostTitle>
            </PostDescription>
        </PostWrapper>
    );
};

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.25rem;
`;

const PostAuthor = styled.span``;

const PostDescription = styled.div`
    margin-top: .5rem;
    width: 100%;
`;

const PostReadTime = styled.p`
    text-align: left;
    margin: 0.25rem 0px;
`;
const PostWrapper = styled.li`
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
    border-radius: 0.5rem;
`;

const PostImage = styled(Image)`
    width: 100%;
    overflow: hidden;
    border-radius: 0.25rem;
    object-fit: cover;
    opacity: 0.9;
    transition: all 0.25s ease;

    &:hover {
        opacity: 1;
        transform: scale(1.1);
    }
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

export default PostCard;

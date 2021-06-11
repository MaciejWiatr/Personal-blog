import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FC } from 'react';
import mq from '../../shared/utils/mediaQuery';
import timeToRead from '../../shared/utils/timeToRead';

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
                    loading="lazy"
                    initial={{
                        scale: 1.1,
                    }}
                    whileHover={{
                        scale: 1.25,
                    }}
                    src={props.url}
                />
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
`;

const PostImage = styled(motion.img)`
    width: 100%;
    overflow: hidden;
    border-radius: 0.25rem;
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

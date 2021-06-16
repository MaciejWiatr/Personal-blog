import styled from '@emotion/styled';
import { DiscussionEmbed } from 'disqus-react';
import { FC } from 'react';

interface IDisqusCommentsProps {
    id: string;
    title: string;
    slug: string;
}

const DisqusComments: FC<IDisqusCommentsProps> = ({ id, title, slug }) => (
    <DisqusWrapper>
        <DiscussionEmbed
            shortname="blog-mwiatr-live"
            config={{
                url: `https://blog.mwiatr.live/post/${slug}`,
                identifier: id,
                title: title,
                language: 'pl',
            }}
        ></DiscussionEmbed>
    </DisqusWrapper>
);

const DisqusWrapper = styled.div`
    & * {
        font-family: sans-serif;
    }
`;

export default DisqusComments;

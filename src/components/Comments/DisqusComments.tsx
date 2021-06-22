import styled from '@emotion/styled';
import { DiscussionEmbed } from 'disqus-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import useDarkMode from 'use-dark-mode';

interface IDisqusCommentsProps {
    id: string;
    title: string;
    slug: string;
}

const DisqusComments: FC<IDisqusCommentsProps> = ({ id, title, slug }) => {
    const [reloadDisqus, setReloadDisqus] = useState(false);
    const { value: isDark } = useDarkMode();

    useEffect(() => {
        setReloadDisqus(true);
        const reloadTimer = setTimeout(() => {
            setReloadDisqus(false);
        }, 1);

        return () => {
            clearTimeout(reloadTimer);
        };
    }, [isDark]);

    return (
        <DisqusWrapper>
            {reloadDisqus ? (
                'Loading disqus...'
            ) : (
                <DiscussionEmbed
                    shortname="blog-mwiatr-live"
                    config={{
                        url: `https://blog.mwiatr.live/post/${slug}`,
                        identifier: id,
                        title: title,
                        language: 'en',
                    }}
                ></DiscussionEmbed>
            )}
        </DisqusWrapper>
    );
};

const DisqusWrapper = styled.div`
    & * {
        font-family: sans-serif;
    }
`;

export default DisqusComments;

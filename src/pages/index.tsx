import styled from '@emotion/styled';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Post } from '../gql/generated';
import mq from '@shared/utils/mediaQuery';
import { sdk } from '@gql/client';
import BaseLayout from '@components/Layout/BaseLayout';
import { MouseHoverEffect } from '@components/Mouse';
import { PostItem } from '@components/Post';
import { PrimaryText } from '@components/typography';

interface IHomeProps {
    posts: Post[];
}

const Home: FC<IHomeProps> = ({ posts }) => {
    const { t } = useTranslation('common');

    return (
        <BaseLayout>
            <HeroHeader>
                <HeroTitle>
                    <Trans
                        i18nKey="heroText"
                        t={t}
                        components={[<HoverablePrimaryText />]}
                    />
                </HeroTitle>
                <HeroDescription>{t('heroDescription')}</HeroDescription>
            </HeroHeader>
            <PostHeader>{t('postSectionHeader')}</PostHeader>
            <PostList>
                {posts.map((post) => {
                    return (
                        <Link
                            href={`/post/${post.slug}`}
                            key={post.id}
                            passHref
                        >
                            <a href="/">
                                <PostItem
                                    url={post.coverImage.url}
                                    text={post.content.text}
                                    title={post.title}
                                ></PostItem>
                            </a>
                        </Link>
                    );
                })}
            </PostList>
        </BaseLayout>
    );
};

export async function getStaticProps({ locale }) {
    const data = await sdk.getAllPosts();

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'navbar'])),
            posts: data.posts,
        },
    };
}

const HeroHeader = styled.header`
    width: 100%;
    margin-top: 5rem;
    margin-bottom: 5rem;
`;

const HeroTitle = styled.h1`
    font-size: 4rem;
    width: 60%;
    line-height: 4rem;
    margin-bottom: 2rem;
    font-weight: 700;

    @media ${mq('lg')} {
        width: 75%;
        font-size: 3.5rem;
    }

    @media ${mq('md')} {
        width: 100%;
        font-size: 2.5rem;
    }

    @media ${mq('sm')} {
        line-height: 3rem;
    }
`;

const HeroDescription = styled.p`
    font-size: 1rem;
    padding-top: 1rem !important;
`;

const PostHeader = styled.h2`
    font-weight: 700;
`;

const PostList = styled.ul`
    width: 100%;
    display: grid;
    list-style: none;
    padding-left: 0;
    gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    @media ${mq('md')} {
        grid-template-columns: 1fr 1fr;
    }
`;

const HoverablePrimaryText = ({ children = null }) => (
    <MouseHoverEffect img="/img/prof.jpg">
        <PrimaryText>{children}</PrimaryText>
    </MouseHoverEffect>
);

export default Home;

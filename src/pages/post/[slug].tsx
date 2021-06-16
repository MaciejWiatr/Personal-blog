import styled from '@emotion/styled';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Markdown from '../../components/Markdown';
import { getAllPostsQuery } from '../../gql/queries';
import mq from '../../shared/utils/mediaQuery';
import gqClient, { sdk } from '@gql/client';
import { Post } from '@gql/generated';
import BaseLayout from '@components/Layout/BaseLayout';

const DisqusComments = dynamic(
    () => import('@components/Comments/DisqusComments'),
    {
        ssr: false,
    }
);

const PostPage = ({ post }: { post: Post }) => {
    return (
        <BaseLayout>
            <PostImageWrapper>
                <ArticleTitle>{post.title}</ArticleTitle>
                <Image
                    src={post.coverImage.url}
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                ></Image>
            </PostImageWrapper>
            <MarkdownWrapper>
                <Markdown markdown={post.content.markdown} />
            </MarkdownWrapper>
            <DisqusComments id={post.id} slug={post.slug} title={post.title} />
        </BaseLayout>
    );
};

const MarkdownWrapper = styled.div`
    padding: 2.5rem;
`;

const ArticleTitle = styled.h2`
    position: relative;
    z-index: 50;
    color: white;
    margin: 0;
    font-size: 2.5rem;
`;

const PostImageWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 20rem;
    overflow: hidden;
    border-radius: 1rem;
    padding: 2rem;

    @media ${mq('sm')} {
        height: 10rem;
    }
`;

export async function getStaticPaths() {
    const { posts } = await gqClient.request(getAllPostsQuery);

    const paths = [];

    posts.forEach((post) => {
        paths.push({
            params: { slug: post.slug },
            locale: 'en',
        });
        paths.push({ params: { slug: post.slug }, locale: 'pl' });
    });

    return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
    const { post } = await sdk.getPostBySlug({
        slug: params.slug,
    });

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'navbar'])),
            post,
        },
    };
}

export default PostPage;

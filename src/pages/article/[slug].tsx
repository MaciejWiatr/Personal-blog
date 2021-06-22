import styled from '@emotion/styled';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import Markdown from '../../components/Markdown';
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
            <ArticleWrapper>
                <ArticleHeader>
                    <ArticleTitle>{post.title}</ArticleTitle>
                    <ArticleTagList>
                        {post.tags.map((tag, index) => {
                            return <ArticleTag key={index}>{tag}</ArticleTag>;
                        })}
                    </ArticleTagList>
                    <ArticleHeaderDimmer />
                    <Image
                        src={post.coverImage.url}
                        layout="fill"
                        objectFit="cover"
                        quality={80}
                    ></Image>
                </ArticleHeader>
                <MarkdownWrapper>
                    <div
                        dangerouslySetInnerHTML={{ __html: post.content.html }}
                    />
                    {/* <Markdown markdown={post.content.markdown} /> */}
                </MarkdownWrapper>
                <DisqusComments
                    id={post.id}
                    slug={post.slug}
                    title={post.title}
                />
            </ArticleWrapper>
        </BaseLayout>
    );
};

const MarkdownWrapper = styled.div`
    padding: 2.5rem;
    width: 100%;
    font-family: 'Open sans';

    & img {
        max-width: 100% !important;
        height: auto;
    }

    @media ${mq('sm')} {
        padding: 1rem;
    }
`;

const ArticleWrapper = styled.article``;

const ArticleTagList = styled.ul`
    position: relative;
    display: flex;
    z-index: 97;
    padding: 0;
    list-style: none;
    margin: 0.5rem 0rem;
`;

const ArticleTag = styled.li`
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

const ArticleTitle = styled.h2`
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

const ArticleHeader = styled.header`
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

    @media ${mq('sm')} {
        height: 10rem;
        padding: 0.5rem 1rem;
    }
`;

const ArticleHeaderDimmer = styled.div`
    z-index: 20;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.6;
    top: 0;
    left: 0;
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

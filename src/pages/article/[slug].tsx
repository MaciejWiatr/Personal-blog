import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {useTranslation} from 'react-i18next';
// import Markdown from '../../components/Markdown';
import {getAllPostsQuery} from '../../gql/queries';
import timeToRead from '@shared/utils/timeToRead';
import gqClient, {sdk} from '@gql/client';
import {Post} from '@gql/generated';
import BaseLayout from '@components/Layout/BaseLayout';
import {
    ArticleHeader,
    ArticleHeaderDimmer,
    ArticleReadTime,
    ArticleTag,
    ArticleTagList,
    ArticleTitle,
    ArticleWrapper,
    ArticleMarkdownWrapper
} from "@components/Article";

const DisqusComments = dynamic(
    () => import('@components/Comments/DisqusComments'),
    {
        ssr: false,
    }
);

const PostPage = ({ post }: { post: Post }) => {
    const { t } = useTranslation('common');

    return (
        <BaseLayout>
            <ArticleWrapper>
                <ArticleHeader>
                    <ArticleReadTime>
                        {post.author.name} · {t('timeToRead')}:{' '}
                        {timeToRead(post.content.html)} min
                    </ArticleReadTime>
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
                    />
                </ArticleHeader>
                <ArticleMarkdownWrapper>
                    <div
                        dangerouslySetInnerHTML={{ __html: post.content.html }}
                    />
                    {/* <Markdown markdown={post.content.markdown} /> */}
                </ArticleMarkdownWrapper>
                <DisqusComments
                    id={post.id}
                    slug={post.slug}
                    title={post.title}
                />
            </ArticleWrapper>
        </BaseLayout>
    );
};

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

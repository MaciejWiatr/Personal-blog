import BaseLayout from "../../components/layout/BaseLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AnimatePresence, motion } from "framer-motion";
import styled from "@emotion/styled";
import gqClient, { sdk } from "../../gql/client";
import { getAllPostsQuery, getPostBySlugQuery } from "../../gql/queries";
import { GetPostBySlugQuery, Post } from "../../gql/generated";

const PostPage = ({ post }: { post: Post }) => {
	return (
		<BaseLayout>
			<PostImageWrapper>
				<PostImage src={post.coverImage.url} />
			</PostImageWrapper>
			{post.content.markdown} 
		</BaseLayout>
	);
};

const PostImage = styled(motion.img)`
	width: 100%;
`;
const PostImageWrapper = styled.div`
	width: 100%;
	border-radius: 1rem;
	overflow: hidden;
`;

export async function getStaticPaths() {
	const { posts } = await gqClient.request(getAllPostsQuery);


	const paths = [];

	posts.forEach((post) => {
		paths.push({
			params: { slug: post.slug },
			locale: "en",
		});
		paths.push({ params: { slug: post.slug }, locale: "pl" });
	});

	return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
	const { post } = await sdk.getPostBySlug({
		slug: params.slug,
	});

	return {
		props: {
			...(await serverSideTranslations(locale, ["common", "navbar"])),
			post,
		},
	};
}

export default PostPage;

import BaseLayout from "../../components/layout/BaseLayout";
import { initializeApollo } from "../../lib/apolloClient";
import { getAllPosts, getPostBySlug } from "../../gql/posts.graphql";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AnimatePresence, motion } from "framer-motion";
import { Post } from "../../generated/graphql";
import styled from "@emotion/styled";

const PostPage = ({ post }: { post: Post }) => {
	return (
		<BaseLayout>
			<AnimatePresence>
				{post.coverImage.url && (
					<PostImageWrapper>
						<PostImage
							layoutId={`image-${post.id}`}
							src={post.coverImage.url}
						/>
					</PostImageWrapper>
				)}
			</AnimatePresence>
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
	const apolloClient = initializeApollo();
	const { data } = await apolloClient.query({ query: getAllPosts });

	const paths = [];

	data.posts.forEach((post) => {
		paths.push({
			params: { slug: post.slug },
			locale: "en",
		});
		paths.push({ params: { slug: post.slug }, locale: "pl" });
	});

	return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
	const apolloClient = initializeApollo();
	const { data } = await apolloClient.query({
		query: getPostBySlug,
		variables: { slug: params.slug },
	});
	return {
		props: {
			...(await serverSideTranslations(locale, ["common", "navbar"])),
			post: data.post,
		},
	};
}

export default PostPage;

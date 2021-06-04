import BaseLayout from "../../components/layout/BaseLayout";
import { initializeApollo } from "../../lib/apolloClient";
/// <reference path="../../gql/graphql.d.ts" />
import { getAllPosts, getPostBySlug } from "../../gql/posts.graphql";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const PostPage = () => {
	return <BaseLayout>hello</BaseLayout>;
};

export async function getStaticPaths() {
	const apolloClient = initializeApollo();
	const { data } = await apolloClient.query({ query: getAllPosts });

	const paths = data.posts.map((post) => ({
		params: { slug: post.slug },
		locale: "en",
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
	const apolloClient = initializeApollo();
	const { data } = await apolloClient.query({
		query: getPostBySlug,
		variables: { slug: params.slug },
	});

	console.log(data);

	return {
		props: {
			...(await serverSideTranslations(locale, ["common", "navbar"])),
			post: data.post,
		},
	};
}

export default PostPage;

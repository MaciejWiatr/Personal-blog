import styled from "@emotion/styled";
import { useContext } from "react";
import { ColormodeContext } from "../contexts/ThemeContext";
import mq from "../utils/mediaQuery";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Trans, useTranslation } from "react-i18next";
import { MouseHoverEffect } from "../components/MouseFollower";
import BaseLayout from "../components/layout/BaseLayout";
import { PrimaryText } from "../components/shared/text";
import {
	useGetAllPostsQuery,
	useGetPostBySlugQuery,
} from "../generated/graphql";
import { initializeApollo } from "../lib/apolloClient";
import Link from "next/link";
import { getAllPosts } from "../gql/posts.graphql";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
	const { t } = useTranslation("common");
	const { data } = useGetAllPostsQuery();

	return (
		<BaseLayout>
			<HomeTitle>
				<Trans
					i18nKey="heroText"
					t={t}
					components={[<HoverablePrimaryText />]}
				/>
			</HomeTitle>
			<HomeDescription>
				Mam nadzieję że znajdziesz tu coś dla siebie 😀
			</HomeDescription>
			<PostHeader>Moje wpisy:</PostHeader>
			<PostList>
				{data.posts.map((post) => {
					return (
						<Link href={`/post/${post.slug}`} passHref>
							<a>
								<PostElement>
									<PostImageWrapper>
										<AnimatePresence>
											<PostImage
												layoutId={`image-${post.id}`}
												src={post.coverImage.url}
											/>
										</AnimatePresence>
									</PostImageWrapper>
									<PostTitle>{post.title}</PostTitle>
								</PostElement>
							</a>
						</Link>
					);
				})}
			</PostList>
		</BaseLayout>
	);
}

export async function getStaticProps({ locale }) {
	const apolloClient = initializeApollo();
	await apolloClient.query({
		query: getAllPosts,
	});

	return {
		props: {
			...(await serverSideTranslations(locale, ["common", "navbar"])),
			__APOLLO_STATE__: apolloClient.cache.extract(),
		},
	};
}

const HomeTitle = styled.h1`
	font-size: 4rem;
	width: 50%;
	line-height: 4rem;
	margin-bottom: 2rem;

	@media ${mq("lg")} {
		width: 75%;
		font-size: 3.5rem;
	}

	@media ${mq("md")} {
		width: 100%;
		font-size: 2.5rem;
	}

	@media ${mq("sm")} {
		text-align: center;
		line-height: 3rem;
	}
`;

const HomeDescription = styled.p`
	font-size: 1rem;
`;

const PostHeader = styled.h2``;

const PostList = styled.ul`
	width: 100%;
	display: grid;
	list-style: none;
	padding-left: 0px;
	gap: 1rem;
	grid-template-columns: 1fr 1fr 1fr 1fr;

	@media ${mq("sm")} {
		grid-template-columns: 1fr 1fr;
	}
`;

const PostElement = styled.li`
	width: 100%;
	/* overflow: hidden; */
`;

const PostImage = styled(motion.img)`
	width: 100%;
	transform: scale(1.25);

	&:hover {
		transform: scale(1.1);
	}
`;

const PostImageWrapper = styled(motion.div)`
	overflow: hidden;
	border-radius: 1rem;
`;

const PostTitle = styled.h3`
	margin: 0px;
	margin-top: 0.5rem;
`;

const HoverablePrimaryText = ({ children }) => (
	<MouseHoverEffect img="/img/prof.jpg">
		<PrimaryText>{children}</PrimaryText>
	</MouseHoverEffect>
);

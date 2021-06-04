import styled from "@emotion/styled";
import mq from "../utils/mediaQuery";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Trans, useTranslation } from "react-i18next";
import { MouseHoverEffect } from "../components/MouseFollower";
import BaseLayout from "../components/layout/BaseLayout";
import { PrimaryText } from "../components/shared/text";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import gqClient from "../gql/client";
import { getAllPostsQuery } from "../gql/queries";

export default function Home({ posts }) {
	const { t } = useTranslation("common");

	return (
		<BaseLayout>
			<HomeTitle>
				<Trans
					i18nKey="heroText"
					t={t}
					components={[<HoverablePrimaryText />]}
				/>
			</HomeTitle>
			<HomeDescription>{t("heroDescription")}</HomeDescription>
			<PostHeader>{t("postSectionHeader")}</PostHeader>
			<PostList>
				{posts.map((post) => {
					return (
						<Link href={`/post/${post.slug}`} passHref>
							<a>
								<PostElement>
									<PostImageWrapper>
										<PostImage
											layoutId={`image-${post.id}`}
											src={post.coverImage.url}
										/>
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
	const data = await gqClient.request(getAllPostsQuery);

	return {
		props: {
			...(await serverSideTranslations(locale, ["common", "navbar"])),
			posts: data.posts,
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
	height: 15rem;
`;

const PostImage = styled.img`
	width: 100%;
	object-fit: cover;
	border-radius: 1rem;
`;

const PostImageWrapper = styled.div`
	overflow: hidden;
	border-radius: 1rem;
	object-fit: cover;
	/* height: 75%; */
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

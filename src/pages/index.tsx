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
import timeToRead from "../utils/timeToRead";

export default function Home({ posts }) {
	const { t } = useTranslation("common");

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
				<HeroDescription>{t("heroDescription")}</HeroDescription>
			</HeroHeader>
			<PostHeader>{t("postSectionHeader")}</PostHeader>
			<PostList>
				{posts.map((post) => {
					return (
						<Link href={`/post/${post.slug}`} passHref>
							<a>
								<PostElement>
									<PostImageWrapper>
										<PostImage
											initial={{ scale: 1.1 }}
											whileHover={{ scale: 1.25 }}
											src={post.coverImage.url}
										/>
									</PostImageWrapper>
									<PostDescription>
										<PostReadTime>
											{timeToRead(post.content.text)} min
											read
										</PostReadTime>
										<PostTitle>{post.title}</PostTitle>
									</PostDescription>
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

const PostDescription = styled.div`
	width: 100%;
	/* padding: 1rem; */
`;

const PostReadTime = styled.p`
	text-align: left;
	margin: 0px;
	margin-top: 0.25rem;
	margin-bottom: 0.25rem;
`;

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

	@media ${mq("lg")} {
		width: 75%;
		font-size: 3.5rem;
	}

	@media ${mq("md")} {
		width: 100%;
		font-size: 2.5rem;
	}

	@media ${mq("sm")} {
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
	padding-left: 0px;
	gap: 1rem;
	grid-template-columns: 1fr 1fr 1fr 1fr;

	@media ${mq("md")} {
		grid-template-columns: 1fr 1fr;
	}
`;

const PostElement = styled.li`
	width: 100%;
	position: relative;
	/* border: ${({ theme }) => theme.borderColor} 0.125rem solid;
	border-radius: 0.5rem; */
	overflow: hidden;
	/* padding: 0.5rem; */
	/* height: 15rem; */
`;

const PostImageWrapper = styled.div`
	width: 100%;
	border-radius: 0.25rem;
	overflow: hidden;
`;

const PostImage = styled(motion.img)`
	width: 100%;
	overflow: hidden;
	border-radius: 0.25rem;
	/* border-radius: 0.25rem; */
	/* border-top-right-radius: 0.5rem;
	border-top-left-radius: 0.5rem; */
`;

const PostTitle = styled.h3`
	margin: 0px;
	font-size: 1rem;
	font-weight: 700;
	flex-grow: 1;
	height: 3rem;
	transition: color 0.25s ease;

	&:hover {
		color: ${({ theme }) => theme.textPrimary};
	}

	@media ${mq("lg")} {
		padding-bottom: 2rem !important;
	}
`;

const HoverablePrimaryText = ({ children }) => (
	<MouseHoverEffect img="/img/prof.jpg">
		<PrimaryText>{children}</PrimaryText>
	</MouseHoverEffect>
);

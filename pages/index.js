import styled from "@emotion/styled";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import Navbar from "../src/components/shared/Navbar";
import { ColormodeContext } from "../src/contexts/ThemeContext";
import mq from "../src/utils/mediaQuery";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "../styles/Home.module.css";
import { Trans, useTranslation } from "react-i18next";
import { MouseHoverEffect } from "../src/components/MouseFollower";

export default function Home() {
	const { isDark, setDark } = useContext(ColormodeContext);
	const { t } = useTranslation("common");

	return (
		<HomeContainer>
			<Navbar />
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
		</HomeContainer>
	);
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common", "navbar"])),
		},
	};
}

const HomeContainer = styled.div`
	background-color: ${({ theme }) => theme.backgroundColor};
	color: ${({ theme }) => theme.textBase};
	min-height: 100vh;
	padding-top: 5rem;
	padding-left: 15rem;
	padding-right: 15rem;

	@media (max-width: 992px) {
		padding-left: 5rem;
		padding-right: 5rem;
	}

	@media ${mq("sm")} {
		padding-left: 1rem;
		padding-right: 1rem;
	}
`;

const HomeTitle = styled.h1`
	font-size: 4rem;
	width: 50%;
	line-height: 4.5rem;

	@media ${mq("lg")} {
		width: 75%;
		font-size: 3.5rem;
	}

	@media ${mq("md")} {
		width: 100%;
		font-size: 2.5rem;
	}
`;

const HomeDescription = styled.p``;

const PrimaryText = styled.span`
	color: ${({ theme }) => theme.textPrimary};
`;

const HoverablePrimaryText = ({ children }) => (
	<MouseHoverEffect img="/img/prof.jpg">
		<PrimaryText>{children}</PrimaryText>
	</MouseHoverEffect>
);

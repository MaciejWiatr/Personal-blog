import styled from "@emotion/styled";
import useDarkMode from "../hooks/useDarkMode";
import { motion, useAnimation } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import { MouseHoverEffect } from "./MouseFollower";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useMemo } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

const slowTransition = {
	type: "spring",
	damping: 15,
};

const bigHeaderVariants = {
	show: {
		y: 0,
		transition: slowTransition,
	},
	hide: {
		y: -200,
		transition: slowTransition,
	},
};

const smallHeaderVariants = {
	show: {
		x: 0,
		transition: slowTransition,
	},
	hide: {
		x: -200,
		transition: slowTransition,
	},
};

const NavBar = () => {
	const { isDark, toggleDark } = useDarkMode();
	const { t } = useTranslation("navbar");
	const { locale } = useRouter();
	const smallHeaderControlls = useAnimation();
	const bigHeaderControlls = useAnimation();
	const { isSm } = useMediaQuery();
	const animateHeader = useCallback(() => {
		console.log("Animated header");
		if (isSm) {
			bigHeaderControlls.start("hide");
			smallHeaderControlls.start("show");
		} else if (!isSm) {
			bigHeaderControlls.start("show");
			smallHeaderControlls.start("hide");
		}
		return;
	}, [isSm]);

	useEffect(() => {
		animateHeader();
	});

	return (
		<NavContainer>
			<Link href="/" passHref>
				<a>
					<NavHeader
						variants={bigHeaderVariants}
						animate={bigHeaderControlls}
					>
						Maciej Wiatr
					</NavHeader>
					<NavHeader
						variants={smallHeaderVariants}
						initial="hide"
						animate={smallHeaderControlls}
					>
						MW
					</NavHeader>
				</a>
			</Link>
			<NavItems>
				<NavItem>{t("posts")}</NavItem>
				<NavItem>{t("search")}</NavItem>
				<NavItem>{t("contact")}</NavItem>
				<NavItem>
					<Link href="/" locale={locale === "pl" ? "en" : "pl"}>
						<LanguageSwitchLink>
							<p>
								Switch to{" "}
								{locale === "pl" ? "english" : "polish"}
							</p>
						</LanguageSwitchLink>
					</Link>
				</NavItem>
				<NavItem>
					<MouseHoverEffect>
						<ColormodeButton
							whileHover={{ rotate: 360 }}
							onClick={toggleDark}
						>
							{isDark ? <FiSun /> : <FiMoon />}
						</ColormodeButton>
					</MouseHoverEffect>
				</NavItem>
			</NavItems>
		</NavContainer>
	);
};

const LanguageSwitchLink = styled.a`
	color: ${({ theme }) => theme.textBase};
	border: ${({ theme }) => theme.textBase} 0.1rem solid;
	height: 2rem;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 3rem;
	margin-right: -0.5rem;
	cursor: pointer !important;
`;

const NavContainer = styled.nav`
	overflow: hidden;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	height: 3rem;
`;

const NavHeader = styled(motion.h2)`
	font-size: 1.25rem;
	position: absolute;
	top: -0.4rem;
	left: 0;
`;

const NavItems = styled.ul`
	display: flex;
	list-style: none;
`;

const NavItem = styled.li`
	display: flex;
	align-items: center;
	z-index: 9;
	&:not(:last-child) {
		margin-right: 1rem;
	}
`;

const ColormodeButton = styled(motion.button)`
	cursor: pointer;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.textBase};
	border: ${({ theme }) => theme.textBase} 0.1rem solid;
	background: none;
	font-size: medium;
	height: 2rem;
	width: 2rem;
	border-radius: 50%;
	& > svg {
		transform: translateY(2px);
	}
`;

export default NavBar;

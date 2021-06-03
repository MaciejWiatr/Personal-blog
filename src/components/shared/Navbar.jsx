import styled from "@emotion/styled";
import useDarkMode from "../../hooks/useDarkMode";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import { MouseHoverEffect } from "../MouseFollower";

const NavBar = () => {
	const { isDark, toggleDark } = useDarkMode();
	const { t } = useTranslation("navbar");

	return (
		<NavContainer>
			<NavHeader>Maciej Wiatr</NavHeader>
			<NavItems>
				<NavItem>{t("posts")}</NavItem>
				<NavItem>{t("search")}</NavItem>
				<NavItem>{t("contact")}</NavItem>
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

const NavContainer = styled.nav`
	overflow: hidden;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const NavHeader = styled.h2`
	font-size: 1.25rem;
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

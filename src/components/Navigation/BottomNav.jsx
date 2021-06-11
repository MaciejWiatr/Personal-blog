import styled from "@emotion/styled";
import { useTranslation } from "next-i18next";

const BottomNav = () => {
	const { t } = useTranslation("navbar");

	return (
		<BottomNavContainer>
			<BNavItems>
				<BNavItem>{t("posts")}</BNavItem>
				<BNavItem>{t("search")}</BNavItem>
				<BNavItem>{t("contact")}</BNavItem>
			</BNavItems>
		</BottomNavContainer>
	);
};

const BottomNavContainer = styled.nav`
	position: fixed;
	display: flex;
	justify-content: center;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 4rem;
	background-color: ${({ theme }) => theme.textBase};
	color: ${({ theme }) => theme.backgroundColor};
`;

const BNavItems = styled.ul`
	display: flex;
	width: 100%;
	list-style: none;
	padding: 0px;
	gap: 1rem;
	justify-content: space-evenly;
`;

const BNavItem = styled.li`
	display: flex;
	justify-content: center;
	align-items: center;
	transition: color 0.25s ease;
	cursor: pointer;

	&:hover {
		color: ${({ theme }) => theme.textPrimary};
	}
`;

export default BottomNav;

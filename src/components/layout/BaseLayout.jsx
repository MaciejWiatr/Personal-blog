import { NavBar } from "../shared";
import styled from "@emotion/styled";
import mq from "../../utils/mediaQuery";
import { motion } from "framer-motion";

const BaseLayout = ({ children }) => {
	return (
		<MainContainer>
			<NavBar />
			{children}
		</MainContainer>
	);
};

const MainContainer = styled.div`
	background-color: ${({ theme }) => theme.backgroundColor};
	color: ${({ theme }) => theme.textBase};
	min-height: 100vh;
	padding-top: 5rem;
	padding-left: 15rem;
	padding-right: 15rem;

	@media ${mq("md")} {
		padding-left: 5rem;
		padding-right: 5rem;
	}

	@media ${mq("sm")} {
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 1rem;
	}
`;

export default BaseLayout;

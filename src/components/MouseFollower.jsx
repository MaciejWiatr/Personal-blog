import styled from "@emotion/styled";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useMouse, useHover } from "react-use";
import { useContext, useEffect, useState, createContext } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import useMouseStore from "../store/useMouseStore";

const getMousePosOrDefault = (pos, isSm) => {
	if (isSm) return -500;
	if (pos) return pos - 20;
	return -100;
};

const MouseFollower = ({ appRef }) => {
	const { isSm } = useMediaQuery();
	const { docX, docY } = useMouse(appRef);
	const { isHovered, hoverImg } = useMouseStore();

	return (
		<MouseCircle
			animate={{
				x: getMousePosOrDefault(docX, isSm),
				y: getMousePosOrDefault(docY, isSm),
				scale: isHovered ? 3 : 1,
			}}
			transition={{
				x: {
					type: "spring",
					stiffness: 150,
					damping: 15,
				},
				y: {
					type: "spring",
					stiffness: 150,
					damping: 15,
				},
			}}
		>
			<AnimatePresence exitBeforeEnter>
				{hoverImg && (
					<MouseImage
						loading="lazy"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.3 }}
						exit={{ opacity: 0 }}
						src={hoverImg}
					/>
				)}
			</AnimatePresence>
		</MouseCircle>
	);
};

const MouseCircle = styled(motion.div)`
	position: absolute;
	height: 2.5rem;
	width: 2.5rem;
	border-radius: 50%;
	pointer-events: none;
	/* background-color: red; */
	backdrop-filter: invert(100%);
	object-fit: cover;
	overflow: hidden;
	z-index: 99;
`;

const MouseImage = styled(motion.img)`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const MouseHoverEffect = ({ children, img = null, scale = 3 }) => {
	const { isHovered, setHovered, setHoverImg, resetState } = useMouseStore();

	const handleMouseEnter = () => {
		if (!isHovered) {
			setHovered(true);
			if (img) setHoverImg(img);
		}
	};

	const handleMouseLeave = () => {
		resetState();
	};

	return (
		<HoverArea onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
			{children}
		</HoverArea>
	);
};

const HoverArea = styled.span`
	&:hover {
		cursor: pointer;
	}
`;

export default MouseFollower;
export { MouseHoverEffect };

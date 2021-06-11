import styled from "@emotion/styled";
import useMouseStore from "../../shared/store/useMouseStore";

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

export const HoverArea = styled.span`
	&:hover {
		cursor: pointer;
	}
`;

export default MouseHoverEffect;

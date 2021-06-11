import styled from '@emotion/styled';
import { FC } from 'react';
import { ReactNode } from 'react';
import useMouseStore from '../../shared/store/useMouseStore';

interface IMouseHoverEffectProps {
    children: ReactNode;
    img?: null | string;
}

const MouseHoverEffect: FC<IMouseHoverEffectProps> = ({
    children,
    img = null,
}) => {
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

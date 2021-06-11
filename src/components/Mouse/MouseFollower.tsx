import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useMouse } from 'react-use';
import { getMousePosOrDefault } from './utils';
import useMediaQuery from '@hooks/useMediaQuery';
import useMouseStore from '@store/useMouseStore';

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
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                },
                y: {
                    type: 'spring',
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

export default MouseFollower;
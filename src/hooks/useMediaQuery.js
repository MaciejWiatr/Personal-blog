import { useMedia } from "react-use";

const useMediaQuery = () => {
	const isXs = useMedia("(max-width: 767px)");
	const isSm = useMedia("(max-width: 991px)");
	const isMd = useMedia("(max-width: 1999px)");
	const isLg = useMedia("(min-width: 1200px)");

	return { isXs, isSm, isMd, isLg };
};

export default useMediaQuery;

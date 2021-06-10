import { useContext } from "react";
import { ColormodeContext } from "../contexts/ThemeContext";

const useDarkMode = () => {
	return useContext(ColormodeContext);
};

export default useDarkMode;

import { ThemeProvider } from "@emotion/react";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { createContext } from "react";
import { darkTheme, lightTheme } from "../themes";
import { MouseContext } from "../components/MouseFollower";

const defaultThemeContextValue = "yes";
const ColormodeContext = createContext(defaultThemeContextValue);

const ColormodeProvider = ({ children }) => {
	const [isDark, setIsDark] = useState(false);
	const { setMouseState } = useContext(MouseContext);

	useEffect(() => {
		if (typeof window !== undefined) {
			const val = localStorage.getItem("dark");

			if (val === "yes") {
				setIsDark(true);
			} else if (val === "no") {
				setIsDark(false);
			} else {
				console.log("Default theme wasnt found, using light");
				setIsDark(false);
			}
		}
	}, []);

	const toggleDark = () => {
		if (isDark) {
			setIsDark(false);
			localStorage.setItem("dark", "no");
		} else if (!isDark) {
			setIsDark(true);
			localStorage.setItem("dark", "yes");
		}
	};

	return (
		<ColormodeContext.Provider value={{ isDark, toggleDark }}>
			<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
				{children}
			</ThemeProvider>
		</ColormodeContext.Provider>
	);
};

export { ColormodeContext };
export default ColormodeProvider;

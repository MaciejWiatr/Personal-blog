import { ThemeProvider } from "@emotion/react";
import useDarkMode from "use-dark-mode";
import { createContext } from "react";
import { darkTheme, lightTheme } from "../themes";

const defaultThemeContextValue = {
	isDark: false,
	toggleDark: () => {},
};

const ColormodeContext = createContext(defaultThemeContextValue);

const ColormodeProvider = ({ children }) => {
	const darkMode = useDarkMode(false);

	const toggleDark = darkMode.toggle;

	return (
		<ColormodeContext.Provider
			value={{ isDark: darkMode.value, toggleDark }}
		>
			<ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
				{children}
			</ThemeProvider>
		</ColormodeContext.Provider>
	);
};

export { ColormodeContext };
export default ColormodeProvider;

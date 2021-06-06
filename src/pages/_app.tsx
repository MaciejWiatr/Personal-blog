import { appWithTranslation } from "next-i18next";
import { useRef } from "react";
import { MouseContextProvider } from "../contexts/MouseContext";
import { AppWrapper } from "../components/shared";
import ColormodeProvider from "../contexts/ThemeContext";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }) {
	const appRef = useRef(null);

	return (
		<AppWrapper ref={appRef}>
			<MouseContextProvider appRef={appRef}>
				<ColormodeProvider>
					<Component {...pageProps} />
				</ColormodeProvider>
			</MouseContextProvider>
		</AppWrapper>
	);
}

export default appWithTranslation(MyApp);

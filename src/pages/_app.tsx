import { appWithTranslation } from "next-i18next";
import { useRef } from "react";
import { AppWrapper } from "../components/shared";
import ColormodeProvider from "../contexts/ThemeContext";
import "../../styles/globals.css";
import MouseFollower from "../components/MouseFollower";

function MyApp({ Component, pageProps }) {
	const appRef = useRef(null);

	return (
		<AppWrapper ref={appRef}>
			<MouseFollower appRef={appRef} />
			<ColormodeProvider>
				<Component {...pageProps} />
			</ColormodeProvider>
		</AppWrapper>
	);
}

export default appWithTranslation(MyApp);

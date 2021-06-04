import { appWithTranslation } from "next-i18next";
import { useRef } from "react";
import MouseFollower, { MouseHoverContext } from "../components/MouseFollower";
import { AppWrapper } from "../components/shared";
import ColormodeProvider from "../contexts/ThemeContext";
import "../../styles/globals.css";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";

function MyApp({ Component, pageProps }) {
	const appRef = useRef(null);

	return (
		<AppWrapper ref={appRef}>
			<MouseHoverContext appRef={appRef}>
				<ColormodeProvider>
					<Component {...pageProps} />
				</ColormodeProvider>
			</MouseHoverContext>
		</AppWrapper>
	);
}

export default appWithTranslation(MyApp);

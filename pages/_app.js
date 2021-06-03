import { appWithTranslation } from "next-i18next";
import { useRef } from "react";
import MouseFollower, {
	MouseHoverContext,
} from "../src/components/MouseFollower";
import ColormodeProvider from "../src/contexts/ThemeContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	const appRef = useRef(null);
	return (
		<div ref={appRef}>
			<MouseHoverContext appRef={appRef}>
				<MouseFollower />
				<ColormodeProvider>
					<Component {...pageProps} />
				</ColormodeProvider>
			</MouseHoverContext>
		</div>
	);
}

export default appWithTranslation(MyApp);

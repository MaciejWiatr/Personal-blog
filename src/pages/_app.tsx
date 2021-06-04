import { ApolloProvider } from "@apollo/client";
import { appWithTranslation } from "next-i18next";
import { useRef } from "react";
import MouseFollower, { MouseHoverContext } from "../components/MouseFollower";
import { AppWrapper } from "../components/shared";
import ColormodeProvider from "../contexts/ThemeContext";
import { useGetPostBySlugQuery } from "../generated/graphql";
import { useApollo } from "../lib/apolloClient";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }) {
	const apolloClient = useApollo(pageProps);
	const appRef = useRef(null);

	return (
		<ApolloProvider client={apolloClient}>
			<AppWrapper ref={appRef}>
				<MouseHoverContext appRef={appRef}>
					<ColormodeProvider>
						<Component {...pageProps} />
					</ColormodeProvider>
				</MouseHoverContext>
			</AppWrapper>
		</ApolloProvider>
	);
}

export default appWithTranslation(MyApp);

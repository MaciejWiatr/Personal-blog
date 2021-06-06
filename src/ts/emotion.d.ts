import "@emotion/react";

declare module "@emotion/react" {
	export interface Theme {
		backgroundColor: string;
		textBase: string;
		textPrimary: string;
		borderColor: string;
	}
}

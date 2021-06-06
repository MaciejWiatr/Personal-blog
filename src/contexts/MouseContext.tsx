import { createContext, useState } from "react";
import MouseFollower from "../components/MouseFollower";

const defaultMouseState = {
	isHovered: false,
	hoverImg: null,
};
const MouseContext = createContext(defaultMouseState);

const MouseContextProvider = ({ children, appRef }) => {
	const [mouseState, setMouseState] = useState(defaultMouseState);

	return (
		<MouseContext.Provider value={{ mouseState, setMouseState, appRef }}>
			<MouseFollower />
			{children}
		</MouseContext.Provider>
	);
};

export { MouseContextProvider, MouseContext };

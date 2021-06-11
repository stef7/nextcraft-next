import React from "react";
import "../styles/global.css";
import type { AppProps } from "next/app";

export interface AppState {
	num: number;
}
export interface AppContextProps {
	state: AppState;
	setState: React.Dispatch<React.SetStateAction<AppState>>;
}
export const AppContext = React.createContext<AppContextProps>(null);
export const useApp = () => React.useContext(AppContext);

function App({ Component: PageComponent, pageProps }: AppProps) {
	const initialState: AppState = {
		num: 0,
	};

	const [state, setState] = React.useState(initialState);

	return (
		<AppContext.Provider value={{ state, setState }}>
			<PageComponent {...{ ...pageProps }} />
		</AppContext.Provider>
	);
}

export default App;

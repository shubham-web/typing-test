import { createContext, Dispatch, useContext, useReducer } from "react";
import appReducer, { Action } from "./appReducer";
import defaultState from "./defaultState";

const AppContext = createContext(defaultState);
const DispatchContext = createContext(null as unknown as Dispatch<Action>);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [data, dispatch] = useReducer(appReducer, defaultState);
	return (
		<AppContext.Provider value={data}>
			<DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
		</AppContext.Provider>
	);
};

// Hooks to use context
export const useAppState = () => {
	return useContext(AppContext);
};
export const useDispatch = () => {
	return useContext(DispatchContext);
};

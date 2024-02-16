import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postsSlice from "./reducers/postsSlice.ts";

const rootReducer = combineReducers({
	postsSlice
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
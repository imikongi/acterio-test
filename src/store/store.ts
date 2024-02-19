import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postsSlice from "./reducers/posts/postsSlice.ts";
import postSlice from "./reducers/post/postSlice.ts";

const rootReducer = combineReducers({
	postsSlice,
	postSlice
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
import {createSlice} from "@reduxjs/toolkit";
import {getAllPosts} from "./postsThunk.ts";

interface PostsState {
	posts: IPost[],
	isLoading: boolean,
	error: string | undefined
}

const initialState: PostsState = {
	posts: [],
	isLoading: false,
	error: '',
}

const postsSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPosts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getAllPosts.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = ''
				state.posts = action.payload
			})
			.addCase(getAllPosts.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
			})
	}
})

export default postsSlice.reducer
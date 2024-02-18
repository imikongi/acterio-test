import {createSelector, createSlice} from "@reduxjs/toolkit";
import {getAllPosts} from "./postsThunk.ts";
import {IPost} from "../../models/IPost.ts";
import {RootState} from "../store.ts";

interface PostsState {
	posts: IPost[],
	isLoading: boolean,
	error: string | undefined
	searchQuery: string
}

const initialState: PostsState = {
	posts: [],
	isLoading: false,
	error: '',
	searchQuery: ''
}

const postsSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		queryChanging(state, action){
			state.searchQuery = action.payload
		},

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

const posts = (state: RootState) => state.postsSlice.posts
const query = (state: RootState) => state.postsSlice.searchQuery

export const filteredPostsSelector = createSelector(
	[posts, query],
	(posts, query) =>{
		if(!query.trim()) return posts
		return posts.filter(post => {
			return post.title.toLowerCase().includes(query.toLowerCase())
		})
	}
)

export const {queryChanging} = postsSlice.actions

export default postsSlice.reducer
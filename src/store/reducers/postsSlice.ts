import {createSlice} from "@reduxjs/toolkit";
import {getAllPosts} from "./postsThunk.ts";
import {IPost} from "../../models/IPost.ts";

interface PostsState {
	posts: IPost[],
	isLoading: boolean,
	error: string | undefined
	searchQuery: string
	chosenTags: string[]
}

const initialState: PostsState = {
	posts: [],
	isLoading: false,
	error: '',
	searchQuery: '',
	chosenTags: []
}

const postsSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		queryChanging(state, action){
			state.searchQuery = action.payload
		},
		addRemoveTag(state, action){
			if(!state.chosenTags.includes(action.payload)){
				state.chosenTags.push(action.payload)
			} else {
				state.chosenTags = state.chosenTags.filter(tag => tag !== action.payload)
			}
		}
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



export const {queryChanging, addRemoveTag} = postsSlice.actions

export default postsSlice.reducer
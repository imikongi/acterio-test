import {createSlice} from "@reduxjs/toolkit";
import {getSelectedPost} from "./postThunk.ts";
import {IPost} from "../../../models/IPost.ts";

interface PostsState {
	selectedPost: IPost | null,
	isLoading: boolean,
	error: string | undefined
	isLiked: boolean
}

const initialState: PostsState = {
	selectedPost: null,
	isLoading: false,
	error: '',
	isLiked: false
}

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		checkLocal(state, action){
			const {isLiked, reactions} = action.payload
			state.isLiked = isLiked
			if (state.selectedPost) {
				state.selectedPost.reactions = reactions;
			}
		},
		addRemoveLike(state) {
			if (state.selectedPost) {
				state.isLiked = !state.isLiked
				state.selectedPost.reactions += state.isLiked ? 1 : -1

				localStorage.setItem(`likedPost_${state.selectedPost.id}`, JSON.stringify({
					isLiked: state.isLiked,
					reactions: state.selectedPost.reactions
				}));
			}
		},

	},
	extraReducers: (builder) => {
		builder
			.addCase(getSelectedPost.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getSelectedPost.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = ''
				state.selectedPost = action.payload
			})
			.addCase(getSelectedPost.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
			})
	}
})

export const {addRemoveLike, checkLocal} = postSlice.actions

export default postSlice.reducer
import {RootState} from "../../store.ts";
import {createSelector} from "@reduxjs/toolkit";

export const posts = (state: RootState) => state.postsSlice.posts
const query = (state: RootState) => state.postsSlice.searchQuery

export const searchPostsSelector = createSelector(
	[posts, query],
	(posts, query) =>{
		if(!query.trim()) return posts
		return posts.filter(post => {
			return post.title.toLowerCase().includes(query.toLowerCase())
		})
	}
)
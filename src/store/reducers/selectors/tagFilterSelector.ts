import {createSelector} from "@reduxjs/toolkit";
import {posts} from "./searchPostsSelector.ts";
import {RootState} from "../../store.ts";

const chosenTags = (state: RootState) => state.postsSlice.chosenTags

export const tagFilterSelector = createSelector(
	[posts, chosenTags],
	(posts, chosenTags) => {
		if(chosenTags.length === 0) return posts
		return posts.filter(post => {
				return chosenTags.every(tag => post.tags.includes(tag))
			}
		)
	}
)
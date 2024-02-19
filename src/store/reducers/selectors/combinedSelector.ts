import {createSelector} from "@reduxjs/toolkit";
import {searchPostsSelector} from "./searchPostsSelector.ts";
import {tagFilterSelector} from "./tagFilterSelector.ts";

export const combinedSelector = createSelector(
	[searchPostsSelector, tagFilterSelector],
	(searchPostsSelector, tagFilterSelector) => {
		return searchPostsSelector.filter(post => tagFilterSelector.includes(post))
	}
)
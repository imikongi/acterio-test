import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk(
	'posts/getAll',
	async () => {
		const response = await axios.get('https://dummyjson.com/posts')
		return response.data.posts
	}
)


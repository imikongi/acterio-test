import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getSelectedPost = createAsyncThunk(
	'posts/getSelected',
	async (id: string) => {
		const response = await axios.get(`https://dummyjson.com/posts/${id}`)
		return response.data
	}
)
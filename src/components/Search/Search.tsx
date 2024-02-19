import {TextField} from "@mui/material";
import {useAppDispatch} from "../../hooks/redux.ts";
import {queryChanging} from "../../store/reducers/posts/postsSlice.ts";
import React, {useEffect, useState} from "react";
import { debounce } from 'lodash';

const Search = () => {
	const dispatch = useAppDispatch()
	const [query, setQuery] = useState('')
	//debounce for better performance
	const debouncedQueryUpdate = debounce((value: string) => {
		dispatch(queryChanging(value))
	}, 300)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
		const value = event.target.value
		setQuery(value)
		debouncedQueryUpdate(value)
	}

	useEffect(() => {
		return () => {
			debouncedQueryUpdate.cancel();
		};
	}, []);

	return (
		<div style={{width:500}}>
			<TextField
				value={query}
				onChange={handleChange}
				id="search-field"
				label="Search"
				variant="outlined"
				fullWidth />
		</div>
	);
};

export default Search;
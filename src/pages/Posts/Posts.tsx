import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {getAllPosts} from "../../store/reducers/postsThunk.ts";
import {CircularProgress, Grid} from "@mui/material";
import MyCard from "../../components/Card/MyCard.tsx";


const Posts = () => {
	const dispatch = useAppDispatch()
	const {posts, isLoading, error} = useAppSelector(state => state.postsSlice)

	useEffect(() => {
		dispatch(getAllPosts())
	}, []);


	return (
		<div>
			{error && error}
			{isLoading && <CircularProgress/>}

			<Grid container spacing={2} alignItems='start'>
				{posts && posts.map((post) => {
					return (
						<Grid item xs={12} sm={6} md={4}>
								<MyCard post={post}/>
						</Grid>
					)
				})}
			</Grid>
		</div>
	);
};

export default Posts;
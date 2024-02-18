import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {getAllPosts} from "../../store/reducers/postsThunk.ts";
import {CircularProgress, Grid} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MyCard from "../../components/Card/MyCard.tsx";
import Search from "../../components/Search/Search.tsx";
import styles from './Posts.module.css'
import {Link} from "react-router-dom";
import {filteredPostsSelector} from "../../store/reducers/postsSlice.ts";


const Posts = () => {
	const dispatch = useAppDispatch()
	const {isLoading, error} = useAppSelector(state => state.postsSlice)
	const filteredPosts = useAppSelector(filteredPostsSelector)

	useEffect(() => {
		dispatch(getAllPosts())
	}, [dispatch]);

	if (error) {
		return <div>{error}</div>;
	}

	if (isLoading && !error) {
		return <CircularProgress/>;
	}

	return (
		<div className={styles.mainWrapper}>
			<div className={styles.searchWrapper}>
				<Link to={'/'}>
					<HomeIcon fontSize='large'/>
				</Link>
				<Search/>
			</div>

			<Grid container spacing={2} alignItems='start'>
				{filteredPosts && filteredPosts.map((post) => {
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
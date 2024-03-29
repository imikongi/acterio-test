import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {getAllPosts} from "../../store/reducers/posts/postsThunk.ts";
import {CircularProgress, Grid} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MyCard from "../../components/Card/MyCard.tsx";
import Search from "../../components/Search/Search.tsx";
import styles from './Posts.module.css'
import {Link} from "react-router-dom";
import {combinedSelector} from "../../store/reducers/selectors/combinedSelector.ts";


const Posts = () => {
	const dispatch = useAppDispatch()
	const {isLoading, error} = useAppSelector(state => state.postsSlice)
	const filteredAndSearchedPosts = useAppSelector(combinedSelector)


	useEffect(() => {
		dispatch(getAllPosts())
	}, [dispatch]);

	if (error) {
		return <div className={styles.centralizer}>{error}</div>;
	}

	if (isLoading && !error) {
		return <div className={styles.centralizer}><CircularProgress/></div>;
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
				{filteredAndSearchedPosts && filteredAndSearchedPosts.map((post) => {
					return (
						<Grid key={post.id} item xs={12} sm={6} md={4}>
							<MyCard post={post} detailedView={false}/>
						</Grid>
					)
				})}
			</Grid>
		</div>
	);
};

export default Posts;
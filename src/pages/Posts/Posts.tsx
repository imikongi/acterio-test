import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {getAllPosts} from "../../store/reducers/postsThunk.ts";


const Posts = () => {
	const dispatch = useAppDispatch()
	const {posts, isLoading, error} = useAppSelector(state => state.postsSlice)

	useEffect(() => {
		dispatch(getAllPosts())
	}, []);


	return (
		<div>
			{posts && posts.map(post => <div>{post.id}</div>)}
		</div>
	);
};

export default Posts;
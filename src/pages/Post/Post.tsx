import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import MyCard from "../../components/Card/MyCard.tsx";
import {CircularProgress} from "@mui/material";
import styles from './Post.module.css'
import {getSelectedPost} from "../../store/reducers/post/postThunk.ts";


const Post = () => {
	const {postId} = useParams()
	const dispatch = useAppDispatch()
	const selectedPost = useAppSelector(state => state.postSlice.selectedPost)

	useEffect(() => {
		if(postId) {
			dispatch(getSelectedPost(postId))
		}
	}, [dispatch, postId]);

	if(!selectedPost){
		return <CircularProgress/>
	}
	
	return (
		<div className={styles.wrapper}>


			<MyCard post={selectedPost} detailedView={true}/>
		</div>
	);
};

export default Post;
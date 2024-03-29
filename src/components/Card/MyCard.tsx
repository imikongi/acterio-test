import {Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {IPost} from "../../models/IPost.ts";
import Tags from "../Tags/Tags.tsx";
import styles from './MyCards.module.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux.ts";
import {addRemoveLike, applyLocal} from "../../store/reducers/post/postSlice.ts";
import {removePost} from "../../store/reducers/posts/postsSlice.ts";

type MyCardProps = {
	post: IPost
	detailedView: boolean
}

export const MyCard: React.FC<MyCardProps> = ({post, detailedView}) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		//checking for saved data in localStorage
		const savedData = JSON.parse(localStorage.getItem(`likedPost_${post.id}`) || '{}')
		if (savedData) {
			dispatch(applyLocal({
				isLiked: savedData.isLiked || false,
				reactions: savedData.reactions || post.reactions
			}))
		}

	}, [dispatch, post.id, post.reactions]);

	const handleLike = () => {
		dispatch(addRemoveLike())
	}

	const handleRemove = (id: number) => {
		dispatch(removePost(id))
	}

	return (
		<div>
			<Card className={detailedView ? styles.cardBig : styles.cardSmall}>
				<CardHeader
					avatar={<Avatar src={`/assets/${post.userId}.png`}/>}
					title={<Typography
						style={{width: 250, textAlign: 'left'}}
						variant={`${detailedView ? 'body2' : 'subtitle2'}`}>
						{post.title}
						</Typography>}
					subheaderTypographyProps={{align: 'left'}}
					subheader={<Tags tags={post.tags} detailedView={detailedView}/>}
				/>
				<CardContent sx={{paddingTop: 0, paddingBottom: 0, textAlign: 'left'}}>
					<Typography variant={`${detailedView ? 'body2' : 'caption'}`}>
						{post.body}
					</Typography>
					<div
						className={styles.fadeTextOverlay}
						style={{paddingBottom: 5}}>
					</div>
				</CardContent>
				{/*showing like functionality in detailed view*/}
				{detailedView
					? <CardActions disableSpacing sx={{paddingLeft: 2}}>
						<Typography>
							{JSON.parse(localStorage.getItem(`likedPost_${post.id}`) || '{}').reactions || post.reactions}
						</Typography>
						<IconButton onClick={handleLike}>
							<FavoriteIcon/>
						</IconButton>
					</CardActions>
					: ''
				}

				<div className={styles.spy}>
					<div className={styles.cross} onClick={() => handleRemove(post.id)}>
						<CloseIcon style={{color: 'white'}}/>
					</div>
					<Link to={`${post.id}`} className={styles.arrow}>
						<ArrowForwardIcon style={{color: 'white'}}/>
					</Link>
				</div>
			</Card>
		</div>
	);
};

export default MyCard;
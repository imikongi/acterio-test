import {Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {IPost} from "../../models/IPost.ts";
import Tags from "../Tags/Tags.tsx";
import styles from './MyCards.module.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux.ts";
import {addRemoveLike, checkLocal} from "../../store/reducers/post/postSlice.ts";

type MyCardProps = {
	post: IPost
	detailedView: boolean
}

export const MyCard: React.FC<MyCardProps> = ({post, detailedView}) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem(`likedPost_${post.id}`) || '{}')
		if(savedData){
			dispatch(checkLocal({
				isLiked: savedData.isLiked || false,
				reactions: savedData.reactions || post.reactions
			}))
		}
		
	}, [dispatch, post.id, post.reactions]);
	
	const handleLike = () => {
		dispatch(addRemoveLike())
	}

	return (
		<div>
			<Card className={detailedView ? styles.cardBig : styles.cardSmall}>
				<CardHeader
					avatar={
						<Avatar
							src={`/assets/${post.userId}.png`}
						/>
						}
					title={<Typography
						style={{width: 250, textAlign: 'left'}}
						variant={`${detailedView ? 'body2' : 'subtitle2'}`}
					>
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
						style={{}}
					>

					</div>
				</CardContent>

				{detailedView
					? <CardActions disableSpacing sx={{paddingLeft:2}}>
						<Typography>
							{JSON.parse(localStorage.getItem(`likedPost_${post.id}`)|| '{}').reactions || post.reactions}
						</Typography>
						<IconButton onClick={handleLike}>
							<FavoriteIcon/>
						</IconButton>
					</CardActions>
					: ''
				}

				<Link to={`${post.id}`}>
					<div className={styles.spy}>
						<ArrowForwardIcon style={{color: 'white'}}/>
					</div>
				</Link>
			</Card>


		</div>
		//
	);
};

export default MyCard;
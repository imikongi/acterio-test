import {Avatar, Card, CardContent, CardHeader, Typography} from "@mui/material";
import React from "react";
import {IPost} from "../../models/IPost.ts";
import Tags from "../Tags/Tags.tsx";
import styles from './MyCards.module.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from "react-router-dom";

type MyCardProps = {
	post: IPost
}

const MyCard: React.FC<MyCardProps> = ({post}) => {
	return (

		<div>
			<Card className={styles.card}>
				<CardHeader
					avatar={
						<Avatar>
							{post.userId}
						</Avatar>}
					title={<div style={{width: 240}}>{post.title}</div>}
					titleTypographyProps={{align: 'left', marginBottom: 1}}
					subheaderTypographyProps={{align: 'left'}}
					subheader={<Tags tags={post.tags}/>}
				/>
				<CardContent sx={{paddingTop: 0, paddingBottom: 0, textAlign: 'left'}}>
					<Typography variant='caption'>
						{post.body}
					</Typography>
					<div className={styles.fadeTextOverlay}></div>
				</CardContent>

				{/*<CardActions disableSpacing sx={{paddingLeft:2}}>*/}
				{/*	<Typography>{post.reactions}</Typography>*/}
				{/*	<IconButton>*/}
				{/*		<FavoriteIcon/>*/}
				{/*	</IconButton>*/}
				{/*</CardActions>*/}

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
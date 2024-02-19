import {Chip} from "@mui/material";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {addRemoveTag} from "../../store/reducers/posts/postsSlice.ts";

type TagsProps = {
	tags: string[]
	detailedView: boolean
}

const Tags: React.FC<TagsProps> = ({tags}) => {
	const dispatch = useAppDispatch()
	const {chosenTags} = useAppSelector(state => state.postsSlice)

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		const value = e.currentTarget.innerText
		dispatch(addRemoveTag(value))
	}

	return (
			<>
				{tags.map((tag, index) =>
					<Chip
						key={index}
						sx={{
							margin: 0.5,
							bgcolor: chosenTags.includes(tag) ? '#6e73de' : '#bdbbbb',
							'&:hover': {
								bgcolor: '#6e73de'
							}
						}}
						onClick={handleClick}
						label={tag}/>
					)
				}
			</>
	);
};

export default Tags;
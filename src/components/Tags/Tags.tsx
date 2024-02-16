import {Chip} from "@mui/material";
import React from "react";

type TagsProps = {
	tags: string[]
}

const Tags: React.FC<TagsProps> = ({tags}) => {

	const handleClick = () => {
		console.log('clicked')
	}

	return (
			<>
				{tags.map(tag => <Chip onClick={handleClick} label={tag}/>)}
			</>
	);
};

export default Tags;
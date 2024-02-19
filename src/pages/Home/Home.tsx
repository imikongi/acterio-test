import './Home.css'
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Home() {
	return (
		<>
			<Typography variant={'h3'}>
				<p>Hello! Thank you for giving me the opportunity to demonstrate my skills.</p>
				<p>I implemented all of the tasks and added little bit from myself :) I hope you'll like it!</p>
				<p>Have a nice day!</p>
			</Typography>
			<Link to={'/posts'}>
				<Typography variant={'h4'}>
					Let's go and look! <ArrowForwardIcon/>
				</Typography>
			</Link>
		</>
	)
}

export default Home

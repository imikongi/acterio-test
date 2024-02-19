import {useRouteError, isRouteErrorResponse, Link} from "react-router-dom";

const ErrorPage= () => {
	const error = useRouteError()
	let errorMessage: string
	//handle different error types
	if(isRouteErrorResponse(error)){
		errorMessage = error.data.message || error.statusText
	} else if(error instanceof Error){
		errorMessage = error.message
	} else if (typeof error === 'string') {
		errorMessage = error
	}
	else {
		errorMessage = 'Unknown error :('
	}

	return (
		<div>
			<div>
				<p>Oopsy, but some error occur:</p>

				<p>{errorMessage}</p>
			</div>

			<Link to={'/'}>
				Back home
			</Link>
		</div>
	);
};

export default ErrorPage;
import './Home.css'
import {Link} from "react-router-dom";

function Home() {

  return (
    <>

        <Link to={'/posts'}>
              Go to posts
        </Link>

    </>
  )
}

export default Home

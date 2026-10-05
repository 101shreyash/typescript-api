import { Link } from "react-router";

function Homepage() {
  return (
    <div className="homepage-div">
      <h1 className="main-head">Journal Your Thoughts.</h1>
     <Link to="/signup" className="main-btn">Get started</Link>
    </div>
  );
}

export default Homepage;

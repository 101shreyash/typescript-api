import { Link } from "react-router";

function Login() {

 return <div className="universal-div">

<form>

<h1 className="main-head">Login Now</h1>
<input className="input-field"  type="text" placeholder="Enter your username" required/> &nbsp;
<input className="input-field" type="text" placeholder="Enter your password" required/> &nbsp;
<button className="basic-btn">Login Now</button>

</form>
<p> New here in this platform <Link className="footer-links" to="/signup"> Signup Now</Link></p>


 </div>

}


export default Login;

import { Link } from "react-router";

function Signup() {

 return <div className="universal-div">

<form>

<h1 className="main-head">Signup Now</h1>
<input className="input-field"  type="text" placeholder="Enter your username" required/> &nbsp;
<input className="input-field" type="text" placeholder="Enter your password" required/> &nbsp;
<input className="input-field" type="text" placeholder="Enter your Role" required/> &nbsp;
<button className="basic-btn">Signup Now</button>

</form>
<p>Alredy have an accoount  <Link className="footer-links" to="/login"> Login Now</Link></p>


 </div>

}


export default Signup;

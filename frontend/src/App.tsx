import Homepage from "./components/Homepage"
import { Route , Routes } from "react-router"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Notes from "./components/Notes"
import MyNotes from "./components/MyNotes"

function App() {

return <>

<Routes>

<Route path="/"  element = {<Homepage/>} />
<Route path="/signup"  element = {<Signup/>} />
<Route path="/login"  element = {<Login/>} />
<Route path="/keepnotes"  element = {<Notes/>} />
<Route path="/mynotes"  element = {<MyNotes/>} />
<Route path="*"  element = {<h1 style={{textAlign : "center" , marginTop : "12%"}}>404 Not found</h1>} />

</Routes>

</>

}

export default App

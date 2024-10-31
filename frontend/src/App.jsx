import Register from "./Register"
import Login from "./Login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home"


const App = () =>{
    return(
        <>
        <Router>
            <Routes>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
            </Routes>
        </Router>
        </>
    )
}







export default App
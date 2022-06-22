import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap';
import {Route,Routes,NavLink,useNavigate} from 'react-router-dom';
import Game from './components/Game';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserDashBoard from './components/UserDashBoard';
import {useSelector,useDispatch} from 'react-redux';
import { clearLoginStatus } from "./slices/userSlice";
function App() {
    let {userObj,isPending,isFulfilled,isRejected,errMsg}=useSelector((state)=>state.userData);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userLogout=()=>{
        localStorage.clear();
        dispatch(clearLoginStatus());
        navigate("/login");
    };
    return (
     <>
     <div className="w-100" >
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                <Navbar.Brand href="">TIC-TAC-TOE</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    { localStorage.getItem("login")===null ?(<Nav className="ms-auto">
                    <NavLink className="nav-link" to="">Home</NavLink>
                    <NavLink className="nav-link" to="signup">SignUp</NavLink>
                    <NavLink className="nav-link" to="login">Login</NavLink>
                    </Nav>):(
                        <>
                        {/* This dropdown is visible only when a user is logged in */}
                        <Nav className="ms-auto">
                          <NavLink className='nav-link' to="game">Game</NavLink>
                        
                        <NavDropdown
                          title={userObj.username}
                          id="collasible-nav-dropdown"
                          className="ms-auto logutSection text-white"
                        >
                          <NavDropdown.Item><NavLink className="nav-link text-dark" to="userdashboard">UserProfile</NavLink></NavDropdown.Item>
       
                          <NavDropdown.Divider />
                          <NavDropdown.Item variant="outline-success" onClick={userLogout}>
                            Logout
                          </NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                      </>
                   )}
                </Navbar.Collapse>
                </Container>
            </Navbar>
    </div>
    <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/userdashboard" element={<UserDashBoard/>}/>
            <Route path="/game" element={<Game/>}/>
    </Routes>
     </>
    );
  }
  export default App;
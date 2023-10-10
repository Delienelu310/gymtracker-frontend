import { Link } from "react-router-dom";
import {Navbar, Nav, NavDropdown} from "react-bootstrap"
import { useAuth } from "../security/AuthContext";


export default function Header(){

    const authContext = useAuth();

    return (

        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">GymTracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Exercises" id="exercises-dropdown">
                        <NavDropdown.Item as={Link} to="/exercises">Public Exercises</NavDropdown.Item>
                        {authContext.isAuthenticated && <>
                            <NavDropdown.Item as={Link} to="/private/exercises">All Private Exercises</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/private/exercises/created">Created Exercises</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/private/exercises/followed">Followed Exercises</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/create/exercise">Create new Exercise</NavDropdown.Item>
                        </>}
                    </NavDropdown>
                    <NavDropdown title="Functions" id="functions-dropdown">
                        <NavDropdown.Item as={Link} to="/functions">Public Functions</NavDropdown.Item>
                        {authContext.isAuthenticated && <>
                            <NavDropdown.Item as={Link} to="/private/functions">All Private Functions</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/private/functions/created">Created Functions</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/private/functions/followed">Followed Functions</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/create/function">Create new Function</NavDropdown.Item>
                        </>}
                    </NavDropdown>
                        
                    <Nav.Link as={Link} to="/public/users">Public Users</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Nav className="mr-auto">
                {authContext.isAuthenticated || <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                {authContext.isAuthenticated || <Nav.Link as={Link} to="/register">Register</Nav.Link>}
                {authContext.isAuthenticated && <Nav.Link as={Link} to="/" onClick={() => { authContext.logout()}}>Logout</Nav.Link>}
                {authContext.isAuthenticated && <Nav.Link as={Link} to="/account">Account</Nav.Link>}
            </Nav>
            
        </Navbar>
    );
}
import { Link } from "react-router-dom";
import {Navbar, Nav, NavDropdown} from "react-bootstrap"
import { useAuth } from "../security/AuthContext";


export default function Header(){

    const authContext = useAuth();

    return (
        // <header className="border-bottom border-light border-5 mb-5 p-2">
        //     <div className="container">
        //         <div className="row">
        //             <nav className="navbar navbar-expand-lg">
        //                 <Link className="navbar-brand ms-2 fs-2 fw-bold text-black" to="/exercises">GymTracker</Link>
        //                 <div className="collapse navbar-collapse">
        //                     <ul className="navbar-nav">
        //                         <li className="nav-item fs-5"><Link className="nav-link" to="/functions">Functions</Link></li>
        //                         <li className="nav-item fs-5"><Link className="nav-link" to="/public/users">Users</Link></li>
        //                         {authContext.isAuthenticated ? <li className="nav-item fs-5"><Link className="nav-link" to="/private/exercises">Private Exercises</Link></li> : ''}
        //                         {authContext.isAuthenticated ? <li className="nav-item fs-5"><Link className="nav-link" to="/private/functions">Private Functions</Link></li> : ''}
        //                     </ul>
        //                 </div>
        //                 <ul className="navbar-nav">
        //                     {authContext.isAuthenticated ? '' : <li className="nav-item fs-5"><Link className="nav-link" to="/register">Register</Link></li>}
        //                     {authContext.isAuthenticated ? '' : <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>}
        //                     {authContext.isAuthenticated ? 
        //                         <li className="nav-item fs-5"><Link className="nav-link" to="/logout" 
        //                             onClick={() => { authContext.logout();}}>
        //                             Logout</Link></li> : ''}
        //                     {authContext.isAuthenticated ? 
        //                         <li className="nav-item fs-5"><Link className="nav-link" to="/account">Account</Link></li> : ''}
        //                 </ul>
        //             </nav>
        //         </div>
        //     </div>
        // </header>
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
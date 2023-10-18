import { useAuth } from "../security/AuthContext"
import { Link, useNavigate } from "react-router-dom";

export function WelcomePage(){

    const {isAuthenticated, username, userId, login} = useAuth();
    const navigate = useNavigate();

    return (
        <div style={{
            width: "80%",
            marginTop: "30px",
            margin: "auto"
        }}>
            <h2 style={{color: "#A9DFBF"}} className="m-5">Welcome to the Gymtracker{isAuthenticated && `, ${username}!`}</h2>

            <h4 style={{color: "#7FB3D5"}}>What you can do on this page?</h4>
            <p className="m-3">
                This app allows you to discover new exercises for your specific needs and monitor your training progress    
            </p>

            <h4 style={{color: "#7FB3D5"}}>How to use the page?</h4>

            <p className="m-2">
                Move through navigation panel to look at body functions and exercises. Use buttons to go their pages
                If you are logged in, you can follow exercise, add trainings to your training history and look at your progress visualised
                as a graph! <br/>
                If you are not satisfied with proposed exercises or body functions, you can create your own and configure them as you want
                <br/>
                To learn more, go to the help page:<br/>
                <Link style={{width: "150px"}} className="btn btn-primary m-3" to="/help">Help</Link>
            </p>

            <h5 style={{color: "#7FB3D5"}} className="m-2">Unauthorized user</h5>
            <p className="m-2">
                Unfortunately, most part of functionality requires you to log in/register
                Fell free to set up your own account using buttons at the top right corner<br/>
                Alternatively, you can use demo account with the same functionality:<br/>
                <button className="btn btn-danger m-3" style={{width: "150px"}} onClick={() => {
                    login("DemoUser","password").then(response => navigate("/"))
                        .catch(error => console.log(error));
                }}>Demo</button>
            </p>

            <h5 style={{color: "#7FB3D5"}} className="m-2">Enjoy!</h5>

        </div>
    )
    
}
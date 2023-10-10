import { useAuth } from "../security/AuthContext"


export function WelcomePage(){

    const {isAuthenticated, username, userId} = useAuth();

    return (
        <div style={{
            width: "80%",
            marginTop: "30px",
            margin: "auto"
        }}>
            <h2 style={{color: "#A9DFBF"}} className="m-5">Welcome to the Gymtracker{isAuthenticated && `, ${username}!`}</h2>

            <h4 style={{color: "#7FB3D5"}}>What you can do on this page?</h4>
            <p className="m-3">
                On this page you can find new exercises to train specific body functions. 
                In addition, you can monitor your progress by adding number of repeatitions of exercise and it`s level.
                The data is displayed on a graph, so you could have a clear understanding what is your progress on this exercise or body function
            </p>

            <h4 style={{color: "#7FB3D5"}}>How to use the page?</h4>

            <p className="m-2">
                You can move through public and private resources using navigation bar. Also you can create you own objects with it.
                From the list you can click buttons to get on resources page. If the resource if private, you can modify it or add
                trainings to it. You can follow on public resource and use it as a private one
            </p>

            <h5 style={{color: "#7FB3D5"}} className="m-2">Unauthorized user</h5>
            <p>
                You can look for variety of physical exercises and body functions.
                You can look for specific exercises related to specific functions
                <br/>
                <b>You cannot create your own exercises and body functions and you cannot save your own training data</b>
            </p>

            <h5 style={{color: "#7FB3D5"}} className="m-2">Authorized user</h5>
            <p>
                You can create your own exercises, body functions, modify them, follow on prepared functions and save your training data
            </p>

            
            <div className="m-5">
                <h5 style={{color: "#7FB3D5"}}>Try demo account</h5>
                <span style={{color: "red"}}>Demo account feature is not working right now</span>
                <p className="m-3">If you don`t want to register your own account, you can try out demo-account</p>
                {isAuthenticated ? 
                    <span style={{color:"red"}}>You are authorized already, logout to use demo account</span>
                    :
                    <button  style={{width: "150px", background: "#2E86C1"}} className="btn btn-primary">Demo</button>
                }
                
            </div>
        </div>
    )
    
}
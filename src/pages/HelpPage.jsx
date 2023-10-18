export function HelpPage(){

    return (
        <div style={{
            width: "80%",
            marginTop: "50px",
            margin: "auto",
            backgroundColor: "rgba(52, 73, 94, 0.7)",
            padding: "20px"
            
        }}>
            <h2 style={{color: "#A9DFBF"}} className="m-5">How to use the gymtracker?</h2>

            <h4 style={{color: "#7FB3D5"}}>1. Discover new exercises</h4>
            <p className="m-3">
                Choose the type of body function you want to train in the navigation panel at the top
                <img className="intextimage" src={"images/helppage_01.png"}/>
                Then choose the specific desired function and click on "Look" button
                <img className="intextimage" src={"images/helppage_02.png"}/>
                Scroll down and choose exercise you like
                <img className="intextimage" src={"images/helppage_03.png"}/>
            </p>

            <h4 style={{color: "#7FB3D5"}}>2. Monitor progress in your exercises</h4>
            <p className="m-3">
                To begin with, you have to be logged in, so log in or register <br/>
                Go to the list of exercises and choose any exercise you like
                <img className="intextimage" src={"images/helppage_04.png"}/>
                After that follow the exercise, so that the app would start monitoring your progress on it
                <img className="intextimage" src={"images/helppage_05.png"}/>
                Then go to the "private exercises" list and choose the exercise you followed
                <img className="intextimage" src={"images/helppage_06.png"}/>
                This opens the exercise page. On the right side you should add the trainings you done
                <img className="intextimage" src={"images/helppage_07.png"}/>
                After you added some trainings, you can look at the graph. Before looking at it, you have to specify the time boundaries
                <img className="intextimage" src={"images/helppage_08.png"}/>
                Scroll down if you want to see the data about your trainings and edit it
            </p>

            <h4 style={{color: "#7FB3D5"}}>3. Monitor your progress on specific body functions</h4>
            <p className="m-3">
                To begin with, you have to be logged in, so log in or register <br/>
                You should go to the desired function list and choose a function
                <img className="intextimage" src={"images/helppage_09.png"}/>
                Then, you should follow the desired function
                <img className="intextimage" src={"images/helppage_10.png"}/>
                Find and follow exercises related to this function as in previous steps. Add some training data to it
                Go to private functions list
                <img className="intextimage" src={"images/helppage_11.png"}/>
                Then go to the page of the function
                As the exercises are related to the function, the data of their training will also we displayed on function page
                <img className="intextimage" src={"images/helppage_12.png"}/>
            </p>

            <h4 style={{color: "#7FB3D5"}}>4. If you don`t like the prepared functions and exercises, you can create you own</h4>
            <p className="m-3">
                To begin with, you have to be logged in, so log in or register <br/>

                Go to creating page using navigation panel
                <img className="intextimage" src={"images/helppage_13.png"}/>
                Set title and, if you want, image and description for your object
                <img className="intextimage" src={"images/helppage_14.png"}/>
                Use it as usual! <br/>

                If you created exercise, you can connect your exercise to functions on its page
                <img className="intextimage" src={"images/helppage_15.png"}/>
            </p>
        </div>
    )
    
}
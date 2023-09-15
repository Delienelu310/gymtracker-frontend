import { useNavigate, useParams } from "react-router-dom";
import { retrievePublicExerciseById } from "../api/ExerciseApiService";
import { useState } from "react";

export default function ExercisePublicPage(){

    const {exerciseid} = useParams();
    const {showError, setShowError} = useState(false);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authorId, setAuthorId] = useState(null);
    const [authorUsername, setAuthorUsername] = useState("");
    const [functions, setFunctions] = useState([]);
    const [functionsPerformance, setFunctionsPerformance] = useState({});

    function setExerciseDetails(){
        retrievePublicExerciseById(exerciseid)
            .then((response) => {
                if(response.status != 200) navigate("/");
                setTitle(response.data.exerciseDetails.title);
                setDescription(response.data.exerciseDetails.description);
                setAuthorId(response.data.author.userId);
                setAuthorUsername(response.data.author.username);
                setFunctions(response.data.functionIncluded);
                setFunctionsPerformance(response.data.functionsPerformance);

            })
            .catch((e) => {
                navigate("/");
            });
    }
    setExerciseDetails();

    return (
        <div>
            {/* what do we need? 
                1. exercise details
                2. number of followers
                3. related functions and functions performance
                4. follow/unfollow button (in case of authorized user)  
                5. author*/
            }
            {showError && <div>Error</div>}
            <div className="exerciseDetails">
                <div>Id: {exerciseid}</div>
                <div>Title: {title}</div>
                <div>Description: {description}</div>

                <div>
                    Author: 
                    <br/>
                    <div>Id: {authorId}</div>
                    <div>Username: {authorUsername}</div>
                </div>

                <div>
                    Functions included:
                    {functions.map(func => {
                        return (
                        <div>
                            <div>Id: {func.functionId}</div>
                            <div>Title: {func.functionDetails.title}</div>
                            <div>Performance: {functionsPerformance[func.functionId]}</div>
                        </div>
                        )
                    })}
                </div>

                {/* Make follow/unfollow based on the request */}
                <button onClick={() => "function to be implemented"}>Follow/Unfollow</button>
                
            </div>



        </div>
    );

}
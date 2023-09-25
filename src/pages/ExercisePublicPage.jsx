import { useNavigate, useParams } from "react-router-dom";
import { retrievePublicExerciseById } from "../api/ExerciseApiService";
import { useEffect, useState } from "react";
import { followExercise } from "../api/UserApiService";
import { useAuth } from "../security/AuthContext";

export default function ExercisePublicPage(){

    const {exerciseId} = useParams();

    const {isAuthenticated, userId} = useAuth();

    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authorId, setAuthorId] = useState(null);
    const [authorUsername, setAuthorUsername] = useState("");
    const [functions, setFunctions] = useState([]);
    const [functionsPerformance, setFunctionsPerformance] = useState({});

    function setExerciseDetails(){
        retrievePublicExerciseById({exerciseId})
            .then((response) => {
                console.log(response);
                if(response.status != 200) navigate("/");
                setTitle(response.data.exerciseDetails.title);
                setDescription(response.data.exerciseDetails.description);
                setAuthorId(response.data.author.userId);
                setAuthorUsername(response.data.author.appUserDetails.username);
                setFunctions(response.data.functionsIncluded);
                setFunctionsPerformance(response.data.functionsPerformance);

            })
            .catch((e) => {
                navigate("/");
            });
    }
    useEffect(setExerciseDetails, []);

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
                <div>
                    <span>Id: {exerciseId}</span>
                    <br/>
                    <span>Title: {title}</span>
                    <br/>
                    <span>Description: {description}</span>
                </div>

                <div>
                    Author: 
                    <br/>
                    <span>Id: {authorId}</span>
                    <br/>
                    <span>Username: {authorUsername}</span>
                </div>

                {functions && functions.length > 0 && 
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
                }
                {/* Make follow/unfollow based on the request */}
                {isAuthenticated &&
                    <button onClick={() => {
                        followExercise({userId, exerciseId}).then(response => {
                            if(response.status != 200){
                                setShowError(true);
                                return;
                            }
                            setShowError(false);
                        }).catch(e => {
                            console.log(e);
                            setShowError(true);
                        });
                    }}>Follow</button>
                }
                
                
            </div>



        </div>
    );

}
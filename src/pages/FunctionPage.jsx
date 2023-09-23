import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { calculatePerformanceOfTraining, prepareFunctionGraphData } from "../businessLogic/performanceCalculation";

import { useAuth } from "../security/AuthContext";
import { retrieveTrainingsForExercise, deleteTraining } from "../api/TrainingApiService";
import { retreiveExercisesForFunction } from "../api/ExerciseApiService";
import { unfollowFunction } from "../api/UserApiService";
import { deleteFunctionById, retrievePrivateFunctionById, updateFunction } from "../api/FunctionApiService";

import PerformanceGraph from "../components/PerformanceGraph";
import ResourceList from "../components/ResourceList";
import ExercisePrivate from "../components/ResourseListElements/ExercisePrivate";


export default function FunctionPage(){
    
    // in addition to the deafult details about the exercise, there also must be calculated effectivness of the authorized
    //user in a form of graph for this user

    const {functionId} = useParams();
    const {userId} = useAuth();

    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    //basic information
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authorId, setAuthorId] = useState(null);
    const [authorUsername, setAuthorUsername] = useState("");

    //exercises
    const [exercises, setExercises] = useState([]);

    //trainings
    const [trainings, setTrainings] = useState([]);

    //graph data
    const [data, setData] = useState([]);


    function setFunctionDetails(){
        retrievePrivateFunctionById({userId, functionId})
            .then((response) => {
                console.log("Function details:");
                console.log(response);
                if(response.status != 200) navigate("/");

                //basic information:
                setTitle(response.data.functionDetails.title);
                setDescription(response.data.functionDetails.description);
                setAuthorId(response.data.author.userId);
                setAuthorUsername(response.data.author.appUserDetails.username);

                //get exercises related to the function of the user
                retreiveExercisesForFunction(null, {userId, functionId}).then(response => {
                    if(response.status != 200) {
                        navigate('/');
                        return;
                    }

                    setExercises(response);
                    return response;
                    
                }).then(exercises => {
                    //now, when exercises are loaded, we can set trainings of these exercises
                    let trainingPromises = [];
                    for(let exercise of exercises){
                        trainingPromises.push(retrieveTrainingsForExercise({userId, exerciseId: exercise.exerciseId}).then(response => {
                            let trainingsCopy = response.data.slice();
                            for(let training of trainingsCopy){
                                training.exerciseid = exercise.exerciseId;
                                training.exerciseTitle = exercise.exerciseDetails.title;
                            }
                            return trainingsCopy;
                        }));
                    }

                    return Promise.all(trainingPromises);
                }).then(response => {
                    let newTrainings = [];
                    for(let exerciseTrainings of response){
                        for(let training of exerciseTrainings){
                            newTrainings.push(training);
                        }
                    }
                    setTrainings(newTrainings);
                    return response;
                }).then(response => {
                    //preparing graph data
                    setData(prepareFunctionGraphData(response));
                });

            })
            .catch((e) => {
                console.log(e);
                navigate("/");
            });
    }
    useEffect(setFunctionDetails, []);
    
    return (
        <div>
            {showError && <div>Error</div>}
            <div className="exerciseDetails">

                {/* Basic details */}
                {authorId == userId ? 
                    <div>
                        <div>
                            <span>Function Id: {functionId}</span>
                            <label>Function title: <input onChange={e => setTitle(e.target.value)} value={title}/></label>
                            <br/>
                            <label>Description: <input onChange={e => setDescription(e.target.value)} value={description}/></label>
                        </div>
                        <div>
                            Author: 
                            <br/>
                            <div>Id: {authorId}</div>
                            <div>Username: {authorUsername}</div>
                        </div>
                    </div>
                    :
                    <div>
                        <div>
                            <span>Function Id: {functionId}</span>
                            <span>Title: {title}</span>
                            <br/>
                            <span>Description: {description}</span>
                        </div>
                        <div>
                            Author: 
                            <br/>
                            <div>Id: {authorId}</div>
                            <div>Username: {authorUsername}</div>
                        </div>
                    </div>
                }
                

                {/* actions: delete, update, unfollow */}
                {
                    authorId == userId ?
                    <div>
                        <button className="btn btn-success" onClick={(e) => {
                            updateFunction({userId, functionId}, {title, description});
                        }}>Update</button>
                        <button className="btn btn-danger" onClick={() => {deleteFunctionById({userId: authorId, functionId}).then(
                            (response) => {
                                if(response.status === 200) navigate("/")
                                setShowError(true);
                            }).catch(error => {
                                console.log(error);
                                setShowError(true);
                            })}}
                        >
                            Delete
                        </button> 
                    </div>
                    :
                    <button className="btn btn-danger" onClick={() => {
                        unfollowFunction({userId, functionId}).then(response => {
                            if(response.status == 200) navigate("/");
                            setShowError(true);
                        }).catch(e => {
                            console.log(e);
                            setShowError(true);
                        });
                    }}>Unfollow</button>
                }
                
                {/* Exercises of the user, that use this function */}
                <div>
                    <ResourceList
                        key={"private_exercises_list_byfunction"}
                        retrieveResourses={() => {
                            return new Promise((resolve, reject) => {
                                resolve(exercises);
                            });
                        }}
                        ResourseWrapper={ExercisePrivate}
                    />
                </div>
                

                {/* training list */}
                <div>
                    {
                    trainings.map(training => 
                        {
                        const date = training.trainingDetails.dateTime;
                        return (
                            <div key={training.trainingId}>
                                <span>Exercise id: {training.exerciseId}</span>
                                <span>Exercise title: {training.exerciseTitle}</span>
                                <br/>
                                <span>Training id: {training.trainingId} </span>
                                <span>Time: {new Date(date[0], date[1], date[2]).toLocaleDateString()}</span>
                                <br/>
                                <span>Takes:</span>
                                {training.takes.map(take => 
                                    <div>
                                        <div>Level: {take.level}</div>
                                        <div>Repeats: {take.repeats}</div> 
                                    </div>                                
                                )}
                                <span>Perforamce: {calculatePerformanceOfTraining(training)}</span>
                                <button onClick={() => {
                                    deleteTraining({userId, exerciseId: training.exerciseId, trainingId: training.trainingId})
                                        .then(response => setFunctionDetails());
                                    
                                }} className="btn btn-danger">Delete</button>
                            </div>  
                        ) ;
                        }
                    )
                    }
                </div>
                
                {/* training statistic */}
                <div>
                    <PerformanceGraph data={data}/>
                </div>
                

                
            </div>
    
        </div>
    );
}
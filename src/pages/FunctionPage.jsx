import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { calculatePerformanceOfTraining, prepareFunctionGraphData } from "../businessLogic/performanceCalculation";

import { useAuth } from "../security/AuthContext";
import { retrieveTrainingsForExercise, deleteTraining } from "../api/TrainingApiService";
import { retreiveExercisesForFunction } from "../api/ExerciseApiService";
import { unfollowFunction } from "../api/UserApiService";
import { deleteFunctionById, retrievePrivateFunctionById, updateFunction, updateFunctionPublish, updateFunctionUnpublish } from "../api/FunctionApiService";

import PerformanceGraph from "../components/PerformanceGraph";
import ResourceList from "../components/ResourceList";
import ExercisePrivate from "../components/ResourseListElements/ExercisePrivate";
import Training from "../components/ResourseListElements/Training";


export default function FunctionPage(){
    
    // in addition to the deafult details about the exercise, there also must be calculated effectivness of the authorized
    //user in a form of graph for this user

    const {functionId} = useParams();
    const {userId, role} = useAuth();

    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    //basic information
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authorId, setAuthorId] = useState(null);
    const [authorUsername, setAuthorUsername] = useState("");

    const [published, setPublished] = useState(false);

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

                setPublished(response.data.published);

                //get exercises related to the function of the user
                retreiveExercisesForFunction(null, {userId, functionId}).then(response => {

                    setExercises(response);
                    return response;
                    
                }).then(exercises => {
                    //now, when exercises are loaded, we can set trainings of these exercises
                    let trainingPromises = [];
                    if(!exercises || exercises.length == 0) return null;
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
                    if(!response) return [];
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
            <div className="functionDetails" style={{
                display: "flex",
                "justify-content": "space-between"
            }}>

                <div className="wrapper" style={{marginTop: "20px"}}>
                    <div className="block-component">
                        {/* Basic details */}
                        <h4>Function details</h4>
                        {authorId == userId ? 
                            <div className="">
                                <div className="m-3">
                                    <div className="m-2">ID: <b>{functionId}</b></div>
                                    <label for="title" className="m-2">Function title</label>
                                    <input id="title" className="form-control" onChange={e => setTitle(e.target.value)} value={title}/>

                                    <label for="description" className="m-2">Description</label>
                                    <input id="description" className="form-control" onChange={e => setDescription(e.target.value)} value={description}/>
                                </div>
                                <div className="m-3">
                                    <h5>Author</h5> 
                                    <div className="m-2">Id: <b>{authorId}</b></div>
                                    <div className="m-2">Username: <b>{authorUsername}</b></div>
                                </div>
                            </div>
                            :
                            <div className="">
                                <div className="m-3">
                                    <h3>{title}</h3>
                                    <div className="m-2">ID: <b>{functionId}</b></div>
                                    <div className="m-2"><h5>Description:</h5> <p>{description}</p></div>
                                </div>
                                <div className="m-3">
                                    <h5>Author: </h5>
                                    <div className="m-2">ID: <b>{authorId}</b></div>
                                    <div className="m-2">Username: <b>{authorUsername}</b></div>
                                </div>
                            </div>
                        }
                        

                        {/* actions: delete, update, unfollow */}
                        {
                            authorId == userId ?
                            <div>
                                <button className="btn btn-success m-3" onClick={(e) => {
                                    updateFunction({userId, functionId}, {title, description}).catch(e => {
                                        setShowError(true);
                                        console.log(e);
                                    });
                                }}>Update</button>
                                <button className="btn btn-danger m-3" onClick={() => {deleteFunctionById({userId: authorId, functionId}).then(
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
                            <button className="btn btn-danger m-3" onClick={() => {
                                unfollowFunction({userId, functionId}).then(response => {
                                    if(response.status == 200) navigate("/");
                                    setShowError(true);
                                }).catch(e => {
                                    console.log(e);
                                    setShowError(true);
                                });
                            }}>Unfollow</button>
                        }

                        {/* publising account for moderators */}
                        {(role == "admin" || role == "moder") &&
                            <div>
                                {published ?
                                    <button className="btn btn-danger m-3" onClick={() => updateFunctionUnpublish({userId, functionId})}>Unpublish</button>
                                    :
                                    <button className="btn btn-success m-3" onClick={() => updateFunctionPublish({userId, functionId})}>Publish</button>
                                }
                            </div>
                        }
                    </div>
            
                    {/* Exercises of the user, that use this function */}
                    <div className="block-component">
                        <h4>Exercises with function</h4>
                        <div className="">
                            {exercises.length == 0 ||
                                <ResourceList
                                    key={"private_exercises_list_byfunction"}
                                    retrieveResourses={() => {
                                        return new Promise((resolve, reject) => {
                                            resolve(exercises);
                                        });
                                    }}
                                    ResourseWrapper={ExercisePrivate}
                                />
                            }
                        </div>
                    </div>
                </div>

                <div className="right-side wrapper" style={{marginTop: "20px"}}>

                    {/* training statistic */}
                    <div className="block-component">
                        <h4>Training graph</h4>
                        {!trainings || trainings.length == 0 ||
                            <PerformanceGraph data={data}/>
                        }
                    </div>
                    
                    {/* training list */}
                    <div className="block-component">
                        <h4>Trainings on function</h4>
                        <div className="">
                            <ResourceList
                                key={"all_trainings_list"}
                                retrieveResourses={() => new Promise((resolve) => {
                                    resolve(trainings);
                                })}
                                ResourseWrapper={({resourse}) => {
                                    return (
                                        <Training resourse={resourse} refreshResourses={setFunctionDetails}/>
                                    );
                                }}
                                searchFilterFunction={(resourse, query)=>{
                                    console.log(resourse);
                                    return String(resourse.trainingId).startsWith(query);
                                }}
                            />
                        </div>
                    </div>
                    

                
                    
                    
                </div>
                
                

                
            </div>
    
        </div>
    );
}
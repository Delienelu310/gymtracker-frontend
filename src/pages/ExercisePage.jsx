import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { calculatePerformanceOfTraining, prepareExerciseGraphData } from "../businessLogic/performanceCalculation";

import { useAuth } from "../security/AuthContext";
import { retrieveTrainingsForExercise, deleteTraining, createTraining } from "../api/TrainingApiService";
import { updateExerciseAddingFunction, updateExerciseRemovingFunction, updateExerciseChangingPerformance, 
    deleteExerciseById, retrievePrivateExerciseById, updateExercise, 
    updateExercisePublish, updateExerciseUnpublish } from "../api/ExerciseApiService";
import {unfollowExercise} from "../api/UserApiService";


import PerformanceGraph from "../components/PerformanceGraph";
import ResourceList from "../components/ResourceList";

import DatePicker from 'react-datepicker';

export default function ExercisePage(){
    
    // in addition to the deafult details about the exercise, there also must be calculated effectivness of the authorized
    //user in a form of graph for this user

    const {exerciseId} = useParams();
    const {userId, role} = useAuth();

    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authorId, setAuthorId] = useState(null);
    const [authorUsername, setAuthorUsername] = useState("");

    const [published, setPublished] = useState(false);

    const [functions, setFunctions] = useState([]);
    const [functionPerformance, setFunctionPerformance] = useState({});

    const [trainings, setTrainings] = useState([]);

    //for adding function
    const [performance, setPerformance] = useState(0);
    const [functionIdToAdd, setFunctionIdToAdd] = useState(null);

    //for adding takes into training
    const [level, setLevel] = useState(0);
    const [repeats, setRepeats] = useState(0);
    const [takes, setTakes] = useState([]);

    //for adding training
    const [date, setDate] = useState(new Date(Date.now()));

    //graph data
    const [data, setData] = useState([]);

    function refreshTrainingData(){
        retrieveTrainingsForExercise({userId, exerciseId}).then(response => {
            console.log("Training data");
            console.log(response);
            if(response.status != 200){
                setTrainings([]);
                setShowError(true);
                return; 
            };
            setShowError(false);

            setTrainings(response.data);
            setData(prepareExerciseGraphData(response.data));
            console.log(data);

        }).catch(error => {
            console.log(error);
            setShowError(true);
            setTrainings([]);
        });
    }

    function setExerciseDetails(){
        retrievePrivateExerciseById({userId, exerciseId})
            .then((response) => {
                console.log("Exercise details:");
                console.log(response);
                if(response.status != 200) navigate("/");

                setTitle(response.data.exerciseDetails.title);
                setDescription(response.data.exerciseDetails.description);
                setAuthorId(response.data.author.userId);
                setAuthorUsername(response.data.author.appUserDetails.username);

                setPublished(response.data.published);

                setFunctions(response.data.functionsIncluded);
                console.log("Function performance inside:");
                console.log(response.data.functionPerformance);
                setFunctionPerformance(response.data.functionPerformance);

            })
            .catch((e) => {
                console.log(e);
                navigate("/");
            });
        refreshTrainingData();
    }
    useEffect(setExerciseDetails, []);
    
    return (
        <div>
            {showError && <div>Error</div>}
            <div className="exerciseDetails" style={{
                display: "flex",
                "justify-content": "space-between"
            }}>

                <div className="left-block wrapper" style={{marginTop: "20px"}}>

                    <div className="exercise-data block-component" >
                        <div className="wrapper">
                            {authorId == userId ? 
                                <div>
                                    <h4>Exercise data:</h4>
                                    <div className="m-2">
                                        ID: 
                                        <br/>
                                        <b>{exerciseId}</b>
                                    </div>
                                    <label className="m-2" for="title">Title: </label>
                                    <input className="form-control" id="title" onChange={e => setTitle(e.target.value)} value={title}/>

                                    <label className="m-2" for="description">Description: </label>
                                    <input className="form-control" id="description" onChange={e => setDescription(e.target.value)} value={description}/>
                                </div>
                                :
                                <div>
                                    <div>
                                        ID: 
                                        <br/>
                                        <b>{exerciseId}</b>
                                    </div>
                                    <div>
                                        Title: 
                                        <br/>
                                        <b>{title}</b>
                                    </div>
                                    <div>
                                        Description: 
                                        <br/>
                                        <b>{description}</b>
                                    </div>
                                </div>  
                            }
                            <div className="m-3">
                                Author: 
                                <br/>
                                <div className="m-2">
                                    ID: <b>{authorId}</b>
                                </div>
                                <div className="m-2">
                                    Username: <b>{authorUsername}</b>
                                </div>
                            </div>
                            
                        </div>
                        

                        {
                            authorId == userId ?
                            <div>
                                <button className="btn btn-success m-3" onClick={() => {
                                    updateExercise({userId, exerciseId}, {title, description}).catch( e => {
                                        setShowError(true);
                                        console.log(e);
                                    });
                                }}>Update</button>
                                <button className="btn btn-danger m-3" onClick={() => {deleteExerciseById({userId: authorId, exerciseId}).then(
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
                                unfollowExercise({userId, exerciseId}).then(response => {
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
                                    <button className="btn btn-danger m-3" onClick={() => updateExerciseUnpublish({userId, exerciseId})}>Unpublish</button>
                                    :
                                    <button className="btn btn-success m-3" onClick={() => updateExercisePublish({userId, exerciseId})}>Publish</button>
                                }
                            </div>
                        }
                    
                    </div>
                    
                    {/* adding function */}
                    <div className="block-component">
                        {userId == authorId &&
                            <div className="wrapper">
                                <h4 className="m-2">Connect function: </h4>

                                <label className="m-2" for="functionId">Function id:</label>
                                <input className="form-control m-2" id="functionId" onChange={(e) => {setFunctionIdToAdd(e.target.value)}} value={functionIdToAdd} placeholder="function id"/>

                                <label className="m-2" for="performance" >Performance desired:</label>
                                <input className="form-control m-2" id="performance" onChange={(e)=> {setPerformance(e.target.value)}} value={performance} type="number" placeholder="performance"/>

                                <button onClick={() => {
                                    if(!functions.map(func => func.functionId).includes(functionIdToAdd)){
                                        updateExerciseAddingFunction({userId: authorId, exerciseId, functionId: functionIdToAdd}).then(
                                            response => updateExerciseChangingPerformance({userId: authorId, exerciseId, functionId: functionIdToAdd, value: performance}).then(
                                                r => setExerciseDetails()
                                            ).catch((e) => {
                                                console.log(e);
                                                setShowError(true);
                                            })
                                        ).catch((e) => {
                                            console.log(e);
                                            setShowError(true);
                                        });
                                    }
                                        
                                }} className="btn btn-success m-2">Add</button>
                            </div>
                        }

                        <hr/>
                        {/* functions list */}
                        <div className="wrapper funcitons-block">
                            {functions.length == 0 || 
                                <div>
                                    <h4>Functions included:</h4>
                                    {functions.map(func => {
                                        return (
                                        <div key={func.functionId} className="post">
                                            
                                            <h4>{func.functionDetails.title}</h4>
                                            <div>ID: {func.functionId}</div>
                                            <div>Performance: <b>{functionPerformance[func.functionId]}</b></div>
                                            {userId == authorId && (
                                                <div>
                                                    <input className="form-control m-2" onChange={(e) => {
                                                        let functionPerformanceCopy = Object.assign({}, functionPerformance);
                                                        functionPerformanceCopy[func.functionId] = e.target.value;
                                                        setFunctionPerformance(functionPerformanceCopy);
                                                    }} value={functionPerformance[func.functionId]} type="number"/>
                                                    <button className="btn btn-success m-2" onClick={() => {
                                                        updateExerciseChangingPerformance({userId, exerciseId, functionId: func.functionId, value: functionPerformance[func.functionId]}).then(
                                                            response => setExerciseDetails()
                                                        );
                                                        
                                                    }}>Edit</button>
                                                </div>
                                            )}
                                            {userId == authorId && 
                                                <button 
                                                    onClick={
                                                        () => {
                                                            updateExerciseRemovingFunction({userId, exerciseId, functionId: func.functionId}).then(
                                                                response => setExerciseDetails()
                                                            );
                                                            
                                                        }
                                                    }
                                                    className="btn btn-danger"
                                                >
                                                    Remove
                                                </button> 
                                            }
                                            
                                        </div>
                                        )
                                    })}
                                </div>
                            }

                            

                        </div>
                    </div>
                </div>

                <div className="right-block" style={{marginTop: "20px"}}>
                    {/* training statistic */}
                    {trainings.length == 0 ||
                        <div className="block-component">
                            <h4>Graph data</h4>
                            <PerformanceGraph data={data}/>
                        </div>
                    }

                    <div className="block-component">
                        {/* adding new training */}
                        <div className="wrapper">

                            <h4>Add new training:</h4>


                            <div className="m-3">
                                Date: <DatePicker
                                    className="form-control"
                                    selected={date}
                                    onChange={(date) => {
                                        setDate(date);
                                    }}
                                    dateFormat="yyyy-MM-dd" // Customize the date format
                                />
                            </div>
                            
                            

                            {takes.length == 0 ||
                                <div className="wrapper">
                                    <h5>Sets:</h5>
                                    {takes.map((take, index) => (
                                        <div key={index} className="post">
                                            Level: <b>{take.level}</b>
                                            <br/>
                                            Repeats: <b>{take.repeats}</b>
                                            <br/>
                                            <button onClick={() => {
                                                let takesCopy = takes.slice();
                                                takesCopy.splice(index, 1);
                                                setTakes(takesCopy);
                                            }} className="btn btn-danger m-1">Delete</button>
                                        </div>
                                    ))}
                                </div>
                            }
                            
                            <div>
                                <h5>Add set:</h5>

                                <label for="level" className="m-2">Level</label>
                                <input id="level" className="form-control m-2" type="number" value={level} onChange={(e) => setLevel(e.target.value)}/>

                                <label for="repeats" className="m-2">Repeats</label>
                                <input id="repeats" className="form-control m-2" type="number" value={repeats} onChange={(e) => setRepeats(e.target.value)}/>

                                <button className="btn btn-success m-2" onClick={() => setTakes(takes.concat([{level, repeats}]))}>Add set</button>
                            </div>

                            
                            <button className="btn btn-success m-3" onClick={() => {
                                createTraining({userId, exerciseId}, {
                                    trainingDetails: {
                                        dateTime: `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T00:00:00`,
                                    },
                                    takes: takes
                                }).then(response => {
                                    if(response.status != 200) setShowError(true);
                                    refreshTrainingData();
                                }).catch(e => {
                                    console.log(e);
                                    setShowError(true);
                                });
                                
                                setLevel(0);
                                setRepeats(0);
                                setTakes([]);
                            }}>Add training</button>
                        </div>

                        <hr/>

                        {/* training list */}
                        {trainings.length == 0 ||
                            <div>
                                <h4>Trainings</h4>
                                {
                                trainings.map(training => 
                                    {
                                    const date = training.trainingDetails.dateTime;
                                    console.log();
                                    return (
                                        <div key={training.trainingId} className="post wrapper" style={{marginBottom: "10px"}}>
                                            <span>ID: <b>{training.trainingId}</b>,    </span>
                                            <span>Time: <b>{new Date(date[0], date[1], date[2]).toLocaleDateString()}</b></span>
                                            <br/>
                                            <div className="m-2">
                                                <h6>Takes:</h6>
                                                <ul>
                                                    {training.takes.map( (take, index) => 
                                                        <li key={index}>
                                                            <span>Level: {take.level}, </span>
                                                            <span>Repeats: {take.repeats}</span> 
                                                        </li>                                
                                                    )}
                                                </ul>
                                            </div>
                                            
                                            <div>Perforamce: <b>{calculatePerformanceOfTraining(training)}</b></div>

                                            <button onClick={() => {
                                                deleteTraining({userId, exerciseId, trainingId: training.trainingId}).then(response => refreshTrainingData());
                                                
                                            }} className="btn btn-danger m-3">Delete</button>
                                        </div>  
                                    ) ;
                                    }
                                )
                                }
                            </div>
                        }
                    </div>
                    
                </div>

                
                
                
                

                
            </div>
    
        </div>
    );
}
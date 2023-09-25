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
            <div className="exerciseDetails">
                <div>
                    {authorId == userId ? 
                        <div>
                            <span>Id: {exerciseId}</span>
                            <label>Title: <input onChange={e => setTitle(e.target.value)} value={title}/></label>
                            <label>Description: <input onChange={e => setDescription(e.target.value)} value={description}/></label>
                        </div>
                        :
                        <div>
                            <span>Id: {exerciseId}</span>
                            <span>Title: {title}</span>
                            <span>Description: {description}</span>
                        </div>  
                    }
                    <div>
                        Author: 
                        <br/>
                        <div>Id: {authorId}</div>
                        <div>Username: {authorUsername}</div>
                    </div>
                    
                </div>
                

                {
                    authorId == userId ?
                    <div>
                        <button className="btn btn-success" onClick={() => {
                            updateExercise({userId, exerciseId}, {title, description}).catch( e => {
                                setShowError(true);
                                console.log(e);
                            });
                        }}>Update</button>
                        <button className="btn btn-danger" onClick={() => {deleteExerciseById({userId: authorId, exerciseId}).then(
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
                            <button className="btn btn-danger" onClick={() => updateExerciseUnpublish({userId, exerciseId})}>Unpublish</button>
                            :
                            <button className="btn btn-success" onClick={() => updateExercisePublish({userId, exerciseId})}>Publish</button>
                        }
                    </div>
                }
                

                <div>
                    Functions included:
                    {functions.map(func => {
                        return (
                        <div key={func.functionId}>
                            <div>Id: {func.functionId}</div>
                            <div>Title: {func.functionDetails.title}</div>
                            <div>Performance: {functionPerformance[func.functionId]}</div>
                            {userId == authorId && (
                                <div>
                                    <input onChange={(e) => {
                                        let functionPerformanceCopy = Object.assign({}, functionPerformance);
                                        functionPerformanceCopy[func.functionId] = e.target.value;
                                        setFunctionPerformance(functionPerformanceCopy);
                                    }} value={functionPerformance[func.functionId]} type="number"/>
                                    <button className="btn btn-success" onClick={() => {
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
                {userId == authorId &&
                    <div>
                        <label>Function id: 
                            <input onChange={(e) => {setFunctionIdToAdd(e.target.value)}} value={functionIdToAdd} placeholder="function id"/>
                        </label>
                        <br/>
                        <label>Performance desired: 
                            <input onChange={(e)=> {setPerformance(e.target.value)}} value={performance} type="number" placeholder="performance"/>
                        </label>
                        <br/>
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
                                
                        }} className="btn btn-success">Add</button>
                    </div>
                }

                {/* adding new training */}
                <div>
                    <label>Date  <DatePicker
                        selected={date}
                        onChange={(date) => {
                            setDate(date);
                        }}
                        dateFormat="yyyy-MM-dd" // Customize the date format
                    /></label>
                    <label>Level<input type="number" value={level} onChange={(e) => setLevel(e.target.value)}/></label>
                    <br/>
                    <label>Repeats<input type="number" value={repeats} onChange={(e) => setRepeats(e.target.value)}/></label>
                    <br/>
                    <div>
                        {takes.map((take, index) => (
                            <div key={index}>
                                Level: {take.level}, Repeats: {take.repeats}
                                <button onClick={() => {
                                    let takesCopy = takes.slice();
                                    takesCopy.splice(index, 1);
                                    setTakes(takesCopy);
                                }} className="btn btn-danger">Delete</button>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-success" onClick={() => setTakes(takes.concat([{level, repeats}]))}>Add take</button>
                    <button className="btn btn-success" onClick={() => {
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

                {/* training list */}
                <div>
                    {
                    trainings.map(training => 
                        {
                        const date = training.trainingDetails.dateTime;
                        console.log();
                        return (
                            <div key={training.trainingId}>
                                <span>Training id: {training.trainingId} </span>
                                <span>Time: {new Date(date[0], date[1], date[2]).toLocaleDateString()}</span>
                                <br/>
                                <span>Takes:</span>
                                {training.takes.map( (take, index) => 
                                    <div key={index}>
                                        <div>Level: {take.level}</div>
                                        <div>Repeats: {take.repeats}</div> 
                                    </div>                                
                                )}
                                <span>Perforamce: {calculatePerformanceOfTraining(training)}</span>
                                <button onClick={() => {
                                    deleteTraining({userId, exerciseId, trainingId: training.trainingId}).then(response => refreshTrainingData());
                                    
                                }} className="btn btn-danger">Delete</button>
                            </div>  
                        ) ;
                        }
                    )
                    }
                </div>
                
                {/* training statistic */}
                {trainings.length == 0 ||
                    <div>
                        <PerformanceGraph data={data}/>
                    </div>
                }
                

                
            </div>
    
        </div>
    );
}
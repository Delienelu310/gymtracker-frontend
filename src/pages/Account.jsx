import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../security/AuthContext";
import { retrievePrivateUserById, updateUser } from "../api/UserApiService";
import {retrieveTrainingsForUser} from "../api/TrainingApiService";

import ResourceList from "../components/ResourceList";
import Training from "../components/ResourseListElements/Training";



export default function Account(){
    // in addition to the deafult details about the exercise, there also must be calculated effectivness of the authorized
    //user in a form of graph for this user

    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    //states for basic data
    const {userId} = useAuth();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [fullname, setFullname] = useState();
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0); 

    //trainings
    const [trainings, setTrainings] = useState([]);


    function setUserDetails(){
        retrievePrivateUserById({userId})
            .then((response) => {
                console.log("User details:");
                console.log(response);
                if(response.status != 200) navigate("/");

                //basic information:
                setUsername(response.data.appUserDetails.username);
                setEmail(response.data.appUserDetails.email);
                setFullname(response.data.appUserDetails.fullname);
                setAge(response.data.appUserDetails.age);
                setWeight(response.data.appUserDetails.weight);
                setHeight(response.data.appUserDetails.height);

                //get exercises related to the user
                retrieveTrainingsForUser({userId}).then(response => {
                    if(response.status != 200) {
                        navigate('/');
                        return;
                    }
                    setTrainings(response.data);
                    return response;
                    
                }).catch(e => {
                    console.log(e);
                    setShowError(true);
                });
            })
            .catch((e) => {
                console.log(e);
                navigate("/");
            });
    }
    useEffect(setUserDetails, []);

    
    return (
        <div>
            {showError && <div>Error</div>}
            <div className="userDetails">

                {/* Basic details */}
                <div>
                    <span>User Id: {userId}</span>
                    <br/>
                    <label>Username: <input onChange={(e) => setUsername(e.target.value)} value={username}/></label>
                    <br/>
                    <label>Email: <input onChange={e => setEmail(e.target.value)} value={email}/></label>
                    <br/>
                    <label>Fullname: <input onChange={e => setFullname(e.target.value)} value={fullname}/></label>
                    <br/>
                    <label>Age: <input onChange={e => setAge(e.target.value)} value={age}/></label>
                    <br/>
                    <label>Height: <input onChange={e => setHeight(e.target.value)} value={height}/></label>
                    <br/>
                    <label>Weight: <input onChange={e => setWeight(e.target.value)} value={weight}/></label>
                    <br/>
                    <button onClick={() => {
                        updateUser({userId}, {
                            username,
                            fullname,
                            email,
                            age,
                            height,
                            weight
                        }).then(response => {
                            if(response.status != 200) setShowError(true);
                            else setShowError(false);
                        }).catch(e => {
                            console.log(e);
                            setShowError(true);
                        });
                    }} className="btn btn-success">Update</button>
                </div>

                {/* training list */}
                <div>
                    <ResourceList
                        key={"all_trainings_list"}
                        retrieveResourses={() => new Promise((resolve) => {
                            resolve(trainings);
                        })}
                        ResourseWrapper={({resourse}) => {
                            return (
                                <Training resourse={resourse} refreshResourses={setUserDetails}/>
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
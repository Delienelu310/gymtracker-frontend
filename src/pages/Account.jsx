import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../security/AuthContext";
import { retrievePrivateUserById, updateUser, updateUserPublish, updateUserUnpublish } from "../api/UserApiService";
import {retrieveTrainingsForUser} from "../api/TrainingApiService";

import ResourceList from "../components/ResourceList";
import Training from "../components/ResourseListElements/Training";



export default function Account(){
    // in addition to the deafult details about the exercise, there also must be calculated effectivness of the authorized
    //user in a form of graph for this user

    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    //states for basic data
    const {userId, role} = useAuth();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [fullname, setFullname] = useState();
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0); 
    const [published, setPublished] = useState(false);

    //trainings
    const [trainings, setTrainings] = useState([]);


    function setUserDetails(){
        retrievePrivateUserById({userId})
            .then((response) => {

                if(response.status != 200) navigate("/");

                //basic information:
                setUsername(response.data.appUserDetails.username);
                setEmail(response.data.appUserDetails.email);
                setFullname(response.data.appUserDetails.fullname);
                setAge(response.data.appUserDetails.age);
                setWeight(response.data.appUserDetails.weight);
                setHeight(response.data.appUserDetails.height);
                setPublished(response.data.published);

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
            <div className="userDetails wrapper">

                {/* Basic details */}
                <div>
                    <div className="m-2">
                        User Id: 
                        <br/>
                        <b>{userId}</b>
                    </div>

                    <h5  className="p-2">Username: </h5>
                    <p>{username}</p>

                    <label for="email" className="p-2">Email: </label>
                    <input type="email" className="form-control" id="email" onChange={e => setEmail(e.target.value)} value={email}/>

                    <label for="fullname" className="p-2">Fullname: </label>
                    <input type="text" className="form-control" id="fullname" onChange={e => setFullname(e.target.value)} value={fullname}/>

                    <label for="age" className="p-2">Age: </label>
                    <input type="number" className="form-control" id="age" onChange={e => setAge(e.target.value)} value={age}/>


                    <label for="height" className="p-2">Height: </label>
                    <input type="number" className="form-control" id="height" onChange={e => setHeight(e.target.value)} value={height}/>

                    <label for="weight" className="p-2">Weight: </label>
                    <input type="number" className="form-control" id="weight" onChange={e => setWeight(e.target.value)} value={weight}/>

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
                    }} className="btn btn-success m-5">Update</button>
                </div>

                {/* publishing account for moderators */}
                {(role == "admin" || role == "moder") &&
                    <div>
                        {published ?
                            <button className="btn btn-danger m-3" onClick={() => updateUserUnpublish({userId})}>Unpublish</button>
                            :
                            <button className="btn btn-success m-3" onClick={() => updateUserPublish({userId})}>Publish</button>
                        }
                    </div>
                }

                {/* training list */}
                <div>
                    <h3 className="lead m-4">The whole training history:</h3>
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
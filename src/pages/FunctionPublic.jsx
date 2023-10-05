import { retrievePublicFunctionById } from "../api/FunctionApiService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthContext";
import { followFunction } from "../api/UserApiService";

export default function FunctionPublic(){

    const {userId, isAuthenticated} = useAuth();
    const {functionId} = useParams();
    const {showError, setShowError} = useState(false);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [authorId, setAuthorId] = useState(null);
    const [authorUsername, setAuthorUsername] = useState("");

    function setFunctionDetails(){
        retrievePublicFunctionById({functionId})
            .then((response) => {
                console.log(response);
                if(response.status != 200) navigate("/");
                setTitle(response.data.functionDetails.title);
                setDescription(response.data.functionDetails.description);
                setImage(response.data.functionDetails.image);
                setAuthorId(response.data.author.userId);
                setAuthorUsername(response.data.author.appUserDetails.username);
            })
            .catch((e) => {
                console.log(e);
                navigate("/");
            });
    }

    useEffect(() => {
        setFunctionDetails();
    }, []);
    

    return (
        <div>
            {showError && <div>Error</div>}
            <div className="functionDetails">
                <h3 className="m-2">{title}</h3>
                <div className="m-2">ID: <b>{functionId}</b></div>
                <div className="m-2">Description: <p>{description}</p></div>
                <img src={image} className="m-3"/>

                <div className="m-3">
                    <h5>Author</h5>
                    <div className="m-1">Id: <b>{authorId}</b></div>
                    <div>Username: <b>{authorUsername}</b></div>
                </div>

                {isAuthenticated &&
                    <button className="btn btn-success m-3" onClick={() => {
                        followFunction({userId, functionId}).then(response => console.log(response))
                            .catch(e => console.log(e));
                    }}>Follow</button>
                }
                
            </div>



        </div>
    );
}
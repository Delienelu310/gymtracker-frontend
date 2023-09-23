import { retrievePublicFunctionById } from "../api/FunctionApiService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FunctionPublic(){

    const {functionId} = useParams();
    const {showError, setShowError} = useState(false);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authorId, setAuthorId] = useState(null);
    const [authorUsername, setAuthorUsername] = useState("");

    function setFunctionDetails(){
        retrievePublicFunctionById({functionId})
            .then((response) => {
                console.log(response);
                if(response.status != 200) navigate("/");
                setTitle(response.data.functionDetails.title);
                setDescription(response.data.functionDetails.description);
                setAuthorId(response.data.author.userId);
                setAuthorUsername(response.data.author.username);
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
                <div>Id: {functionId}</div>
                <div>Title: {title}</div>
                <div>Description: {description}</div>

                <div>
                    Author: 
                    <br/>
                    <div>Id: {authorId}</div>
                    <div>Username: {authorUsername}</div>
                </div>

                {/* Make follow/unfollow based on the request */}
                <button onClick={() => "function to be implemented"}>Follow/Unfollow</button>
                
            </div>



        </div>
    );
}
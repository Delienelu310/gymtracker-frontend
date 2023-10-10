import { Link } from "react-router-dom";

export default function ExercisePrivate({
    resourse
}){
    const image = resourse.exerciseDetails.image;
    return (
        <div className="post">
            <div style={{display: "inline-block", width: image ? "70%" : "100%"}}>
                <h4>{resourse.exerciseDetails.title} - <b>{resourse.exerciseId}</b></h4>
                <hr/>
                <p>{resourse.exerciseDetails.description.substring(0,100) + (resourse.exerciseDetails.description.length > 100 ? "..." : "")}</p>
                <p>Author: {resourse.author.appUserDetails.username} - <b>{resourse.author.userId}</b></p>
                <Link style={{width: "150px", background: "#2E86C1"}} className="btn btn-primary m-2" to={`/private/exercises/${resourse.exerciseId}`}>Look</Link>
            </div>
            {image &&
                <img src={image} style={{"width": "25%", float: "right", borderRadius:"10px", display: "inline-block", marginTop: "15px"}}/>
            }
        </div>
    );
}
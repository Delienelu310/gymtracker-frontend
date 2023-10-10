import { Link } from "react-router-dom";

export default function Exercise({
    resourse
}){
    const image = resourse.exerciseDetails.image;
    return (
        <div>
            <div className="post">
                <div style={{display: "inline-block", width: image ? "70%" : "100%"}}>
                    <h4><b>{resourse.exerciseId}</b> - {resourse.exerciseDetails.title}</h4>
                    <hr/>
                    <p className="m-2">{resourse.exerciseDetails.description.substring(0,100) + (resourse.exerciseDetails.description.length > 100 ? "..." : "")}</p>
                    <p>Author: <b>{resourse.author.appUserDetails.username} - <b>{resourse.author.userId}</b></b></p>
                    <Link style={{width: "150px", background: "#2E86C1"}} to={`/exercises/${resourse.exerciseId}`} className="btn btn-primary m-3">Look</Link>
                </div>
                {image && 
                    <img src={image} style={{"width": "25%", float: "right", borderRadius:"10px", display: "inline-block", marginTop: "15px"}}/>
                }
           </div>
        </div>
    );
}
import { Link } from "react-router-dom";

export default function Exercise({
    resourse
}){
    return (
        <div>
            <div className="post">
                <h4>{resourse.exerciseDetails.title}</h4>
                <p>ID: <b>{resourse.exerciseId}</b></p>
                <p>Author: <b>{resourse.author.appUserDetails.username}</b></p>
                <p>Author ID: <b>{resourse.author.userId}</b></p>
                <Link to={`/exercises/${resourse.exerciseId}`} className="btn btn-primary m-3">Look</Link>
            </div>
        </div>
    );
}
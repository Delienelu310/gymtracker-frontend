import { Link } from "react-router-dom";

export default function ExercisePrivate({
    resourse
}){
    return (
        <div className="post">
            <h4>{resourse.exerciseDetails.title}</h4>
            <div>ID: {resourse.exerciseId}</div>
            <Link className="btn btn-primary m-2" to={`/private/exercises/${resourse.exerciseId}`}>Look</Link>
        </div>
    );
}
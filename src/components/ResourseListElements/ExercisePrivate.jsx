import { Link } from "react-router-dom";

export default function ExercisePrivate({
    resourse
}){
    return (
        <div>
            <div>Exercise id: {resourse.exerciseId}</div>
            <div>Title: {resourse.exerciseDetails.title}</div>
            <Link className="btn btn-success" to={`/private/exercises/${resourse.exerciseId}`}>more...</Link>
        </div>
    );
}
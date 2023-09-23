import { Link } from "react-router-dom";

export default function Exercise({
    resourse
}){
    return (
        <div>
            <div className="card mb-3">
                <div className="card-body">
                    <h2 className="h5">{resourse.exerciseDetails.title}</h2>
                    <p className="small">ID: {resourse.exerciseId}</p>
                    <p className="small">Author: {resourse.author.appUserDetails.username}</p>
                    <p className="small">Author ID: {resourse.author.userId}</p>
                    <Link to={`/exercises/${resourse.exerciseId}`} className="btn btn-primary btn-sm">
                    Read more
                    </Link>
                </div>
            </div>
        </div>
    );
}
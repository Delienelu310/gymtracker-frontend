import { Link } from "react-router-dom";

export default function FunctionPrivate({resourse}){
    return (
        <div className="post">
            <h4>{resourse.functionDetails.title}</h4>
            <div>Id: <b>{resourse.functionId}</b></div>
            <Link className="btn btn-primary" to={`/private/functions/${resourse.functionId}`}>Look</Link>
        </div>
    );
}
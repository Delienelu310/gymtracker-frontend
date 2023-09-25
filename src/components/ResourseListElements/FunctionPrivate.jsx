import { Link } from "react-router-dom";

export default function FunctionPrivate({resourse}){
    return (
        <div>
            <div>Function id: {resourse.functionId}</div>
            <div>Title: {resourse.functionDetails.title}</div>
            <Link className="btn btn-success" to={`/private/functions/${resourse.functionId}`}>More...</Link>
        </div>
    );
}
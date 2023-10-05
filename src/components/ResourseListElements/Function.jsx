import { Link } from "react-router-dom";

export default function Function({resourse}){
    return (
        <div className="post">
            <h4 className="m-2">{resourse.functionDetails.title}</h4>
            <div>Id: <b>{resourse.functionId}</b></div>
            <Link to={`/functions/${resourse.functionId}`} className="btn btn-primary m-3">Look</Link>
        </div>
    );
}
import { Link } from "react-router-dom";

export default function Function({resourse}){
    const image = resourse.functionDetails.image;
    const description = resourse.functionDetails.description;
    return (
        <div className="post">
            <div style={{width: image ? "70%" : "100%", display:"inline-block"}}>
                <h4 className="m-2">{resourse.functionDetails.title} - <b>{resourse.functionId}</b></h4>
                <hr/>
                {description &&
                    <p className="m-2">{description.substring(0,100) + (resourse.functionDetails.description.length > 100 ? "..." : "")}</p>
                }
                
                <p>Author: {resourse.author.appUserDetails.username} - <b>{resourse.author.userId}</b></p>
                <Link style={{width: "150px", background: "#2E86C1"}} to={`/functions/${resourse.functionId}`} className="btn btn-primary m-3">Look</Link>
            </div>
            {image && 
                <img height={150} src={resourse.functionDetails.image} style={{display:"inline-block", borderRadius:"10px", "marginTop":"15px", width:"20%", float:"right"}}/>        
            }
        </div>
    );
}
export default function User({resourse}){
    return (
        <div className="post" style={{marginBottom: "20px"}}>
            <h4>{resourse.appUserDetails.username}</h4>
            <div> ID: <b>{resourse.userId}</b></div>
            <div>Full name: <b>{resourse.appUserDetails.fullname}</b></div>
        </div>
    );
}
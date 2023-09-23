export default function User({resourse}){
    return (
        <div>
            <div>User id: {resourse.userId}</div>
            <div>Username: {resourse.appUserDetails.username}</div>
            <div>Full name: {resourse.appUserDetails.fullname}</div>
        </div>
    );
}
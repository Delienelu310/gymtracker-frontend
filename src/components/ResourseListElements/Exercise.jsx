export default function Exercise({
    resourse
}){
    return (
        <div>
            <div>Exercise id: {resourse.exerciseId}</div>
            <div>Title: {resourse.exerciseDetails.title}</div>
        </div>
    );
}
export default function Exercise({
    resourse
}){
    return (
        <div>
            <span>{resourse.title}</span>
            <span>{resourse.exerciseId}</span>
        </div>
    );
}
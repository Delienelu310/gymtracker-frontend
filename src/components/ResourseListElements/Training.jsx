import { calculatePerformanceOfTraining } from "../../businessLogic/performanceCalculation";
import { deleteTraining } from "../../api/TrainingApiService";

export default function Training({resourse: training, refreshResourses}){
    
    const date = training.trainingDetails.dateTime;
    return (
        <div className="post" key={training.trainingId} style={{
            marginBottom: "20px"
        }}>
            <h5>{training.exerciseTitle}</h5>
            <div className="m-2">Exercise id: <b>{training.exercise.exerciseId}</b></div>

            <div className="m-1">Id: <b>{training.trainingId}</b></div>
            <div className="m-1">Time: <b>{new Date(date[0], date[1], date[2]).toLocaleDateString()}</b></div>

            <h5>Sets:</h5>
            <ul className="m-3">
                {training.takes.map(take => 
                    <li >Level: <b>{take.level}</b>, Repeats: <b>{take.repeats}</b></li>                                
                )}
            </ul>
            
            <div>Perforamce: <b>{calculatePerformanceOfTraining(training)}</b></div>

            <button onClick={() => {
                deleteTraining({userId: training.userId, exerciseId: training.exerciseId, trainingId: training.trainingId})
                    .then(refreshResourses);
            }} className="btn btn-danger m-3">Delete</button>
        </div>
    );
}
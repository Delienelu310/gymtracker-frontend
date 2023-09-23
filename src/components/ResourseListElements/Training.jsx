import { calculatePerformanceOfTraining } from "../../businessLogic/performanceCalculation";
import { deleteTraining } from "../../api/TrainingApiService";

export default function Training({resourse: training, refreshResourses}){
    
    const date = training.trainingDetails.dateTime;
    return (
        <div key={training.trainingId}>
            <span>Exercise id: {training.exerciseId}</span>
            <span>Exercise title: {training.exerciseTitle}</span>
            <br/>
            <span>Training id: {training.trainingId} </span>
            <span>Time: {new Date(date[0], date[1], date[2]).toLocaleDateString()}</span>
            <br/>
            <span>Takes:</span>
            {training.takes.map(take => 
                <div>
                    <div>Level: {take.level}</div>
                    <div>Repeats: {take.repeats}</div> 
                </div>                                
            )}
            <span>Perforamce: {calculatePerformanceOfTraining(training)}</span>
            <button onClick={() => {
                deleteTraining({userId: training.userId, exerciseId: training.exerciseId, trainingId: training.trainingId})
                    .then(refreshResourses);
            }} className="btn btn-danger">Delete</button>
        </div>
    );
}
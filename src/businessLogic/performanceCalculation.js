export function calculatePerformanceOfTake({repeats, level}){
    if(repeats > 30) repeats = 30;
    return level / (1- 0.02 * repeats);
}

export function calculatePerformanceOfTraining({takes}){
    return Math.round(Math.max(takes.map(take => calculatePerformanceOfTake(take))) * 100) / 100;
}

export function prepareExerciseGraphData(trainings){
    let data = [];
    for(let training of trainings){
        let date = training.trainingDetails.dateTime;
        data.push({
            x: new Date(date[0], date[1], date[2]),
            y: calculatePerformanceOfTraining(training)
        });
    }
    return [data];
}

export function prepareFunctionGraphData(trainingsForEachExercise){
    
    let exerciseGraphs = [];
    
    for(let trainings of trainingsForEachExercise){
        if(trainings.length == 0){
            exerciseGraphs.push([]);
            continue;
        } 
        
        trainings.sort((tr1, tr2) => +tr1.trainingDetails.dateTime - +tr2.trainingDetails.dateTime);
        let initialPerformance = calculatePerformanceOfTraining(trainings[0]);

        let exerciseGraph = [];
        for(let training of trainings){
            exerciseGraph.push({
                x: training.trainingDetails.dateTime,
                y: Math.round(calculatePerformanceOfTraining(training) / initialPerformance * 100) / 100
            });
        }
        exerciseGraphs.push(exerciseGraph);

    }
    return exerciseGraphs;
}
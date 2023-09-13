import ResourceList from "../components/ResourceList";
import Exercise from "../components/ResourseListElements/Exercise";
import { retrievePublicExercises } from "../api/ExerciseApiService";

export default function ExerciseList(){


    return  (
        <div>
            <ResourceList
                ResourseWrapper={Exercise}      
                retrieveResourses={retrievePublicExercises}
            ></ResourceList>
        </div>
    )
}
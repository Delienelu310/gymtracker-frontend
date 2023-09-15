import { useState } from "react";

export default function ListFilter({filtering: {
    isActive,
    isFilteredByUsers,
    isFilteredByFunctions,
    isFilteredByExercises
}, filteringResourses, setFilteringResourses}){

    const [user , setUser] = useState();
    const [exercise, setExercise] = useState();
    const [func ,setFunc] = useState();

    return (

        isActive && 
        <div>
            Filter
            <br/>
            {isFilteredByUsers && 
                <div>
                    User ids: 
                    {filteringResourses.users.map((userId) => <span>{userId}, </span>)}
                    <br/>
                    <input value={user} onChange={(e) => setUser(e.target.value)}/>
                    <button onClick={filteringResourses.users.push(func)}>Add user id</button>
                    <button onClick={filteringResourses.users = filteringResourses.users.filter((userId) => userId != user)}>Remove user id</button>
                
                </div>
            }
            {isFilteredByFunctions && 
                <div>
                    Functions ids: 
                    {filteringResourses.functions.map((functionId) => <span>{functionId}, </span>)}
                    <br/>
                    <input value={func} onChange={(e) => setFunc(e.target.value)}/>
                    <button onClick={filteringResourses.functions.push(func)}>Add function id</button>
                    <button onClick={filteringResourses.functions = filteringResourses.functions.filter((functionId) => functionId != func)}>Remove function id</button>
                
                </div>
            }
            {isFilteredByExercises && 
                <div>
                    Exercise ids: 
                    {filteringResourses.exercises.map((exerciseId) => <span>{exerciseId}, </span>)}
                    <br/>
                    <input value={exercise} onChange={(e) => setExercise(e.target.value)}/>
                    <button onClick={filteringResourses.exercises.push(exercise)}>Add exercise id</button>
                    <button onClick={filteringResourses.exercises = filteringResourses.exercises.filter((exerciseId) => exerciseId != exercise)}>Remove exercise id</button>
                </div>
            }
            <button onClick={() => setFilteringResourses(filteringResourses)}>Apply</button>

        </div>

        
    );
}
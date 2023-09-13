
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResourceList from './components/ResourceList';
import { retrievePublicExercises } from './api/ExerciseApiService';
import Exercise from './components/ResourseListElements/Exercise';
import Login from './pages/Login';

export default function GymTrackerApp(){
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path="/exercises" element={<ResourceList
                            retrieveResourses={retrievePublicExercises}
                            ResourseWrapper={Exercise}
                        />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
            // {/* <BrowserRouter>
            //     <Routes>
            //     {/* <Route path="/login" element={<></>}/> */}
            //     {/* <Route path="/register" element={<></>}/> */}

            //     {/* public resources */}
            //     {/* <Route path="/exercises" element={<ResourceList
            //         retrieveResourses={retrievePublicExercises}
            //         ResourseWrapper={Exercise}
            //         ></ResourceList>}
            //     /> */}
            //     {/* <Route path="/functions" element={<></>}/>
            //     <Route path="/users" element={<></>}/>

            //     <Route path="/exercises/:exerciseId" element={<></>}/>
            //     <Route path="/functions/:functionId" element={<></>}/>
            //     <Route path="/users/:userId" element={<></>}/>

            //     <Route path="/created/exercises" element={<></>}/>
            //     <Route path="/created/functions" element={<></>}/>
            //     <Route path="/followed/exercises" element={<></>}/>
            //     <Route path="/followed/functions" element={<></>}/>

            //     <Route path="/created/exercises/:exerciseId" element={<></>}/>
            //     <Route path="/created/functions/:functionId" element={<></>}/>
            //     <Route path="/followed/exercises/:exerciseId" element={<></>}/>
            //     <Route path="/followed/functions/:functionId" element={<></>}/>

            //     <Route path="/created/exercises/:exerciseId" element={<></>}/>
            //     <Route path="/created/functions/:functionId" element={<></>}/>
            //     <Route path="/followed/exercises/:exerciseId" element={<></>}/>
            //     <Route path="/followed/functions/:functionId" element={<></>}/>

            //     <Route path="/update/exercise" element={<></>}/>
            //     <Route path="/update/function" element={<></>}/>
            //     <Route path="/update/user" element={<></>}/>


            //     */}

            //     {/* <Route path="/" element={Login}/>/ */}
            //     {/* only for admins ? */}
                

            // //     </Routes>
            // // </BrowserRouter> */}
    );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResourceList from './components/ResourceList';
import { retrievePublicExercises, retrieveExercisesAll, retrieveExercisesCreated, retrieveExercisesFollowed } from './api/ExerciseApiService';
import { retrievePublicFunctions, retrieveFunctionsAll, retrieveFunctionsCreated, retrieveFunctionsFollowed } from './api/FunctionApiService';
import Exercise from './components/ResourseListElements/Exercise';
import Function from "./components/ResourseListElements/Function";

import Login from './pages/Login';
import AuthProvider from './security/AuthContext';
import Registration from './pages/Registration';
import Header from './components/Header';
import { useAuth } from './security/AuthContext';
import { Navigate } from 'react-router-dom';
import ExerciseUpdate from './pages/ExerciseUpdate';
import FunctionUpdate from './pages/FunctionUpdate';
import UserUpdate from './pages/UserUpdate';
import { retrievePublicUsers } from './api/UserApiService';
import User from './components/ResourseListElements/User';

function AuthenticatedRoute({children}){

    const authContext = useAuth();
    if(authContext.isAuthenticated) return children;
    else return <Navigate to="/"/>
    
}

export default function GymTrackerApp(){
    return (
        <div>
            <AuthProvider>
                <Header/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            <ResourceList
                                retrieveResourses={retrievePublicExercises}
                                ResourseWrapper={Exercise}
                            />}
                        />
                        <Route path="/register" element={
                            <Registration/>
                        }/>
                        <Route path="/login" element={
                            <Login/>
                        }/>

                        {/* public users */}

                        <Route path="/public/users" element={
                            <ResourceList
                                retrieveResourses={retrievePublicUsers}
                                ResourseWrapper={User}
                            />
                        }/>
                        <Route path="/public/users/:userId" element={
                            <></>
                        }/>

                        {/* exercise lists */}

                        <Route path="/exercises" element={
                            <ResourceList
                                retrieveResourses={retrievePublicExercises}
                                ResourseWrapper={Exercise}
                            />}
                        />

                        <Route path="/private/exercises" element={
                            <AuthenticatedRoute>
                                <ResourceList
                                    retrieveResourses={retrieveExercisesAll}
                                    ResourseWrapper={Exercise}
                                />
                            </AuthenticatedRoute>
                        }/>

                        <Route path="/private/exercises/created" element={
                            <AuthenticatedRoute>
                                <ResourceList
                                    retrieveResourses={retrieveExercisesCreated}
                                    ResourseWrapper={Exercise}
                                />
                            </AuthenticatedRoute>
                        }/>

                        <Route path="/private/exercises/followed" element={
                            <AuthenticatedRoute>
                                <ResourceList
                                    retrieveResourses={retrieveExercisesFollowed}
                                    ResourseWrapper={Exercise}
                                />
                            </AuthenticatedRoute>
                        }/>

                        {/* function lists */}

                        <Route path="/functions" element={
                            <ResourceList
                                retrieveResourses={retrievePublicFunctions}
                                ResourseWrapper={Function}
                            />
                        }/>

                        <Route path="/private/functions" element={
                            <AuthenticatedRoute>
                                <ResourceList
                                    retrieveResourses={retrieveFunctionsAll}
                                    ResourseWrapper={Function}
                                />
                            </AuthenticatedRoute>
                        }/>

                        <Route path="/private/functions/created" element={
                            <AuthenticatedRoute>
                                <ResourceList
                                    retrieveResourses={retrieveFunctionsCreated}
                                    ResourseWrapper={Function}
                                />
                            </AuthenticatedRoute>
                        }/>

                        <Route path="/private/functions/followed" element={
                            <AuthenticatedRoute>
                                <ResourceList
                                    retrieveResourses={retrieveFunctionsFollowed}
                                    ResourseWrapper={Function}
                                />
                            </AuthenticatedRoute>
                        }/>

                        {/* exercise pages */}

                        <Route path="/exercises/:exerciseId" element={
                            <></>
                        }/>

                        <Route path="/private/exercises/:exerciseId" element={
                            <AuthenticatedRoute>

                            </AuthenticatedRoute>
                        }/>

                        {/* function pages */}
                        <Route path="/functions/:functionId" element={
                            <></>
                        }/>

                        <Route path="/private/functions/:functionId" element={
                            <AuthenticatedRoute>

                            </AuthenticatedRoute>
                        }/>

                        {/* user details */}
                        <Route path="/account" element={
                            <></>
                        }/>

                        {/* resourse updating pages */}
                        <Route path="/update/exercises/:exerciseId" element={
                            <AuthenticatedRoute>
                                <ExerciseUpdate/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path="/update/functions/:functionsId" element={
                            <AuthenticatedRoute>
                                <FunctionUpdate/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path="/update/account" element={
                            <AuthenticatedRoute>
                                <UserUpdate/>
                            </AuthenticatedRoute>
                        }/>

                        {/* resource creating pages */}
                        <Route path="/update/exercises" element={
                            <AuthenticatedRoute>
                                <ExerciseUpdate/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path="/update/functions" element={
                            <AuthenticatedRoute>
                                <FunctionUpdate/>
                            </AuthenticatedRoute>
                        }/>
                        


                        {/* admin pages */}

                    </Routes>
                </BrowserRouter>
            </AuthProvider>
            
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
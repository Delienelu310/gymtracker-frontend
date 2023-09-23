
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResourceList from './components/ResourceList';
import { retrievePublicExercises, retrieveExercisesAll, retrieveExercisesCreated, retrieveExercisesFollowed } from './api/ExerciseApiService';
import { retrievePublicFunctions, retrieveFunctionsAll, retrieveFunctionsCreated, retrieveFunctionsFollowed } from './api/FunctionApiService';
import Exercise from './components/ResourseListElements/Exercise';
import ExercisePrivate from './components/ResourseListElements/ExercisePrivate'
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
import UserPublic from './pages/UserPublic';
import ExercisePublicPage from './pages/ExercisePublicPage';
import FunctionPublic from './pages/FunctionPublic';
import ExercisePage from './pages/ExercisePage';
import FunctionPage from './pages/FunctionPage';
import Account from './pages/Account';

function AuthenticatedRoute({children}){

    const authContext = useAuth();
    if(authContext.isAuthenticated) return children;
    else return <Navigate to="/"/>
    
}

export default function GymTrackerApp(){
    return (
        <div className='gymtracker_app'>
        <AuthProvider>
            
            <BrowserRouter>
                <Header/>
                <Routes>
                    
                    <Route path="/" element={
                        <ResourceList
                            retrieveResourses={retrievePublicExercises}
                            searchFilterFunction={(resourse, query) => {
                                return resourse.exerciseDetails.title.startsWith(query);
                            }}
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
                            key={"public_users_list"}
                            retrieveResourses={retrievePublicUsers}
                            ResourseWrapper={User}
                            searchFilterFunction={(resourse, query) => {
                                return resourse.appUserDetails.username.startsWith(query);
                            }}
                        />
                    }/>
                    <Route path="/public/users/:userId" element={
                        <UserPublic/>
                    }/>

                    {/* exercise lists */}

                    <Route path="/exercises" element={
                        <ResourceList
                            key={"public_exercises_list"}
                            retrieveResourses={retrievePublicExercises}
                            ResourseWrapper={Exercise}
                            searchFilterFunction={(resourse, query) => {
                                return resourse.exerciseDetails.title.startsWith(query);
                            }}
                        />}
                    />

                    <Route path="/private/exercises" element={
                        <AuthenticatedRoute>
                            <ResourceList
                                key={"private_exercises_list"}
                                retrieveResourses={retrieveExercisesAll}
                                ResourseWrapper={ExercisePrivate}
                            />
                        </AuthenticatedRoute>
                    }/>

                    <Route path="/private/exercises/created" element={
                        <AuthenticatedRoute>
                            <ResourceList
                                key={"private_exercises_created_list"}
                                retrieveResourses={retrieveExercisesCreated}
                                ResourseWrapper={ExercisePrivate}
                            />
                        </AuthenticatedRoute>
                    }/>

                    <Route path="/private/exercises/followed" element={
                        <AuthenticatedRoute>
                            <ResourceList
                                key={"private_exercises_followed_list"}
                                retrieveResourses={retrieveExercisesFollowed}
                                ResourseWrapper={ExercisePrivate}
                            />
                        </AuthenticatedRoute>
                    }/>

                    {/* function lists */}

                    <Route path="/functions" element={
                        <ResourceList
                            key={"public_functions_list"}
                            retrieveResourses={retrievePublicFunctions}
                            ResourseWrapper={Function}
                            searchFilterFunction={(resourse, query) => {
                                return resourse.functionDetails.title.startsWith(query);
                            }}
                        />
                    }/>

                    <Route path="/private/functions" element={
                        <AuthenticatedRoute>
                            <ResourceList
                                key={"private_functions_list"}
                                retrieveResourses={retrieveFunctionsAll}
                                ResourseWrapper={Function}
                            />
                        </AuthenticatedRoute>
                    }/>

                    <Route path="/private/functions/created" element={
                        <AuthenticatedRoute>
                            <ResourceList
                                key={"private_functions_created_list"}
                                retrieveResourses={retrieveFunctionsCreated}
                                ResourseWrapper={Function}
                            />
                        </AuthenticatedRoute>
                    }/>

                    <Route path="/private/functions/followed" element={
                        <AuthenticatedRoute>
                            <ResourceList
                                key={"private_functions_followed_list"}
                                retrieveResourses={retrieveFunctionsFollowed}
                                ResourseWrapper={Function}
                            />
                        </AuthenticatedRoute>
                    }/>

                    {/* exercise pages */}

                    <Route path="/exercises/:exerciseId" element={
                        <ExercisePublicPage/>
                    }/>

                    <Route path="/private/exercises/:exerciseId" element={
                        <AuthenticatedRoute>
                            <ExercisePage/>
                        </AuthenticatedRoute>
                    }/>

                    {/* function pages */}
                    <Route path="/functions/:functionId" element={
                        <FunctionPublic/>
                    }/>

                    <Route path="/private/functions/:functionId" element={
                        <AuthenticatedRoute>
                            <FunctionPage/>
                        </AuthenticatedRoute>
                    }/>

                    {/* user details */}
                    <Route path="/account" element={
                        <AuthenticatedRoute>
                            <Account/>
                        </AuthenticatedRoute>
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
                    {/* admin should have access to update, read and other pages through links like user/userid/resourse/resourseid etc*/}

                </Routes>
            </BrowserRouter>
        </AuthProvider>
        </div>

    );
}
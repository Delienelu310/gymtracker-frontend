import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';

//special
import { useAuth } from './security/AuthContext';
import { retrievePublicExercises, retrieveExercisesAll, retrieveExercisesCreated, retrieveExercisesFollowed } from './api/ExerciseApiService';
import { retrievePublicFunctions, retrieveFunctionsAll, retrieveFunctionsCreated, retrieveFunctionsFollowed } from './api/FunctionApiService';
import { retrievePublicUsers } from './api/UserApiService';

import AuthProvider from './security/AuthContext';
import Header from './components/Header';

//lists and their componnets:
import Exercise from './components/ResourseListElements/Exercise';
import ExercisePrivate from './components/ResourseListElements/ExercisePrivate'
import Function from "./components/ResourseListElements/Function";
import User from './components/ResourseListElements/User';
import ResourceList from './components/ResourceList';

//pages
import Login from './pages/Login';
import Registration from './pages/Registration';

import ExerciseUpdate from './pages/ExerciseUpdate';
import FunctionUpdate from './pages/FunctionUpdate';

import UserPublic from './pages/UserPublic';
import ExercisePublicPage from './pages/ExercisePublicPage';
import FunctionPublic from './pages/FunctionPublic';
import ExercisePage from './pages/ExercisePage';
import FunctionPage from './pages/FunctionPage';
import Account from './pages/Account';
import FunctionPrivate from './components/ResourseListElements/FunctionPrivate';
import { WelcomePage } from './pages/WelcomePage';
import { getFunctionGroupsFromWebmoderator, getPrivateCreatedFunctionOfGroup, getPrivateFollowedFunctionOfGroup, getPrivateFunctionsOfGroup, getPublicFunctionOfGroup } from './api/FunctionGroupsApi';
import { useEffect, useState } from 'react';
import ResourseListGroupWrapper from './components/ResourseListGroupWrapper';
import { HelpPage } from './pages/HelpPage';

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
                        <WelcomePage/>
                    }/>

                    <Route path="/help" element={
                        <HelpPage/>
                    }/>

                    <Route path="/register" element={
                        <Registration/>
                    }/>
                    <Route path="/login" element={
                        <Login/>
                    }/>

                    {/* public users */}

                    <Route path="/public/users" element={
                        <div className='wrapper'>
                            <ResourceList
                                key={"public_users_list"}
                                retrieveResourses={retrievePublicUsers}
                                ResourseWrapper={User}
                                searchFilterFunction={(resourse, query) => {
                                    return resourse.appUserDetails.username.startsWith(query);
                                }}
                            />
                        </div>
                    }/>


                    <Route path="/public/users/:userId" element={
                        <UserPublic/>
                    }/>

                    {/* exercise lists */}

                    <Route path="/exercises" element={
                        <div className='wrapper'>
                            <ResourceList
                                key={"public_exercises_list"}
                                retrieveResourses={retrievePublicExercises}
                                ResourseWrapper={Exercise}
                                searchFilterFunction={(resourse, query) => {
                                    return resourse.exerciseDetails.title.startsWith(query);
                                }}
                            />
                        </div>
                    }/>

                    <Route path="/private/exercises" element={
                        <AuthenticatedRoute>
                            <div className='wrapper'>
                                <ResourceList
                                    key={"private_exercises_list"}
                                    retrieveResourses={retrieveExercisesAll}
                                    ResourseWrapper={ExercisePrivate}
                                    searchFilterFunction={(resourse, query) => {
                                        return resourse.exerciseDetails.title.startsWith(query);
                                    }}
                                />
                            </div>
                            
                        </AuthenticatedRoute>
                    }/>

                    <Route path="/private/exercises/created" element={
                        <AuthenticatedRoute>
                            <div className='wrapper'>
                                <ResourceList
                                    key={"private_exercises_created_list"}
                                    retrieveResourses={retrieveExercisesCreated}
                                    ResourseWrapper={ExercisePrivate}
                                    searchFilterFunction={(resourse, query) => {
                                        return resourse.exerciseDetails.title.startsWith(query);
                                    }}
                                />
                            </div>
                            
                        </AuthenticatedRoute>
                    }/>

                    <Route path="/private/exercises/followed" element={
                        <AuthenticatedRoute>
                            <div className='wrapper'>
                                <ResourceList
                                    key={"private_exercises_followed_list"}
                                    retrieveResourses={retrieveExercisesFollowed}
                                    ResourseWrapper={ExercisePrivate}
                                    searchFilterFunction={(resourse, query) => {
                                        return resourse.exerciseDetails.title.startsWith(query);
                                    }}
                                />
                            </div>
                            
                        </AuthenticatedRoute>
                    }/>

                    {/* function lists */}

                    <Route path="/functions" element={
                        <div className='wrapper'>
                            <ResourceList
                                key={"public_functions_list"}
                                retrieveResourses={retrievePublicFunctions}
                                ResourseWrapper={Function}
                                searchFilterFunction={(resourse, query) => {
                                    return resourse.functionDetails.title.startsWith(query);
                                }}
                            />
                        </div>
                        
                    }/>

                    <Route path="/functiongroups/:functionGroupId/functions" element={
                        <div className='wrapper'>
                            <ResourseListGroupWrapper
                                key={"public_functiongroup_list"}
                                retrieveResourses={getPublicFunctionOfGroup}
                                ResourseWrapper={Function}
                                searchFilterFunction={(resourse, query) => {
                                    return resourse.functionDetails.title.startsWith(query);
                                }}
                            />
                        </div>
                    }/>

                    <Route path="/private/functions" element={
                        <AuthenticatedRoute>
                            <div className='wrapper'>
                                <ResourceList
                                    key={"private_functions_list"}
                                    retrieveResourses={retrieveFunctionsAll}
                                    ResourseWrapper={FunctionPrivate}
                                    searchFilterFunction={(resourse, query) => {
                                        return resourse.functionDetails.title.startsWith(query);
                                    }}
                                />
                            </div>
                        </AuthenticatedRoute>
                    }/>

                    <Route path="/private/functiongroups/:functionGroupId/functions" element={
                        <AuthenticatedRoute>
                            <div className='wrapper'>
                                
                                <ResourseListGroupWrapper
                                    key={"private_functiongroup_list"}
                                    retrieveResourses={getPrivateFunctionsOfGroup}
                                    ResourseWrapper={FunctionPrivate}
                                    searchFilterFunction={(resourse, query) => {
                                        return resourse.functionDetails.title.startsWith(query);
                                    }}
                                />
                            </div>
                        </AuthenticatedRoute>
                        
                    }/>

                    <Route path="/private/functions/created" element={
                        <AuthenticatedRoute>
                            <div className='wrapper'>
                                <ResourceList
                                    key={"private_functions_created_list"}
                                    retrieveResourses={retrieveFunctionsCreated}
                                    ResourseWrapper={FunctionPrivate}
                                    searchFilterFunction={(resourse, query) => {
                                        return resourse.functionDetails.title.startsWith(query);
                                    }}
                                />
                            </div>
                            
                        </AuthenticatedRoute>
                    }/>

                    <Route path="/private/functiongroups/:functionGroupId/functions/created" element={
                        <AuthenticatedRoute>
                            <div className='wrapper'>
                                <ResourseListGroupWrapper
                                    key={"private_functiongroup_list_created"}
                                    retrieveResourses={getPrivateCreatedFunctionOfGroup}
                                    ResourseWrapper={FunctionPrivate}
                                    searchFilterFunction={(resourse, query) => {
                                        return resourse.functionDetails.title.startsWith(query);
                                    }}
                                />
                            </div>
                        </AuthenticatedRoute>
                        
                    }/>

                    <Route path="/private/functions/followed" element={
                        <AuthenticatedRoute>
                            <div className='wrapper'>
                                <ResourceList
                                    key={"private_functions_followed_list"}
                                    retrieveResourses={retrieveFunctionsFollowed}
                                    ResourseWrapper={FunctionPrivate}
                                    searchFilterFunction={(resourse, query) => {
                                        return resourse.functionDetails.title.startsWith(query);
                                    }}
                                />
                            </div>
                            
                        </AuthenticatedRoute>
                    }/>

                    <Route path="/private/functiongroups/:functionGroupId/functions/followed" element={
                        <AuthenticatedRoute>
                            <div className='wrapper'>
                                <ResourseListGroupWrapper
                                    key={"private_functiongroup_list_created"}
                                    retrieveResourses={getPrivateFollowedFunctionOfGroup}
                                    ResourseWrapper={FunctionPrivate}
                                    searchFilterFunction={(resourse, query) => {
                                        return resourse.functionDetails.title.startsWith(query);
                                    }}
                                />
                            </div>
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

                    {/* resource creating pages */}
                    <Route path="/create/exercise" element={
                        <AuthenticatedRoute>
                            <ExerciseUpdate/>
                        </AuthenticatedRoute>
                    }/>
                    <Route path="/create/function" element={
                        <AuthenticatedRoute>
                            <FunctionUpdate/>
                        </AuthenticatedRoute>
                    }/>

                    <Route path="/create/function/functiongroup/:functionGroupId" element={
                        <AuthenticatedRoute>
                            <FunctionUpdate/>
                        </AuthenticatedRoute>
                    }/>
                    
                </Routes>
            </BrowserRouter>
        </AuthProvider>
        </div>

    );
}
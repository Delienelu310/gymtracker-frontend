import SearchBar from "./ResourseListElements/SearchBar";
import ListFilter from "./ResourseListElements/ListFilter";

import { useEffect, useState } from "react";
import { apiClient } from "../api/ApiClient";


export default function ResourceList({
    filtering,
    ResourseWrapper,
    retrieveResourses,
}){

    const [searchQuery, setSearchQuery] = useState('');
    
    //contain ids
    const [filteringResourses, setFilteringResourses] = useState({
        exercises: [],
        functions: [],
        users: []
    });

    const [resourses, setResourses] = useState([]);

    useEffect(() => {
        retrieveResourses(filteringResourses)
            .then((response) => {
                setResourses(response.data);
            })
            .catch(error => console.log(error));
        }, [filteringResourses, searchQuery]
    );


    return (
        <div>
            <SearchBar 
                query={searchQuery} 
                setQuery={setSearchQuery}
            ></SearchBar>

            <ListFilter
                filtering={filtering}
                filteringResourses={filteringResourses}
                setFilteringResourses={setFilteringResourses}
            ></ListFilter>

            <hr/>

            {
                resourses != null ?
                    resourses
                        .filter((resourse) => {
                            if(resourse.title && resourse.title.startsWith(searchQuery) ||
                                resourse.username && resourse.username.startsWith(searchQuery))
                                return true;
                        })
                        .map((resourse) => {                 
                            return (
                                <ResourseWrapper resourse={resourse}></ResourseWrapper>
                            );
                        })
                    :
                    <span>The resources are missing</span>

            }

            <hr/>
            <button className="btn btn-success" onClick={() => {
                apiClient.get("/users")
            }}>Test</button>
        </div>
    );
}
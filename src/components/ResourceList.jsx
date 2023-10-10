import SearchBar from "./ResourseListElements/SearchBar";
import ListFilter from "./ResourseListElements/ListFilter";

import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthContext";

export default function ResourceList({
    filtering,
    ResourseWrapper,
    retrieveResourses,
    searchFilterFunction
}){

    const auth = useAuth();

    const [searchQuery, setSearchQuery] = useState('');
    
    //contain ids
    const [filteringResourses, setFilteringResourses] = useState({
        exercises: [],
        functions: [],
        users: []
    });

    const [resourses, setResourses] = useState([]);

    useEffect(() => {
        retrieveResourses(filteringResourses, {userId: auth.userId})
            .then((response) => {
                setResourses(response);
            })
            .catch(error => {
                console.log(error);
                setResourses(null)
            });
        }, [filteringResourses, searchQuery, retrieveResourses]
    );


    return (
        
        <div className="m-5">
            
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
            resourses != null && resourses.length > 0 ?
                resourses
                    .filter((resourse) => {
                        if(!searchFilterFunction) return true;
                        return searchFilterFunction(resourse, searchQuery);
                    })
                    .map((resourse, index) => {            
                        return (
                            <ResourseWrapper key={index} resourse={resourse}></ResourseWrapper>
                        );
                    })
                :
                <span>The resources are missing</span>
            }

        </div>
    );
}
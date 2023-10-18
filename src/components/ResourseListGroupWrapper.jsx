import { useParams } from "react-router-dom";
import ResourceList from "./ResourceList";

export default function ResourseListGroupWrapper({retrieveResourses, ResourseWrapper, searchFilterFunction}){

    const {functionGroupId} = useParams();

    return (
        <ResourceList
            searchFilterFunction={searchFilterFunction}
            retrieveResourses={(filteringResourses, ids) => {
                
                ids.functionGroupId = functionGroupId;

                return retrieveResourses(filteringResourses, ids);
            }}
            ResourseWrapper={ResourseWrapper}
        />
    );
}
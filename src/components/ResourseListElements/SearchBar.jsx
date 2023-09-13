export default function SearchBar({
    query, setQuery
}){
    return (
        <div>
            <input 
                onChange={(e) => {setQuery(e.target.value)}} 
                value="query"
                placeholder="search"
            />
        </div>
    );
}
import {getAllTags, useAllTags} from "../api"

function TestingGrounds() {

    const allTags = getAllTags();
    const usingAllTags = useAllTags();

    /*
    const [tableDataCpy, setTableDataCpy] = useState([]);
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		fetch("/api/get-contacts")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setTableDataCpy(data.contacts);
				setFilteredData(data.contacts);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
    */


    return (
        <>
        <p> TEST PAGE!!!</p>

        <p> {allTags} </p>

        
        <p>  </p>
        <p> {usingAllTags} </p>

        </>


    );
    /*https://reactjs.org/docs/error-decoder.html/?invariant=31&args 
    Objects are not valid as a React child (found: [missing argument]). If you meant to render a collection of children, use an array instead.
    */

}

export default TestingGrounds;
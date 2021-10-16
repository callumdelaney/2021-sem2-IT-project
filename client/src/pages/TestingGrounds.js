//import { getAllTags, useAllTags } from "../api";
import { useState, useEffect } from "react";
//import MaterialTable from "material-table";

function TestingGrounds() {
	

	const [tableDataCpy, setTableDataCpy] = useState([]);
	

	useEffect(() => {
		fetch("/api/get-tags")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setTableDataCpy(data.tags);
				
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);


	return (
		<div>
			{tableDataCpy.map((tag) => {
				return <h4 key={tag._id}>{tag.tagText}</h4>;
			})}
		</div>
	);
}

/*https://reactjs.org/docs/error-decoder.html/?invariant=31&args 
    Objects are not valid as a React child (found: [missing argument]). If you meant to render a collection of children, use an array instead.
    */

export default TestingGrounds;

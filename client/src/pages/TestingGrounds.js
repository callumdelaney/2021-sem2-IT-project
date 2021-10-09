import {getAllTags, useAllTags} from "../api"
import {useState, useEffect} from 'react';

function TestingGrounds() {

    /*
    const allTags = getAllTags();
    console.log("loging get all tags");
    console.log(allTags);
    const usingAllTags = useAllTags();
    */
    
    const [tableDataCpy, setTableDataCpy] = useState([]);
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		fetch("/api/get-tags")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setTableDataCpy(data.tags);
				//setFilteredData(data.contacts);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);


    
	const column = [
		{
			title: "tag",
			field: "tag text",
			/*render a div in each cell so that name and tags can be displayed in one cell*/
			render: (tableDataCpy) => {
				return (
					<div>
						{/* table contents */}
						<h4>
							{tableDataCpy.tagText} 
						</h4>
					</div>
				);
			},
		},
	];



    return (
		<div>
			
				columns={column}
				data={tableDataCpy}
				title=""
				
				
				

                
			
		
		</div>
	);
}


    /*https://reactjs.org/docs/error-decoder.html/?invariant=31&args 
    Objects are not valid as a React child (found: [missing argument]). If you meant to render a collection of children, use an array instead.
    */


export default TestingGrounds;
import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { MTableToolbar } from "material-table";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useGlobalState } from "state-pool";

function ContactsTable() {
	const [tableDataCpy, setTableDataCpy] = useState([]);
	const [filteredData, setFilteredData] = useState([]);

	fetch("/api/get-contacts", {})
		.then((res) => res.json())
		.then((data) => {
			setTableDataCpy(data.contacts)
			setFilteredData(data.contacts)
		})
		.catch((error) => {
			console.log(error);
		});

	const [category, setCategory] = useState("");
	const [selectedRow, setSelectedRow] = useState(null);
	// access the global variable contactInfo
	// eslint-disable-next-line
	const [info, setInfo] = useGlobalState("contactInfo");

	// useEffect hook for dealing with category changes
	useEffect(() => {
		setFilteredData(
			category === ""
				? tableDataCpy
				: // filter data shown based on category equivalence
				tableDataCpy.filter((data) => data.category === category)
		);
	}, [category, tableDataCpy]);

	const column = [
		{
			title: "Name",
			field: "firstName",
			/*render a div in each cell so that name and tags can be displayed in one cell*/
			render: (filteredData) => {

				return (
					<div>
						{/* table contents */}
						<h4>
							{filteredData.firstName} {filteredData.lastName}
						</h4>

					</div>
				);
			},
		},
		{
			title: "Category",
			field: "category",
			// hidden: true,
		},
	];
	// color constants used in styles
	const iconColor = "#83498A";
	const businessColor = "orange";
	const personalColor = "yellow";
	const whiteColor = "white";

	// update the selected contact information in a global variable
	function updateSelectedContact(
		fstName,
		lstName,
		cat,
		notes,
		phoneNumber,
		email,
		photo,
		id) {
		// set contact info to selected contact, with addContact and editContact flags being set to false
		setInfo({
			addContact: false,
			editContact: false,
			firstName: fstName,
			lastName: lstName,
			category: cat,
			notes: notes,
			phoneNumber: phoneNumber,
			email: email,
			photo: photo,
			id: id,
		});
	};

	return (
		<div>
			<MaterialTable
				columns={column}
				data={() => filteredData}
				title=""
				actions={[
					{
						// create contact button
						icon: () => (
							<AddCircleIcon
								style={{ fill: iconColor }}
								fontSize="large"
							/>
						),
						tooltip: "Create Contact",
						position: "toolbar",
						onClick: () => {
							// set addContact to true so that Contact component knows to display add contact element
							setInfo({
								addContact: true,
								firstName: "",
								category: "",
							});
							setSelectedRow(null);
						},
					},
				]}
				// function for clicking on firstName
				onRowClick={(e, selectedRow) => {
					setSelectedRow(selectedRow);
					console.log(selectedRow);
					updateSelectedContact(
						selectedRow.firstName,
						selectedRow.lastName,
						selectedRow.category,
						selectedRow.notes,
						selectedRow.phoneNumber,
						selectedRow.email,
						selectedRow.photo,
						selectedRow._id
					);
				}}
				// Option for deleting rows/contacts
				editable={{
					// onRowDelete: (oldData) =>
					// 	new Promise((resolve, reject) => {
					// 		setTimeout(() => {
					// 			const dataDelete = [...filteredData];
					// 			const index = oldData.tableData.id;
					// 			dataDelete.splice(index, 1);
					// 			setFilteredData([...dataDelete]);
					// 			setTableDataCpy([...dataDelete]);

					// 			resolve();
					// 		}, 1000);
					// 	}),
				}}
				// Customizable styling for delete message
				localization={{
					body: {
						editRow: {
							deleteText: (
								<div style={{ marginLeft: "60px" }}>
									Are you sure you want to delete this
									contact?
								</div>
							),
						},
					},
					header: {
						actions: "",
					},
				}}
				// table options (stylings + layout)
				options={{
					tableLayout: "fixed",
					pageSize: filteredData.length,
					// table size options
					// pageSizeOptions: [{ value: filteredData.length, label: "All" }],
					pageSizeOptions: [filteredData.length],
					// styings for header
					headerStyle: {
						position: "sticky",
						top: 0,
						backgroundColor: "#01579b",
						color: whiteColor,
					},
					// styling for search bar
					searchFieldStyle: {
						color: whiteColor,
					},
					paging: false,
					maxBodyHeight: "850px",
					// stylings for each individual row
					rowStyle: (rowData) => {
						if (selectedRow != null) {
							return {
								// row colour changes to grey upon clicking it
								backgroundColor:
									selectedRow.tableData._id ===
										rowData.tableData._did
										? "#e6e6e6"
										: whiteColor,
								border: "2px solid black",
							};
						}
						return {
							backgroundColor: whiteColor,
							border: "2px solid black",
						};
					},
				}}
				components={{
					// Toolbar containing search, add-contacts icon and category selection
					Toolbar: (props) => (
						<div className="toolbar">
							<div className="search">
								<MTableToolbar {...props} />
							</div>
							<div className="toolbar-labels">
								{/* business/personal filter */}
								<RadioGroup
									row
									value={category}
									onChange={(e) =>
										setCategory(e.target.value)
									}
								>
									<FormControlLabel
										value="business"
										control={
											<Radio
												// specify the color of the icon
												style={{ color: iconColor }}
											/>
										}
										label="Business"
										// color of first label
										style={{ color: businessColor }}
									/>
									<FormControlLabel
										value="personal"
										control={
											<Radio
												style={{ color: iconColor }}
											/>
										}
										label="Personal"
										style={{ color: personalColor }}
									/>
								</RadioGroup>
							</div>
						</div>
					),
				}}
			></MaterialTable>
		</div >
	);
}

export default ContactsTable;

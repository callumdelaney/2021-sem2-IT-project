import React, { useState, useEffect } from "react";
import { tableData } from "./data";
import MaterialTable from "material-table";
import { MTableToolbar } from "material-table";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useGlobalState } from "state-pool";
import Tag from "./Tags";
import ColorPicker from "./ColorPicker";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import BasicSelect from "./BasicSelect";

function ContactsTable(contactInfo) {
	const [category, setCategory] = useState("");
	const [tableDataCpy, setTableDataCpy] = useState(tableData);
	const [filteredData, setFilteredData] = useState(tableData);
	const [selectedRow, setSelectedRow] = useState(null);
	const [color, setColor] = useState("#ff0000");
	// access the global variable contactInfo
	// eslint-disable-next-line
	const [info, setInfo] = useGlobalState("contactInfo");
	const [userTags, setUserTags] = useGlobalState("userTags");
	// useState for selected tag to filter on
	const [tagName, setTagName] = useState("");

	// useEffect hook for dealing with tag filters
	useEffect(() => {
		function checkTagEquality(tag) {
			return tag.tagText === tagName;
		}
		setFilteredData(
			tagName === ""
				? filteredData
				: // filter data shown based on category equivalence
				  filteredData.filter(
						(data) => data.tags.find(checkTagEquality) !== undefined
				  )
		);
		// eslint-disable-next-line
	}, [tagName]);
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
			// width: "200%",
			// for troubleshooting column width
			cellStyle: {
				backgroundColor: "#039be5",
				color: "#FFF",
			},
			/*render a div in each cell so that name and tags can be displayed in one cell*/
			render: (filteredData) => {
				// const taglist = filteredData.tag.map((tag) => <li>{tag}</li>);
				return (
					<div
						style={
							{
								/*width: "100%"*/
							}
						}
					>
						{/* table contents */}
						<h4>
							{filteredData.firstName} {filteredData.lastName}
						</h4>

						<Tag doDelete={true} tags={filteredData.tags} />
						{/* <ul>{taglist}</ul> */}
					</div>
				);
			},
		},
		{
			title: "Category",
			field: "category",
			width: "5%",
			hidden: false,
		},
	];
	// color constants used in styles
	const iconColor = "#83498A";
	const businessColor = "orange";
	const personalColor = "yellow";
	const whiteColor = "white";

	// update the selected contact information in a global variable
	const updateSelectedContact = (
		fstName,
		lstName,
		cat,
		notes,
		phoneNumber,
		email,
		photo,
		id,
		tgs
	) => {
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
			tags: tgs,
		});
	};

	return (
		<div>
			<MaterialTable
				columns={column}
				data={filteredData}
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
					// console.log(selectedRow.tags);
					updateSelectedContact(
						selectedRow.firstName,
						selectedRow.lastName,
						selectedRow.category,
						selectedRow.notes,
						selectedRow.phoneNumber,
						selectedRow.email,
						selectedRow.photo,
						selectedRow.id,
						selectedRow.tags
					);
				}}
				// Option for deleting rows/contacts
				editable={{
					onRowDelete: (oldData) =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								const dataDelete = [...filteredData];
								const index = oldData.tableData.id;
								dataDelete.splice(index, 1);
								setFilteredData([...dataDelete]);
								setTableDataCpy([...dataDelete]);

								resolve();
							}, 1000);
						}),
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
					tableLayout: "auto",
					pageSize: filteredData.length,
					// table size options
					pageSizeOptions: [
						{ value: filteredData.length, label: "All" },
					],
					// styings for header
					headerStyle: {
						position: "sticky",
						top: 0,
						backgroundColor: "#01579b",
						color: whiteColor,
						min_height: "5vh",
					},
					// styling for search bar
					searchFieldStyle: {
						color: whiteColor,
					},
					paging: false,
					maxBodyHeight: "85vh",
					// fixedColumns: {
					// 	left: 2,
					// 	right: 0,
					// },
					// stylings for each individual row
					rowStyle: (rowData) => {
						if (selectedRow != null) {
							return {
								// row colour changes to grey upon clicking it
								backgroundColor:
									selectedRow.tableData.id ===
									rowData.tableData.id
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
								<div
									style={{
										width: "100%",
										display: "flex",
									}}
								>
									<input
										style={{
											width: "30%",
											// display: "block",
										}}
									></input>
									<button
										style={{
											width: "20%",
										}}
									>
										create tag
									</button>
									{/* Tags drop down Select component */}
									<Box sx={{ minWidth: 120, maxWidth: 200 }}>
										<FormControl fullWidth>
											<InputLabel id="select-label">
												Tags
											</InputLabel>
											<Select
												labelId="select-label"
												id="simple-select"
												value={tagName}
												label="Tag"
												onChange={(e) =>
													setTagName(e.target.value)
												}
												style={{
													overflowY: "auto",
													overflowX: "hidden",
												}}
												// MenuProps specifies the max height & width of the drop down menu with overflow
												MenuProps={{
													PaperProps: {
														style: {
															maxHeight:
																48 * 4.5 + 8,
															width: 180,
														},
													},
												}}
											>
												{/* iterate over userTags and add them to list */}
												{userTags.map((data) => {
													return (
														<MenuItem
															key={data._id}
															value={data.tagText}
														>
															{data.tagText}
														</MenuItem>
													);
												})}
											</Select>
										</FormControl>
									</Box>
								</div>
								{/* <ColorPicker /> */}
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
		</div>
	);
}

export default ContactsTable;

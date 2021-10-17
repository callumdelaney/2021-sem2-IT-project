import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { MTableToolbar } from "material-table";
import {
	FormControlLabel,
	Radio,
	RadioGroup,
	Box,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	OutlinedInput,
	Chip,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useGlobalState } from "state-pool";

import Tag from "./Tags";

function ContactsTable() {
	const [tableDataCpy, setTableDataCpy] = useGlobalState("userContacts");
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
		// eslint-disable-next-line
	}, []);

	const [category, setCategory] = useState("");
	const [selectedRow, setSelectedRow] = useState(null);
	// access the global variable contactInfo
	// eslint-disable-next-line
	const [info, setInfo] = useGlobalState("contactInfo");
	// access the global variable contactInfo
	// eslint-disable-next-line
	const [userTags] = useGlobalState("userTags");
	// eslint-disable-next-line
	const [openAccount, setOpenAccount] = useGlobalState("openAccountSettings");

	// useState for selected tag to filter on
	const [tagName, setTagName] = useState("");
	const [tagNames, setTagNames] = useState([]);
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
				// backgroundColor: "#039be5",
				color: "rgba(0,0,0,0.75)",
				fontSize: "19px",
			},
			/*render a div in each cell so that name and tags can be displayed in one cell*/
			render: (filteredData) => {
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

						<Tag tags={filteredData.tags} inTable={true} />
						{/* <ul>{taglist}</ul> */}
					</div>
				);
			},
		},
		{
			title: "Category",
			field: "category",
			cellStyle: {
				// backgroundColor: "#039be5",
				color: "rgba(0,0,0,0.75)",
				fontWeight: "bold",
				fontSize: "17px",
				letterSpacing: "1px",
			},
			width: "5%",
			hidden: false,
		},
	];
	// color constants used in styles
	const iconColor = "rgba(58, 119, 107, 0.9)";
	const businessColor = "#9F684A";
	const personalColor = "#83498A";
	const whiteColor = "white";
	// const cadetBlue = "#52a594ea";
	// const cadetDarkBlue = "#3a776b";
	// const iconColor = "#83498A";

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
			phone: phoneNumber,
			email: email,
			photo: photo,
			_id: id,
			tags: tgs,
		});
		console.log(typeof photo);
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
							// don't want to display account info
							setOpenAccount(false);
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
						selectedRow.phone,
						selectedRow.email,
						selectedRow.photo,
						selectedRow._id,
						selectedRow.tags
					);
					// don't want to display account info
					setOpenAccount(false);
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
					pageSizeOptions: [filteredData.length],
					// styings for header
					headerStyle: {
						position: "sticky",
						top: 0,
						// backgroundColor: "#5AC161",
						backgroundColor: "rgba(104, 172, 111,1)",
						color: whiteColor,
						min_height: "5vh",
						fontFamily: "Oswald, sans-serif",
						fontSize: "17px",
						fontWeight: "bold",
						letterSpacing: "2px",
					},
					// styling for search bar
					searchFieldStyle: {
						marginLeft: "-3rem",
						color: "rgba(0,0,0,0.8)",
					},
					paging: false,
					maxBodyHeight: "85vh",
					// stylings for each individual row
					rowStyle: (rowData) => {
						if (selectedRow != null) {
							return {
								// row colour changes to grey upon clicking it
								backgroundColor:
									selectedRow.tableData.id ===
									rowData.tableData.id
										? "rgba(201, 192, 192, 0.87)"
										: "rgba(231, 223, 223, 0.87)",
								border: "2px solid hsla(159, 30%, 27%, 0.753)",
								borderLeft: "none",
								borderTop: "none",
							};
						}
						return {
							backgroundColor: "rgba(231, 223, 223, 0.87)",
							border: "2px solid hsla(159, 30%, 27%, 0.753)",
							borderLeft: "none",
							borderTop: "none",
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
									{/* Tags drop down Select component */}
									<Box
										sx={{
											minWidth: 120,
										}}
										marginLeft="1rem"
									>
										<FormControl fullWidth>
											<InputLabel
												id="select-label"
												style={{
													color: "rgba(82, 65, 15, 0.8)",
													padding: "0rem 0.8rem",
													// fontFamily: "Oswald, sans-serif",
													fontWeight: "bold",
												}}
											>
												Tags
											</InputLabel>
											<Select
												labelId="select-label"
												id="simple-select"
												value={tagNames}
												label="Tag"
												multiple
												style={{
													border: "1px solid rgba(82, 65, 15, 0.8)",
												}}
												onChange={(e) => {
													console.log(e.target.value);
													if (
														Array.isArray(
															e.target.value
														) &&
														e.target.value[
															e.target.value
																.length - 1
														] !== "create-tag"
													) {
														setTagName(
															e.target.value[
																e.target.value
																	.length - 1
															]
														);
														setTagNames(
															e.target.value
														);
													}
												}}
												input={
													<OutlinedInput
														id="select-multiple-chip"
														label="Chip"
													/>
												}
												renderValue={(selected) => (
													<Box
														sx={{
															display: "flex",
															flexWrap: "wrap",
															gap: 3.5,
														}}
													>
														{selected.map(
															(value) => (
																<Chip
																	key={value}
																	label={
																		value
																	}
																	size="small"
																/>
															)
														)}
													</Box>
												)}
												// MenuProps specifies the max height & width of the drop down menu with overflow
												MenuProps={{
													PaperProps: {
														style: {
															maxHeight:
																48 * 4.5 + 8,
															width: 180,
														},
													},
													getContentAnchorEl: null,
													anchorOrigin: {
														vertical: "bottom",
														horizontal: "left",
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
							</div>
							{/* div for category selection & clear filter button */}
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
										label={
											<span
												style={{
													fontSize: "20px",
													fontWeight: "bold",
													fontFamily:
														"Oswald, sans-serif",
													color: businessColor,
													letterSpacing: "1px",
												}}
											>
												Business
											</span>
										}
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
										label={
											<span
												style={{
													fontSize: "20px",
													fontWeight: "bold",
													fontFamily:
														"Oswald, sans-serif",
													color: personalColor,
													letterSpacing: "1px",
												}}
											>
												Personal
											</span>
										}
									/>
								</RadioGroup>
								{/* button to reset toolbar filters */}
								<button
									className="toolbar-button"
									onClick={() => {
										setTagName("");
										setTagNames([]);
										setCategory("");
										setFilteredData(tableDataCpy);
									}}
								>
									clear filters
								</button>
							</div>
						</div>
					),
				}}
			></MaterialTable>
		</div>
	);
}

export default ContactsTable;

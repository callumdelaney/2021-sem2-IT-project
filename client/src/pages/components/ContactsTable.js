import React, { useState, useEffect } from "react";
import { tableData } from "./data";
import MaterialTable from "material-table";
import { MTableToolbar } from "material-table";
import {
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useGlobalState } from "state-pool";

function ContactsTable(contactInfo) {
  const [category, setCategory] = useState("");
  const [tableDataCpy, setTableDataCpy] = useState(tableData);
  const [filteredData, setFilteredData] = useState(tableData);
  const [selectedRow, setSelectedRow] = useState(0);
  // access the global variable contactInfo
  const [info, setInfo] = useGlobalState("contactInfo");

  // useEffect hook for dealing with category changes
  useEffect(() => {
    setFilteredData(
      category === ""
        ? tableDataCpy
        : // filter data shown based on category equivalence
          tableDataCpy.filter((data) => data.category === category)
    );
  }, [category]);

  const column = [
    {
      title: "Name",
      field: "contacts",
      /*render a div in each cell so that name and tags can be displayed in one cell*/
      render: (filteredData) => {
        const taglist = filteredData.tag.map((tag) => <li>{tag}</li>);
        return (
          <div>
            {/* table contents */}
            <h4>{filteredData.contacts}</h4>
            <ul>{taglist}</ul>
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
  const updateSelectedContact = (
    name,
    cat,
    notes,
    phoneNumber,
    email,
    photo,
    id
  ) => {
    setInfo({
      addContact: false,
      editContact: false,
      firstName: name,
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
        data={filteredData}
        title=""
        actions={[
          {
            // create contact button
            icon: () => (
              <AddCircleIcon style={{ fill: iconColor }} fontSize="large" />
            ),
            tooltip: "Create Contact",
            position: "toolbar",
            onClick: () => {
              // set addContact to true so that Contact component knows to display add contact element
              setInfo({ addContact: true, firstName: "", category: "" });
              setSelectedRow(0);
            },
          },
        ]}
        // function for clicking on contacts
        onRowClick={(e, selectedRow) => {
          setSelectedRow(selectedRow);
          console.log(selectedRow);
          updateSelectedContact(
            selectedRow.contacts,
            selectedRow.category,
            selectedRow.notes,
            selectedRow.phoneNumber,
            selectedRow.email,
            selectedRow.photo,
            selectedRow.id
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
                  Are you sure you want to delete this contact?
                </div>
              ),
            },
          },
        }}
        // table options (stylings + layout)
        options={{
          tableLayout: "fixed",
          pageSize: filteredData.length,
          // table size options
          pageSizeOptions: [{ value: filteredData.length, label: "All" }],
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
          rowStyle: (rowData) => ({
            backgroundColor:
              // not sure why this is needed
              parseInt(selectedRow.id) - 1 === rowData.tableData.id
                ? "#e6e6e6"
                : whiteColor,
            border: "2px solid black",
          }),
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
                  onChange={(e) => setCategory(e.target.value)}
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
                    control={<Radio style={{ color: iconColor }} />}
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

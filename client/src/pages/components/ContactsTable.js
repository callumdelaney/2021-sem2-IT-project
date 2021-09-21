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

function ContactsTable() {
  const [category, setCategory] = useState("");
  const [filteredData, setFilteredData] = useState(tableData);
  const [selectedRow, setSelectedRow] = useState(null);
  // useEffect hook for dealing with category changes
  useEffect(() => {
    setFilteredData(
      category === ""
        ? tableData
        : // filter data shown based on category equivalence
          tableData.filter((data) => data.category === category)
    );
  }, [category]);

  const column = [
    {
      title: "Name",
      field: "contacts",
      /*render a div in each cell so that name and tags can be displayed in one cell*/
      render: (tableData) => {
        const taglist = tableData.tag.map((tag) => <li>{tag}</li>);
        return (
          <div>
            {/* table contents */}
            <h4>{tableData.contacts}</h4>
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
              console.log("clicked");
            },
          },
        ]}
        // function for clicking on contacts
        onRowClick={(e, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
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
            color: "#FFF",
          },
          paging: false,
          maxBodyHeight: "850px",
          // stylings for each individual row
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
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

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
  return (
    <div>
      <MaterialTable
        columns={column}
        data={filteredData}
        title=""
        actions={[
          {
            // create contact button
            icon: () => <AddCircleIcon color="secondary" fontSize="large" />,
            tooltip: "Create Contact",
            position: "toolbar",
            onClick: () => {
              console.log("clicked");
            },
          },
        ]}
        // table options
        options={{
          tableLayout: "fixed",
          pageSize: filteredData.length,
          pageSizeOptions: [{ value: filteredData.length, label: "All" }],
          headerStyle: { position: "sticky", top: 0 },
          paging: false,
          maxBodyHeight: "850px",
        }}
        // function for clicking contacts in the table
        onRowClick={() => console.log("clicked")}
        components={{
          Toolbar: (props) => (
            <div className="toolbar">
              <MTableToolbar {...props} />
              <div className="toolbar-labels">
                {/* business/personal filter */}
                <RadioGroup
                  row
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <FormControlLabel
                    value="business"
                    control={<Radio />}
                    label="Business"
                  />
                  <FormControlLabel
                    value="personal"
                    control={<Radio />}
                    label="Personal"
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

import React from "react";
import { tableData } from "./data";
import MaterialTable from "material-table";
import { MTableToolbar } from "material-table";
import { Typography, FormControlLabel, Grid, Radio } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function ContactsTable() {
  const column = [
    {
      title: "Name",
      field: "contacts",
      /*render a div in each cell so that name and tags can be displayed in one cell*/
      render: (tableData) => {
        const taglist = tableData.tag.map((tag) => <li>{tag}</li>);
        return (
          <div>
            <h4>{tableData.contacts}</h4>
            <ul>{taglist}</ul>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <MaterialTable
        minRows={10}
        columns={column}
        data={tableData}
        title=""
        actions={[
          {
            icon: () => <AddCircleIcon color="secondary" fontSize="large" />,
            tooltip: "Create Contact",
            position: "toolbar",
            onClick: () => {
              console.log("clicked");
            },
          },
        ]}
        options={{
          tableLayout: "fixed",
          pageSize: 20,
          headerStyle: { position: "sticky", top: 0 },
        }}
        onRowClick={() => console.log("clicked")}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div>
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
              </div>
            </div>
          ),
        }}
      ></MaterialTable>
    </div>
  );
}

export default ContactsTable;

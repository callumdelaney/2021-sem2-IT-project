import React, { useState } from "react";
import MaterialTable from "material-table";
import { MTableToolbar } from "material-table";
import {
  Typography,
  FormControlLabel,
  Grid,
  Radio,
  lighten,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

/*Contacts page main function*/
function Contacts() {
  /*currently using dummy data in tableData to populate the table of contacts*/
  const [tableData, setTableData] = useState([
    { contacts: "Steve", tag: ["buiness,mom's friend"] },
    { contacts: "Tony", tag: ["buiness,dad's friend"] },
    { contacts: "Robert", tag: ["buiness,lol"] },
    { contacts: "Anna", tag: ["buiness,who"] },
    { contacts: "Strange", tag: ["buiness,magic man"] },
    { contacts: "Peter", tag: ["buiness,spider boi"] },
    { contacts: "Scarlet", tag: ["buiness,scary woman"] },
    { contacts: "Hulk", tag: ["buiness,mom's friend"] },
    { contacts: "Hulk", tag: ["buiness,mom's friend"] },
    { contacts: "Hulk", tag: ["buiness,mom's friend"] },
    { contacts: "Hulk", tag: ["buiness,mom's friend"] },
    { contacts: "Hulk", tag: ["buiness,mom's friend"] },
    { contacts: "Hulk", tag: ["buiness,mom's friend"] },
  ]);
  const column = [
    {
      title: "Name",
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
    /*Page is wrapped in one big Grid container which consists of two main Grid, one for the table on the left, 
    one for account settings and contact info on the right.*/
    /* xs md sm lg are sizes of web browser, making sure that all the grid stays in the same position when window resizes*/
    <>
      <div>
        <Grid container direction="row">
          <Grid item xs={5} md={5} sm={5} lg={5} direction="row">
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <div>
                <MaterialTable
                  columns={column}
                  data={tableData}
                  title=""
                  actions={[
                    {
                      icon: () => (
                        <AddCircleIcon color="secondary" fontSize="large" />
                      ),
                      tooltip: "Create Contact",
                      position: "toolbar",
                      onClick: () => {
                        console.log("clicked");
                      },
                    },
                  ]}
                  options={{
                    tableLayout: "fixed",
                    pageSize: 6,
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
            </Grid>
          </Grid>
          <Grid item xs={7} md={7} sm={7} lg={7} direction="column">
            <Grid
              item
              xs={12}
              style={{ border: "2px solid grey", height: "15%" }}
            >
              <img
                src="https://erasmuscoursescroatia.com/wp-content/uploads/2015/11/no-user-200x200.jpg"
                alt="photo"
                className="profile"
              />

              <Typography variant="h4" align="right">
                Hello, User
              </Typography>
              <button style={{ float: "right" }}>Profile Settings</button>
              <Typography variant="h6">xxxxxx@gmail.com</Typography>
            </Grid>
            <Grid item xs={12}>
              <h1>Space for individual contact info</h1>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Contacts;

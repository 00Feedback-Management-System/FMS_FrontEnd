import React from "react";
import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
import "./Component.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const columns= [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'rollno',
    headerName: 'Roll No',
    width: 80,
    flex:1,
    editable: true,
     renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Roll No</span>
    ),
  },
  {
    field: 'firstname',
    headerName: 'FIRST NAME',
    width: 80,
    flex:1,
    editable: true,
     renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>FIRST NAME</span>
    ),
  },
  {
    field: 'lastname',
    headerName: 'LAST NAME',
    width: 80,
    flex:1,
    editable: true,
     renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>LAST NAME</span>
    ),
  },
  {
    field: 'emailid',
    headerName: 'Email ID',
    sortable: false,
    width: 150,
    flex:1,
     renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Email ID</span>
    ),
    
  },

];

const rows = [
  { id:1,rollno: 101, firstname: 'Tejaswini',lastname: 'Jadhav', emailid: 'tejaswinijadhav189@gmail.com' },
   { id:2,rollno: 102, firstname: 'Snehal',lastname: 'Badakh', emailid: 'snehalbadakh@gmail.com'},
    {id:3, rollno: 103,firstname: 'Suhas',lastname: 'Patil', emailid: 'suhaspatil@gmail.com'},
    { id:4,rollno: 104,firstname: 'Shreeram',lastname: 'Joshi', emailid: 'shreeramjoshi@gmail.com'}
];

export default function StudentList() {
  const { scheduleId } = useParams();

const allStudents = {
    1: [
      { id: 1, rollno: 101, firstname: 'Tejaswini', lastname: 'Jadhav', emailid: 'tejaswinijadhav189@gmail.com' },
      { id: 2, rollno: 102, firstname: 'Snehal', lastname: 'Badakh', emailid: 'snehalbadakh@gmail.com' },
    ],
    2: [
      { id: 1, rollno: 103, firstname: 'Suhas', lastname: 'Patil', emailid: 'suhaspatil@gmail.com' },
      { id: 2, rollno: 104, firstname: 'Shreeram', lastname: 'Joshi', emailid: 'shreeramjoshi@gmail.com' },
    ]
  };

  const rows = allStudents[scheduleId] || [];

  return (

    <div className="container">
        
        <h2 className="table-header text-center mt-3" > Filled Student List</h2>
        {/* <h1 className="table-header" > Feedback Type List </h1> */}
         <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          padding: 2,
          borderRadius: 1,
        }}
      >
        

      </Box>

        <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5,10,20]}
        disableRowSelectionOnClick
      />
    </Box>
    </div>
    
  );
}
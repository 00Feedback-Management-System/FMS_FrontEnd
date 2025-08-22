import React from "react";
import "./Component.css";
import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Remove } from "@mui/icons-material";

export default function ScheduleFeedbackList() {
    const navigate = useNavigate();
   const columns= [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'course',
    headerName: 'Course',
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Course</span>
    ),
  },
  {
    field: 'module',
    headerName: 'Module',
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Module</span>
    ),
  },
  {
    field: 'type',
    headerName: 'Type',
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Type</span>
    ),
  },
  {
    field: 'session',
    headerName: 'Session',
    sortable: false,
    flex:1,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Session</span>
    ),
  },
  {
    field: 'date',
    headerName: 'Date',
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Date</span>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Status</span>
    ),
  },
  {
    field: 'filledby',
    headerName: 'FilledBy',
    flex:1,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>FilledBy</span>
    ),
    renderCell: (params) => (
      <a
        href={`student-list/${params.row.id}`}
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        {params.value}
      </a>
    ),
  },
  {
    field: 'remaining',
    headerName: 'Remaining',
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Remaining</span>
    ),
    renderCell: (params) => (
      <a
        href={`remaining/${params.row.id}`}
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        {params.value}
      </a>
    ),
  },
  {
    field: "actions",
    headerName: "Action",
    flex: 2,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Action</span>
    ),
    renderCell: () => (
      <>
        <Button color="primary" size="small"><EditIcon/></Button>
        <Button color="error" size="small"><DeleteIcon/></Button>
        <Button color="error" size="small"><Remove/></Button>
      </>
    )
  },
];

const rows = [
  { id: 1, course: 'PG-DAC',module: 'Dot Net', type: 'Module end',session: '3',date:'13/08/25',status:'Active', filledby:'2',remaining:'2'},
   { id: 2, course: 'PG-DMC',module: 'Java', type: 'Module end',session: '6',date:'13/08/25',status:'inactive', filledby:'2',remaining:'2'},
   
];
        const handleAddClick = () => {
        navigate("/app/schedule-feedback-form"); 
      };
  return (

    <div  className="container">
    
        <h2 className="table-header text-center mt-3" >Schedule Feedback List</h2>
        
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
        {/* <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Feedback Type List
        </Typography> */}

        <Button variant="outlined" color="primary" 
         sx={{
            position: "absolute",
            right: 50, 
          }}
          onClick={handleAddClick} 
            >
          Schedule Feddback
        </Button>
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
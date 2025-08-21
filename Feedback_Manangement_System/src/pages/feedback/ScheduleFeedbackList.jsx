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
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'course',
    headerName: 'Course',
    width: 150,
    editable: true,
     renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Course</span>
    ),
  },
  {
    field: 'module',
    headerName: 'Module',
    width: 100,
    editable: true,
     renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Module</span>
    ),
  },
  {
    field: 'type',
    headerName: 'Type',
    type: 'number',
    width: 110,
    editable: true,
     renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Type</span>
    ),
  },
  {
    field: 'session',
    headerName: 'Session',
    sortable: false,
    width: 100,
     renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Session</span>
    ),
    
  },

{
    field: 'date',
    headerName: 'Date',
    type: 'number',
    width: 150,
    editable: true,
     renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Date</span>
    ),
  },
  
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    editable: true,
     renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Status</span>
    ),
  },

{
  field: 'filledby',
  headerName: 'FilledBy',
  width: 110,
   renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>FilledBy</span>
    ),
  renderCell: (params) => (
    <Button
      onClick={() => navigate(`/student-list/${params.row.id}`)}
      sx={{ color: 'blue', textDecoration: 'underline', padding: 0 }}
    >
      {params.value}
    </Button>
  ),
},

  {
    field: 'remaining',
    headerName: 'Remaining',
    type: 'number',
    width: 110,
    editable: true,
     renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Remaining</span>
    ),
    renderCell: (params) => (
      <a
        href={`/remaining/${params.row.id}`}
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        {params.value}
      </a>
    ),
  },
  
  {
      field: "actions",
      headerName: "Action",
      flex: 1,
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
  { id: 1, course: 'PG-DAC',module: 'Dot Net', type: 'Module end',session: '3',date:'13/08/25 -15/08/25',status:'Active', filledby:'2',remaining:'2'},
   { id: 2, course: 'PG-DMC',module: 'Java', type: 'Module end',session: '6',date:'13/08/25 -15/08/25',status:'inactive', filledby:'2',remaining:'2'},
   
];
        const handleAddClick = () => {
        navigate("/app/schedule-feedback-form"); 
      };
  return (

    <div >
    
        <h2 className="table-header" style={{ margin:60,alignItems: "center" } }>Schedule Feedback List</h2>
        
         <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          backgroundColor: "#f5f5f5",
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
            right: 16, 
          }}
          onClick={handleAddClick} 
            >
          Schedule Feddback
        </Button>
      </Box>

        <Box sx={{ height: 400, width: '200%' }}>
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
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
    </div>
    
  );
}

import React from "react";
import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
import "./Component.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const columns= [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'title',
    headerName: 'Title',
    width: 110,
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Title</span>
    ),
  },
  {
    field: 'module',
    headerName: 'Module',
    width: 110,
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Module</span>
    ),
  },
  {
    field: 'group',
    headerName: 'Group',
    width: 110,
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Group</span>
    ),
  },
  {
    field: 'staff',
    headerName: 'Staff',
    sortable: false,
    width: 110,
    flex:1,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Staff</span>
    ),
    
  },

{
    field: 'session',
    headerName: 'Session',
    width: 110,
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Session</span>
    ),
  },
  
  {
    field: 'behaviour',
    headerName: 'Behaviour',
    width: 110,
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Behaviour</span>
    ),
  },
  {
      field: "actions",
      headerName: "Action",
      width: 150,
      flex:2,
      renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Action</span>
    ),
      renderCell: () => (
        <>
          <Button color="primary" size="small"><EditIcon/></Button>
          <Button color="error" size="small"><DeleteIcon/></Button>
        </>
      )
    },

];

const rows = [
  { id: 1, title: 'Module end',module: 'Dot Net', group: 'single',staff: 'yes',session: 'yes',behaviour:'Optional' },
   { id: 2, title: 'Module end',module: 'Dot Net', group: 'multiple',staff: 'no',session: 'no',behaviour:'Compulsory' },
    { id: 3, title: 'Module end',module: 'Dot Net', group: 'sinlgle',staff: 'yes',session: 'yes',behaviour:'Optional' },
];

export default function FeedbackTypeList() {
    const navigate = useNavigate();
    const handleAddClick = () => {
    navigate("/app/feedback-type-form"); 
  };

  return (

    <div className="container">
        
        <h2 className="table-header text-center mt-3">Feedback Type List</h2>
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
        

        <Button variant="outlined" color="primary" 
         sx={{
            position: "absolute",
            right: 50, 
          }}
            onClick={handleAddClick} 
            >
          Add Feedback Type
        </Button>
        {/* <div>
        <button className="btn btn-primary" onClick={handle} style={{ marginLeft: "10px" }}>
          Add Feedback Type
        </button>
      </div> */}
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
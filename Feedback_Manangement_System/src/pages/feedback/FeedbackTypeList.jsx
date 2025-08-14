
import React from "react";
import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
import "./FeedbackTypeList.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const columns= [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'module',
    headerName: 'Module',
    width: 150,
    editable: true,
  },
  {
    field: 'group',
    headerName: 'Group',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'staff',
    headerName: 'Staff',
    sortable: false,
    width: 160,
    
  },

{
    field: 'session',
    headerName: 'Session',
    type: 'number',
    width: 110,
    editable: true,
  },
  
  {
    field: 'behaviour',
    headerName: 'Behaviour',
    width: 150,
    editable: true,
  },
  {
      field: "actions",
      headerName: "Action",
      flex: 1,
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
    debugger;
    navigate("/add-feedback-type-form"); 
  };

  return (

    <div>
        
        <h2 className="table-header" style={{ margin:60 } }>Feedback Type List</h2>
        {/* <h1 className="table-header" > Feedback Type List </h1> */}
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
        

        <Button variant="outlined" color="primary" 
         sx={{
            position: "absolute",
            right: 16, 
          }}
            onClick={handleAddClick} 
            >
          Add Feedback Type
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

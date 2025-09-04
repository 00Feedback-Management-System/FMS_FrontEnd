import React, { useState, useEffect } from "react";
import "./Component.css";
import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Remove } from "@mui/icons-material";
import Api from "../../services/api"; 
import axios from "axios";

export default function ScheduleFeedbackList() {
    const navigate = useNavigate();
const [rows, setRows] = useState([]);

useEffect(() => {
    Api.get("Feedback/GetFeedback")
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.error("Error fetching feedback types:", err);
      });
  }, []);

        const handleAddClick = () => {
        navigate("/app/schedule-feedback-form"); 
      };

      const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`https://localhost:7056/api/Feedback/DeleteFeedback/${id}`);
      setRows((prevRows) =>
        prevRows.filter((row) => row.feedback_id !== id)
      );
      alert("Record deleted successfully!");
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record.");
    }
  };

   const columns= [
  { field: 'feedback_id', headerName: 'ID', width: 50 },
  {
    field: 'course_name',
    headerName: 'Course',
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Course</span>
    ),
  },
  {
    field: 'module_name',
    headerName: 'Module',
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Module</span>
    ),
  },
  {
    field: 'feedback_type_title',
    headerName: 'Type',
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Type</span>
    ),
  },
{
    field: 'first_name',
    headerName: 'staff',
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>staff</span>
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
    field: 'start_date',
    headerName: 'StartDate',
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>StartDate</span>
    ),
  },
  {
    field: 'end_date',
    headerName: ' EndDate',
    flex:1,
    editable: true,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>EndDate</span>
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
     renderCell: (params) => (
    <>
      <Button
        color="primary"
        size="small"
        onClick={() => handleEdit(params.row.feedback_id)}
      >
        <EditIcon />
      </Button>
      <Button
        color="error"
        size="small"
        onClick={() => handleDelete(params.row.feedback_id)}
      >
        <DeleteIcon />
      </Button>
        
      </>
    )
  },
];


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
         getRowId={(row) => row.feedback_id}
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
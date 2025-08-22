import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Feedbackdashbaord.css"; 
import { useNavigate } from "react-router-dom";

function FeedbackDashboard() {
  const navigate = useNavigate();
  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "course", headerName: "Course", flex: 1 },
    { field: "group", headerName: "Group", flex: 1 },
    { field: "module", headerName: "Module", flex: 1 },
    { field: "faculty", headerName: "Faculty", flex: 1 },
    { field: "session", headerName: "Session", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 1 },
    {
      field: "actions",
      headerName: "Action",
      flex: 2,
      renderCell: () => (
        <>
          <Button color="primary" size="small"><EditIcon /></Button>
          <Button color="error" size="small"><DeleteIcon /></Button>
        </>
      )
    }
  ];

  const rows = [
    { id: 1, date: "2025-08-13", course: "Dac", group: "D1", module: "React", faculty: "John Doe", session: "0", rating: 4 },
  ];

  const handleAddFeedbackclick =() => {
      navigate("/app/feedback-type-list");
  }

  return (
    <div className="container "> 
     <h2 className="page-header text-center mt-3">Feedback Dashboard</h2>
    <Box p={3} className="mb-5 ">
     
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      
      <Box display="flex" gap={2}>
        <select className="form-select form-select-lg" style={{ minWidth: "150px" }}>
          <option selected>Courses</option>
          <option value="dac">DAC</option>
          <option value="dmc">DMC</option>
          <option value="dbda">DBDA</option>
        </select>

        <select className="form-select form-select-lg" style={{ minWidth: "150px" }}>
          <option selected>Modules</option>
          <option value=".net">.Net</option>
          <option value="java">Java</option>
          <option value="react">React</option>
        </select>

        <select className="form-select form-select-lg" style={{ minWidth: "150px" }}>
          <option selected>Types</option>
          <option value="mid">Mid Module</option>
          <option value="end">End Module</option>
        </select>

        <select className="form-select form-select-lg" style={{ minWidth: "150px" }}>
          <option selected>Faculty</option>
          <option value="john">John Doe</option>
          <option value="jane">Jane Smith</option>
          <option value="mike">Mike Johnson</option>
        </select>
      </Box>
   
     
      {/* <Button variant="contained" color="primary" size="large">
        Add Feedback
      </Button> */}
      <div>
        <button className="btn btn-primary" onClick={handleAddFeedbackclick} style={{ marginLeft: "10px" }}>
          Add Feedback
        </button>
      </div>
    </Box>

        <hr className="mb-5 mt-5"/>
      <div style={{ height: 400, background: "#fff" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
    </Box>
    </div>

  );
}

export default FeedbackDashboard;

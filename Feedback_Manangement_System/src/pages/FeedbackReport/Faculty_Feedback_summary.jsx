import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "Sr.No", width: 90 },
  { field: "question", headerName: "Question", width: 450 },
  { field: "excellent", headerName: "Excellent", width: 130 },
  { field: "good", headerName: "Good", width: 130 },
  { field: "satisfactory", headerName: "Satisfactory", width: 150 },
  { field: "unsatisfactory", headerName: "Unsatisfactory", width: 170 },
];

const rows = [
  { id: 1, question: "Faculty Technical Skills", excellent: 1, good: 0, satisfactory: 0, unsatisfactory: 0 },
  { id: 2, question: "Faculty Punctuality", excellent: 0, good: 1, satisfactory: 0, unsatisfactory: 0 },
  { id: 3, question: "Faculty Communication", excellent: 0, good: 0, satisfactory: 0, unsatisfactory: 0 },
];

function FeedbackDashboard() {
  return (
    <div className="container">
        <h2 className="page-header text-center">Faculty Feedback Summary</h2>

     

    <Box p={3}>
      {/* Filter Section */}
     <div className="row mb-3 col-12">
        <div className="col-md-4 mb-3">
          <select className="form-select">
            <option selected>Feedback Type</option>
            <option value="mid">Mid Module</option>
            <option value="end">End Module</option>
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <select className="form-select">
          <option selected>Courses</option>
          <option value="dac">DAC</option>
          <option value="dmc">DMC</option>
          <option value="dbda">DBDA</option>
          </select>
        </div>

        <div  className="col-md-4 mb-3">
          <select className="form-select">
          <option selected>Modules</option>
          <option value=".net">.Net</option>
          <option value="java">Java</option>
          <option value="react">React</option>
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <select className="form-select">
            <option selected>Staff</option>
            <option>John</option>
            <option>Jane</option>
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <input type="text" value="12-03-2025 to 15-08-2025 " readOnly className="form-control" />
        </div>

        </div>
        <div className="align-self-end text-center mb-3 width-100">
          <button className="btn btn-success">Search</button>
        </div>
      
     <hr/>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <div>Feedback Submitted: 5</div>
        <div>Feedback Remaining: 14</div>
        <div>Rating: 2.3</div>
        <Button variant="contained" color="primary">Export</Button>
      </Box>

      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
         rows={rows}
        columns={columns}
         pageSize={5} 
         
         />
      </div>
    </Box>
    </div>
  );
}

export default FeedbackDashboard;

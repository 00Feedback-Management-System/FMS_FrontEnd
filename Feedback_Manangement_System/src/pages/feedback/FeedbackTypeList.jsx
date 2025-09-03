import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./Component.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Api from "../../services/api";   // <-- Import your service

const columns = [
  { field: "feedback_type_id", headerName: "ID", width: 50 },
  {
    field: "feedback_type_title",
    headerName: "Title",
    flex: 1,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Title</span>
    ),
  },
  {
    field: "feedback_type_description",
    headerName: "Description",
    flex: 1,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Description</span>
    ),
  },
  {
    field: "group",
    headerName: "Group",
    flex: 1,
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Group</span>
    ),
  },
  {
    field: "is_staff",
    headerName: "Staff",
    flex: 1,
    renderCell: (params) => (params.value ? "Yes" : "No"),
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Staff</span>
    ),
  },
  {
    field: "is_session",
    headerName: "Session",
    flex: 1,
    renderCell: (params) => (params.value ? "Yes" : "No"),
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Session</span>
    ),
  },
  {
    field: "behaviour",
    headerName: "Behaviour",
    flex: 1,
    renderCell: (params) => (params.value ? "Compulsory" : "Optional"),
    renderHeader: () => (
      <span style={{ color: "black", fontWeight: "bold" }}>Behaviour</span>
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
        <Button color="primary" size="small"><EditIcon /></Button>
        <Button color="error" size="small"><DeleteIcon /></Button>
      </>
    ),
  },
];

export default function FeedbackTypeList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    Api.get("FeedbackType/GetFeedbackType")
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.error("Error fetching feedback types:", err);
      });
  }, []);

  const handleAddClick = () => {
    navigate("/app/feedback-type-form");
  };

  return (
    <div className="container">
      <h2 className="table-header text-center mt-3">Feedback Type List</h2>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="outlined" color="primary" onClick={handleAddClick}>
          Add Feedback Type
        </Button>
      </Box>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.feedback_type_id}  // important for API data
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}
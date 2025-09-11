import React, { useState, useEffect } from "react";
import "./Component.css";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "../../services/api";

export default function ScheduleFeedbackList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    Api.get("Feedback/GetFeedback")
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
      });
  }, []);

  const handleAddClick = () => {
    navigate("/app/schedule-feedback-form");
  };

  // ✅ Delete by feedbackGroupId (unique per row)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(
        `https://localhost:7056/api/Feedback/DeleteFeedback/${id}`
      );
      setRows((prevRows) =>
        prevRows.filter((row) => row.feedbackGroupId !== id)
      );
      alert("Record deleted successfully!");
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record.");
    }
  };

  // ✅ Safe date formatter
  const formatDate = (value) => {
    if (!value) return "-"; // null/empty
    const date = new Date(value);
    if (isNaN(date.getTime())) return "-"; // invalid date
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const columns = [
    { field: "feedbackId", headerName: "Feedback ID", width: 100 },
    { field: "courseName", headerName: "Course", flex: 1 },
    { field: "moduleName", headerName: "Module", flex: 1 },
    { field: "feedbackTypeName", headerName: "Type", flex: 1 },
    { field: "staffName", headerName: "Staff", flex: 1 },
    {
      field: "groupName",
      headerName: "Group",
      flex: 1,
      renderCell: (params) =>
        params.value && params.value.trim() !== "" ? params.value : "-",
    },
    { field: "session", headerName: "Session", flex: 1 },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "filledby",
      headerName: "FilledBy",
      flex: 1,
      renderHeader: () => (
        <span style={{ color: "black", fontWeight: "bold" }}>FilledBy</span>
      ),
      renderCell: (params) => (
        <a
          href={`student-list/${params.row.feedbackGroupId}`}
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {params.value}
        </a>
      ),
    },
    {
      field: "remaining",
      headerName: "Remaining",
      flex: 1,
      renderHeader: () => (
        <span style={{ color: "black", fontWeight: "bold" }}>Remaining</span>
      ),
      renderCell: (params) => (
        <a
          href={`remaining/${params.row.feedbackGroupId}`}
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {params.value}
        </a>
      ),
    },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button color="primary" size="small">
            <EditIcon />
          </Button>
          <Button
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.feedbackGroupId)}
          >
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <h2 className="table-header text-center mt-3">
        Schedule Feedback List
      </h2>

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
        <Button
          variant="outlined"
          color="primary"
          sx={{ position: "absolute", right: 50 }}
          onClick={handleAddClick}
        >
          Schedule Feedback
        </Button>
      </Box>

      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.feedbackGroupId} // ✅ unique id
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

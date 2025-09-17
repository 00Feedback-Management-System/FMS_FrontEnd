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
    .then(async (res) => {
      const feedbacks = res.data;

      // fetch counts for each feedbackGroup
      const enriched = await Promise.all(
        feedbacks.map(async (f) => {
          try {
            const summary = await Api.get(`StudentApi/FeedbackSubmit/${f.feedbackGroupId}`);
            return { ...f, filledby: summary.data.submittedCount, remaining: summary.data.remainingCount };
          } catch {
            return { ...f, filledby: 0, remaining: 0 };
          }
        })
      );

      setRows(enriched);
    })
    .catch((err) => {
      console.error("Error fetching feedback:", err);
    });
}, []);


  const handleAddClick = () => {
    navigate("/app/schedule-feedback-form");
  };

  // Delete by feedbackGroupId (unique per row)
  const handleDelete = async (feedbackGroupId) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      // NOTE: backend should expose an endpoint to delete a single FeedbackGroup by id.
      // I used DeleteFeedbackGroup here — update if your backend path differs.
      await axios.delete(
        `https://localhost:7056/api/Feedback/DeleteFeedbackGroup/${feedbackGroupId}`
      );

      setRows((prevRows) =>
        prevRows.filter((row) => (row.feedbackGroupId || row.Id) !== feedbackGroupId)
      );
      alert("Record deleted successfully!");
    } catch (error) {
      console.error("Error deleting record:", error);
      // If backend returns a message, show it
      const message =
        error?.response?.data?.message || error?.message || "Failed to delete record.";
      alert(message);
    }
  };

  // Safe date formatter: returns "-" for null/invalid, else dd/mm/yyyy
  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const columns = [
    // show feedbackGroupId in header "Id"
    {
      field: "feedbackGroupId",
      headerName: "Id",
      width: 100,
      // if backend uses "Id" instead of "feedbackGroupId" allow fallback in renderCell
      renderCell: (params) => params.value ?? params.row.Id ?? "-",
    },
   
    { field: "courseName", headerName: "Course", flex: 1 },
    { field: "moduleName", headerName: "Module", flex: 1 },
    { field: "feedbackTypeName", headerName: "Type", flex: 1 },
    { field: "staffName", headerName: "Staff", flex: 1 },
    {
      field: "groupName",
      headerName: "Group",
      flex: 1,
      renderCell: (params) =>
        params.value && params.value.toString().trim() !== "" ? params.value : "-",
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
      renderCell: (params) => (
        <a
          href={`student-list/${params.row.feedbackGroupId ?? params.row.Id}`}
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {params.value ?? "-"}
        </a>
      ),
    },
    {
      field: "remaining",
      headerName: "Remaining",
      flex: 1,
      renderCell: (params) => (
        <a
          href={`remaining/${params.row.feedbackGroupId ?? params.row.Id}`}
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {params.value ?? "-"}
        </a>
      ),
    },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        const idForRow = params.row.feedbackGroupId ?? params.row.Id;
        return (
          <>
          <Button
  color="primary"
  size="small"
  sx={{ mr: 1 }}
  onClick={() => {
    const start = new Date(params.row.startDate);
    const now = new Date();
    if (start <= now) {
      alert("You cannot update feedback after start date.");
      return;
    }
    navigate(`/app/update-feedback-form/${params.row.feedbackId}`, {
      state: { feedbackId: params.row.feedbackId },
    });
  }}
>
  <EditIcon />
</Button>

            <Button
              color="error"
              size="small"
              onClick={() => handleDelete(idForRow)}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div className="container">
      <h2 className="table-header text-center mt-3">Schedule Feedback List</h2>

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
          // prefer feedbackGroupId as the unique id, fallback to Id or feedbackId
          getRowId={(row) => row.feedbackGroupId ?? row.Id ?? row.feedbackId}
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

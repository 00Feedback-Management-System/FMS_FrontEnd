import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Api from "../../services/api"; 
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { IconButton } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function StaffDashboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

const handleDownloadFullPdf = () => {
  const doc = new jsPDF();
  doc.text("Staff Feedback Report", 14, 15);
  const tableColumn = ["ID", "Course", "Date", "Module", "Type", "Session", "Rating"];
  const tableRows = rows.map((row) => [
    row.id,
    row.course,
    row.date,
    row.module,
    row.type,
    row.session,
    row.rating ?? "N/A",
  ]);

  // Generate table
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });
  doc.save("feedback_report_full.pdf");
};

  // Function to download PDF for a specific row
  const handleDownloadPdf = (row) => {
  const doc = new jsPDF();
  doc.text("Staff Feedback Report", 14, 15);

  const tableColumn = ["ID", "Course", "Date", "Module", "Type", "Session","Rating"];
  const tableRows = [
    [row.id, row.course, row.date, row.module, row.type, row.session,row.rating],
  ];
    autoTable(doc, {
  head: [tableColumn],
  body: tableRows,
  startY: 20,
});
    doc.save(`feedback_report_${row.id}.pdf`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "course",
      headerName: "Course",
      flex: 1,
      renderHeader: () => (
        <span style={{ color: "black", fontWeight: "bold" }}>Course</span>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderHeader: () => (
        <span style={{ color: "black", fontWeight: "bold" }}>Date</span>
      ),
    },
    {
      field: "module",
      headerName: "Module",
      flex: 0.5,
      renderHeader: () => (
        <span style={{ color: "black", fontWeight: "bold" }}>Module</span>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderHeader: () => (
        <span style={{ color: "black", fontWeight: "bold" }}>Type</span>
      ),
    },
    {
      field: "session",
      headerName: "Session",
      flex: 0.5,
      renderHeader: () => (
        <span style={{ color: "black", fontWeight: "bold" }}>Session</span>
      ),
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 1,
      renderCell: (params) => (
        <span style={{ fontWeight: "bold", color: "#1976d2" }}>
          {params.value ?? "N/A"}
        </span>
      ),
      renderHeader: () => (
        <span style={{ color: "black", fontWeight: "bold" }}>rating</span>
      ),
    },
    {
      field: "pdf",
      headerName: "PDF Report",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => handleDownloadPdf(params.row)}
        >
          <PictureAsPdfIcon />
        </IconButton>
      ),
      renderHeader: () => (
        <span style={{ color: "black", fontWeight: "bold" }}>PDF Report</span>
      ),
    },
  ];

  // Fetch scheduled feedback for logged-in staff
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.id) return;

  const fetchScheduledFeedback = async () => {
    try {
      const response = await Api.get(`/staff/${user.id}/scheduledFeedback`);

      // Use backend rating directly
      const feedbackData = response.data.map((f, index) => ({
        id: f.feedbackId || index + 1,
        course: f.courseName,
        date: f.startDate,
        module: f.moduleName,
        type: f.feedbackTypeName,
        session: f.session,
        feedbackTypeId: f.feedback_type_id,
        rating: f.rating ?? "N/A", // ✅ already provided by backend
      }));

      setRows(feedbackData);
    } catch (error) {
      console.error("Error fetching scheduled feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchScheduledFeedback();
}, []);

  return (
    
    <div className="container">
      <h2 className="table-header text-center mt-3">My Feedbacks</h2>
      <p className="text-center text-muted">Feedbacks you have received till today</p>


   <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
    <IconButton color="primary" onClick={handleDownloadFullPdf}>
    <PictureAsPdfIcon />
   </IconButton>
        </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          padding: 2,
          borderRadius: 1,
        }}
      ></Box>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}



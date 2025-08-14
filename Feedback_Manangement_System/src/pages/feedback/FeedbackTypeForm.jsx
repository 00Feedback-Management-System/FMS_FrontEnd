// 

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./FeedbackTypeForm.css";

export default function FeedbackTypeForm() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Feedback Type Form</h2>
      {/* Your form fields here */}
      <Button variant="contained" onClick={() => navigate("/")}>
        Back to List
      </Button>
    </div>
  );
}

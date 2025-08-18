

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Component.css";

export default function FeedbackTypeFormc() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Feedback Type Form</h2>
      
      <Button variant="contained" onClick={() => navigate("/")}>
        Back to List
      </Button>
    </div>
  );
}

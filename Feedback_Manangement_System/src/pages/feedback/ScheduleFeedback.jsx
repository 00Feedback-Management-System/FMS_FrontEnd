import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./ScheduleFeedback.css";

export default function ScheduleFeedback() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>Schedule Feedback Here</h2>
      {/* Your form fields here */}
      <Button variant="contained" onClick={() => navigate("/")}>
        Back to List
      </Button>
    </div>
  );
}

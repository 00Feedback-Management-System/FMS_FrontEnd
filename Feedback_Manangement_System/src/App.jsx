import FeedbackTypeList from "./pages/feedback/FeedbackTypeList";
import {  Routes, Route } from "react-router-dom";
import FeedbackTypeForm from "./pages/feedback/FeedbackTypeForm";
import ScheduleFeedback from "./pages/feedback/ScheduleFeedback";
import ScheduleFeedbackList from "./pages/feedback/ScheduleFeedbackList" ;
function App() {
  return (
    <div style={{ height: "300vh", width: "200vw" }}>
      <Routes>
        <Route path="/" element={<FeedbackTypeList />} />
        <Route path="/add-feedback-type-form" element={<FeedbackTypeForm />} />
        <Route path="/Schedule-Feedback" element={<ScheduleFeedbackList />} />
        <Route path="/Schedule-Feedback Page" element={<ScheduleFeedback />} />
      </Routes>
    </div>
  );
}
export default App;

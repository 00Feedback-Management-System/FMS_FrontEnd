import FeedbackTypeList from "./pages/feedback/FeedbackTypeList";
import {  Routes, Route } from "react-router-dom";
import FeedbackTypeForm from "./pages/feedback/FeedbackTypeForm";
import ScheduleFeedback from "./pages/feedback/ScheduleFeedback";
import ScheduleFeedbackList from "./pages/feedback/ScheduleFeedbackList" ;
import StudentList from "./pages/feedback/StudentList";
import RemainingStudent from "./pages/feedback/RemainingStudent";
function App() {
  return (
    <div style={{ height: "300vh", width: "200vw" }}>
      <Routes>
        <Route path="/" element={<FeedbackTypeList />} />
        <Route path="/add-feedback-type-form" element={<FeedbackTypeForm />} />
        <Route path="/Schedule-Feedback-List" element={<ScheduleFeedbackList />} />
        <Route path="/Schedule-Feedback-Page" element={<ScheduleFeedback />} />
        <Route path="/student-list/:scheduleId" element={<StudentList />}/>
        <Route path="/remaining/:scheduleId" element={<RemainingStudent />}/>

      </Routes>
    </div>
  );
}
export default App;

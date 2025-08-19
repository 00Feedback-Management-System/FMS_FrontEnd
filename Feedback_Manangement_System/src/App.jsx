import { useState } from 'react'
import FeedbackTypeList from "./pages/feedback/FeedbackTypeList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedbackTypeForm from "./pages/feedback/FeedbackTypeForm";
import AddQuestionForm from "./pages/feedback/AddQuestionForm";
import {  Routes, Route } from "react-router-dom";
import ScheduleFeedbackList from "./pages/feedback/ScheduleFeedbackList" ;
import StudentList from "./pages/feedback/StudentList";
import RemainingStudent from "./pages/feedback/RemainingStudent";
function App() {
  const [questions, setQuestions] = useState([]);
  return (
   <Router>
      <Routes>
        <Route path="/" element={<FeedbackTypeList />} />
        <Route path="/Schedule-Feedback-List" element={<ScheduleFeedbackList />} />
        <Route path="/student-list/:scheduleId" element={<StudentList />}/>
        <Route path="/remaining/:scheduleId" element={<RemainingStudent />}/>

      </Routes>
   </Router>
    );
}
export default App;

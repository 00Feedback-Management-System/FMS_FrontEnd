import { useState } from 'react'
import FeedbackTypeList from "./pages/feedback/FeedbackTypeList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedbackTypeForm from "./pages/feedback/FeedbackTypeForm";
import AddQuestionForm from "./pages/feedback/AddQuestionForm";
import ScheduleFeedbackList from "./pages/feedback/ScheduleFeedbackList" ;
import StudentFeedbackForm from './pages/feedback/StudentFeedbackForm';

function App() {
  const [questions, setQuestions] = useState([]);
  return (
   <Router>
      <Routes>
        <Route path="/" element={<FeedbackTypeList />} />
        <Route path="/add-feedback-type-form" element={<FeedbackTypeForm />} />
        <Route path="/Schedule-Feedback" element={<ScheduleFeedbackList />} />
        <Route path="/Schedule-Feedback Page" element={<ScheduleFeedback />} />
        <Route path="/Student-FeedbackForm" element={<StudentFeedbackForm />} />
      </Routes>
   </Router>
    );
}
export default App;

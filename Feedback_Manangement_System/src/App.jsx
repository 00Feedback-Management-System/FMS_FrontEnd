import { useState } from 'react'
import FeedbackTypeList from "./pages/feedback/FeedbackTypeList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedbackTypeForm from "./pages/feedback/FeedbackTypeForm";
import AddQuestionForm from "./pages/feedback/AddQuestionForm";
import ScheduleFeedbackList from "./pages/feedback/ScheduleFeedbackList" ;
function App() {
  const [questions, setQuestions] = useState([]);
  return (
   <Router>
      <Routes>
        <Route path="/" element={<FeedbackTypeList />} />
        <Route path="/add/feedbackTypeForm" element={<FeedbackTypeForm questions={questions} setQuestions={setQuestions}/>} />
        <Route path="/ScheduleFeedbackList" element={<ScheduleFeedbackList />} />
        <Route path="/add/feedbackTypeForm/add-question" element={<AddQuestionForm questions={questions} setQuestions={setQuestions}/>} />
      </Routes>
   </Router>
    );
}
export default App;

import { useState } from 'react'
import FeedbackTypeList from "./pages/feedback/FeedbackTypeList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddQuestionForm from "./pages/feedback/AddQuestionForm";
import ScheduleFeedbackList from "./pages/feedback/ScheduleFeedbackList" ;
import StudentFeedbackForm from './pages/feedback/StudentFeedbackForm';
import StudentList from "./pages/feedback/StudentList";
import RemainingStudent from "./pages/feedback/RemainingStudent";
import FeedbackTypeForm from './pages/feedback/FeedbackTypeForm';
import EditGroup from './pages/feedback/EditGroup';
import ScheduleFeedbackForm from './pages/feedback/ScheduleFeedbackForm';
import FacultyFeedbackSummary from './pages/feedback/FacultyFeedbackSummary';
import DashboardLayout from './components/DashboardLayout';
import FeedbackDashboard from './pages/Dashboard/Feedbackdashbaord';
import Login from './pages/Login/Login';
import Faculty_Feedback_summary from './pages/FeedbackReport/Faculty_Feedback_summary';

function App() {
  const [questions, setQuestions] = useState([]);
  const [groups,setGroups]=useState([
    {id:1,groupName:"D1",staffName:"John Doe"},
    {id:2,groupName:"D2",staffName:"Jane Smith"}
  ]);
  return (
   <Router>
      <Routes>
        <Route path="/" element={ <Login/>} />
        <Route path="/feedback-type-list" element={<FeedbackTypeList />} />
        <Route path="/Schedule-Feedback-List" element={<ScheduleFeedbackList />} />
        <Route path="/student-list/:scheduleId" element={<StudentList />}/>
        <Route path="/remaining/:scheduleId" element={<RemainingStudent />}/>
        <Route path="/feedback-type-form" element={<FeedbackTypeForm questions={questions} setQuestions={setQuestions} />}/>
        <Route path="/add-question" element={<AddQuestionForm questions={questions} setQuestions={setQuestions}/>}/>
        <Route path="/edit-group/:id" element={<EditGroup groups={groups} setGroups={setGroups} />}/>
        <Route path='/schedule-feedback-form' element={<ScheduleFeedbackForm groups={groups} setGroups={setGroups}/>}></Route>
        <Route path="/student-feedback-form" element={<StudentFeedbackForm/>}/>
        <Route path="/faculty-feedback-summary" element={<FacultyFeedbackSummary />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/feedback-dashboard" element={<FeedbackDashboard />} />
        <Route path="/faculty_summary" element={<Faculty_Feedback_summary />} />

      </Routes>
   </Router>
    );
}
export default App;

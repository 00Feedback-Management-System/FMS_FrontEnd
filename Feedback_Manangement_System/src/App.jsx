import { useState } from 'react'
import FeedbackTypeForm from "./components/FeedbackTypeForm";
import AddQuestionForm from './components/AddQuestionForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScheduleFeedbackForm from './components/ScheduleFeedbackForm';
import EditGroup from './components/EditGroup';
function App() {
  const [questions, setQuestions] = useState([]);
  const [groups,setGroups]=useState([
    {id:1,groupName:"D1",staffName:"John Doe"},
    {id:2,groupName:"D2",staffName:"Jane Smith"}
  ]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ScheduleFeedbackForm groups={groups} setGroups={setGroups}/>}></Route>
        {/* <Route path="/" element={<FeedbackTypeForm questions={questions} setQuestions={setQuestions}/>}></Route> */}
        {/* <Route path="/add-question" element={<AddQuestionForm questions={questions} setQuestions={setQuestions}/>}></Route> */}
        <Route path="/edit-group/:id" element={<EditGroup groups={groups} setGroups={setGroups}/>}></Route>     
      </Routes>
    </Router>
  )
}

export default App

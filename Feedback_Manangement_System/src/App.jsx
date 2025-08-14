import { useState } from 'react'
import FeedbackTypeForm from "./components/FeedbackTypeForm";
import AddQuestionForm from './components/AddQuestionForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [questions, setQuestions] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedbackTypeForm questions={questions} setQuestions={setQuestions}/>}></Route>
        <Route path="/add-question" element={<AddQuestionForm questions={questions} setQuestions={setQuestions}/>}></Route>
      </Routes>
    </Router>
  )
}

export default App

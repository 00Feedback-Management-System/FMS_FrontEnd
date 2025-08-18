import StudentFeedbackForm from './pages/StudentFeedbackForm';
import {  Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/StudentFeedbackForm" element={<StudentFeedbackForm />} />
      </Routes>
    </div>
  );
}
export default App;

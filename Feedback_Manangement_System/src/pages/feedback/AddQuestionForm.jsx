import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AddQuestionForm({questions,setQuestions}){
    const [text,setText]=useState("");
    const [type,setType]=useState("");
    const navigate=useNavigate();

    const handleAdd=()=>{
        if(text.trim() && type){
            setQuestions([...questions,{text,type}]);
            navigate("/app/feedback-type-form");
        } else {
            alert("Please enter question text and type");
        }
        
    };

    return (
    <div className="container mt-4 p-4 border rounded bg-light">
      <h4 className="text-center mb-4">Add Question</h4>

      <div className="mb-3">
        <label className="form-label">Question</label>
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Type</label>
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled hidden>Select Type</option>
          <option value="Descriptive">Descriptive</option>
          <option value="MCQ">MCQ</option>
          <option value="Rating">Rating</option>
        </select>
      </div>

      <div className="text-center mr-2">
        <button className="btn btn-success " onClick={handleAdd}>
          Add
        </button>
        <button className="btn btn-danger"  style={{ marginLeft: 10 }} onClick={() => navigate("/app/feedback-type-form")}>
          Cancel
        </button>
      </div>
    </div>
    );
}
export default AddQuestionForm;
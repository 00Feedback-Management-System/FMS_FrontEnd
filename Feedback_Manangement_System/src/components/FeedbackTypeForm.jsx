import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


function FeedbackTypeForm({ questions, setQuestions }){
    //  const handleSubmit = (e) => {
    //                                e.preventDefault();
    //                                console.log("Form submitted");
    //                              };
      const navigate = useNavigate();

    return (
          
            <div className="container my-4">
                <h4 className="text-center mb-4">Feedback Type Form</h4>
                <form className="p-4 border shadow-sm bg-light">
                    <div className="row mb-3">
                        <div className="col-md-6 mb-2">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" placeholder="Enter title" />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label className="form-label">Module</label>
                            <select className="form-select" defaultValue="">
                                <option value="" disabled hidden>Select Module</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6 mb-2">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control" placeholder="Enter description" />
                        </div>
                        <div className="col-md-6 mb-2">
                            <label className="form-label">Group</label>
                            <select className="form-select">
                                <option>Single</option>
                                <option>Multiple</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6 mb-2">
                            <label className="form-label">Staff</label>
                            <select className="form-select" defaultValue="">
                                <option value="" disabled hidden>Select Staff</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                        <div className="col-md-3 mb-2">
                            <label className="form-label">Session</label>
                            <select className="form-select" defaultValue="">
                                <option value="" disabled hidden>Select Session</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                        <div className="col-md-3 mb-2">
                            <label className="form-label">Behaviour</label>
                            <select className="form-select" defaultValue="">
                                <option>Compulsory</option>
                                <option>Optional</option>
                            </select>
                        </div>
                    </div>
                </form>

                <h5 className="mt-4">Questions</h5>
                  <button
                      className="btn btn-primary mb-3"
                      onClick={() => navigate("/add-question")}
                  >
                  Add Questions
                 </button>

        <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Questions</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.length > 0 ? (
            questions.map((q, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{q.text}</td>
                <td>{q.type}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() =>
                      setQuestions(questions.filter((_, i) => i !== index))
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No questions added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button className="btn btn-success">Submit</button>
        <button className="btn btn-danger">Cancel</button>
      </div>
    </div>
    
            
        
    
    )
}
export default FeedbackTypeForm;
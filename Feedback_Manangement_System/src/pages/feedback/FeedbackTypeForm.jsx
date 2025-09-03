import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Api from "../../services/api";


function FeedbackTypeForm({ questions, setQuestions }) {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    feedbackTypeTitle: "",
    feedbackTypeDescription: "",
    isModule: false,
    group: "",
    isStaff: false,
    isSession: false,
    behaviour: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload matching backend DTO
    const payload = {
      ...formData,
      questions: questions.map((q) => ({
        question: q.text,
        questionType: q.type,
      })),
    };

    try {
      const response = await Api.post("FeedbackType/CreateFeedbackType", payload)
      alert("Feedback Type created successfully!");
      console.log(response.data);

      // Redirect after success
      navigate("/app/feedback-type-list");
    } catch (error) {
      console.error("Error creating feedback type:", error);
      alert("Something went wrong while saving.");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-3 mb-3">Feedback Type Form</h2>
      <form className="p-4 border shadow-sm bg-light" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="feedbackTypeTitle"
              value={formData.feedbackTypeTitle}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter title"
              required
            />
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label">Module</label>
            <select
              className="form-select"
              name="isModule"
              value={formData.isModule ? "Yes" : "No"}
              onChange={(e) =>
                setFormData({ ...formData, isModule: e.target.value === "Yes" })
              }
            >
              <option value="" disabled hidden>
                Select Module
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="feedbackTypeDescription"
              value={formData.feedbackTypeDescription}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter description"
            />
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label">Group</label>
            <select
              className="form-select"
              name="group"
              value={formData.group}
              onChange={handleChange}
            >
              <option value="">Select Group</option>
              <option>Single</option>
              <option>Multiple</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <label className="form-label">Staff</label>
            <select
              className="form-select"
              name="isStaff"
              value={formData.isStaff ? "Yes" : "No"}
              onChange={(e) =>
                setFormData({ ...formData, isStaff: e.target.value === "Yes" })
              }
            >
              <option value="" disabled hidden>
                Select Staff
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="col-md-3 mb-2">
            <label className="form-label">Session</label>
            <select
              className="form-select"
              name="isSession"
              value={formData.isSession ? "Yes" : "No"}
              onChange={(e) =>
                setFormData({ ...formData, isSession: e.target.value === "Yes" })
              }
            >
              <option value="" disabled hidden>
                Select Session
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="col-md-3 mb-2">
            <label className="form-label">Behaviour</label>
            <select
              className="form-select"
              name="behaviour"
              value={formData.behaviour ? "Compulsory" : "Optional"}
              onChange={(e) =>
                setFormData({ ...formData, behaviour: e.target.value === "Compulsory" })
              }
            >
              <option>Compulsory</option>
              <option>Optional</option>
            </select>
          </div>
        </div>

        <h5 className="mt-4">Questions</h5>
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={() => navigate("/app/add-question")}
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
                      type="button"
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

        <div className="text-center mb-4">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: 10 }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackTypeForm;

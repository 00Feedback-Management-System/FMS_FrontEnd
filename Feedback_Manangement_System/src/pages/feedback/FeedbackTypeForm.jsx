import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

function FeedbackTypeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isUpdate = Boolean(id);

  const [formData, setFormData] = useState({
    feedbackTypeTitle: "",
    feedbackTypeDescription: "",
    isModule: false,
    group: "",
    isStaff: false,
    isSession: false,
    behaviour: false,
  });

  const [questions, setQuestions] = useState([]);

  // ✅ Restore from AddQuestionForm if navigated with state
  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
    if (location.state?.questions) {
      setQuestions(location.state.questions);
    }
  }, [location.state]);

  // ✅ Fetch only if updating and NOT coming back from AddQuestionForm
  useEffect(() => {
    if (isUpdate && !location.state) {
      Api.get(`FeedbackType/${id}`)
        .then((res) => {
          const data = res.data;
          setFormData({
            feedbackTypeTitle: data.feedbackTypeTitle || "",
            feedbackTypeDescription: data.feedbackTypeDescription || "",
            isModule: data.isModule || false,
            group: data.group || "",
            isStaff: data.isStaff || false,
            isSession: data.isSession || false,
            behaviour: data.behaviour || false,
          });
          setQuestions(
            (data.questions || []).map((q) => ({
              question: q.question,
              questionType: q.questionType,
            }))
          );
        })
        .catch((err) => {
          console.error("Error fetching feedback type:", err.response || err);
          alert("Failed to fetch feedback type data. Check backend/API.");
        });
    }
  }, [id, isUpdate, location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      feedbackTypeTitle: formData.feedbackTypeTitle,
      feedbackTypeDescription: formData.feedbackTypeDescription,
      isModule: formData.isModule,
      group: formData.group,
      isStaff: formData.isStaff,
      isSession: formData.isSession,
      behaviour: formData.behaviour,
      questions: questions, // ✅ Keeps newly added questions
    };

    try {
      if (isUpdate) {
        await Api.put(`FeedbackType/${id}`, payload);
        alert("Feedback Type updated successfully!");
      } else {
        await Api.post("FeedbackType/CreateFeedbackType", payload);
        alert("Feedback Type created successfully!");
      }
      navigate("/app/feedback-type-list");
    } catch (error) {
      console.error("Error saving feedback type:", error.response || error);
      alert("Failed to save feedback type.");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-3 mb-3">
        {isUpdate ? "Update Feedback Type" : "Create Feedback Type"}
      </h2>

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
              required
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
          <div className="col-md-4 mb-2">
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
          <div className="col-md-4 mb-2">
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
          <div className="col-md-4 mb-2">
            <label className="form-label">Behaviour</label>
            <select
              className="form-select"
              name="behaviour"
              value={formData.behaviour ? "Compulsory" : "Optional"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  behaviour: e.target.value === "Compulsory",
                })
              }
            >
              <option>Compulsory</option>
              <option>Optional</option>
            </select>
          </div>
        </div>

        {/* Questions Section */}
        <h5 className="mt-4">Questions</h5>
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={() =>
            navigate("/app/add-question" + (isUpdate ? `/${id}` : ""), {
              state: { formData, questions, isUpdate, id },
            })
          }
        >
          Add Questions
        </button>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.length > 0 ? (
              questions.map((q, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{q.question}</td>
                  <td>{q.questionType}</td>
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
            {isUpdate ? "Update" : "Submit"}
          </button>
          <button
            type="button"
            className="btn btn-danger ms-2"
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


// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import Api from "../../services/api";

// function FeedbackTypeForm({ questions, setQuestions }) {
//   const navigate = useNavigate();
//   const { id } = useParams(); // detect edit mode

//   const [formData, setFormData] = useState({
//     feedback_type_title: "",
//     module: "",
//     feedback_type_description: "",
//     group: "Single",
//     is_staff: "No",
//     is_session: "No",
//     behaviour: "Optional",
//   });

//   // Fetch existing feedback type if in edit mode
//   useEffect(() => {
//     if (id) {
//       Api.get(`FeedbackType/GetFeedbackById/${id}`)
//         .then((res) => {
//           const data = res.data;
//           setFormData({
//             feedback_type_title: data.feedback_type_title,
//             module: data.module || "",
//             feedback_type_description: data.feedback_type_description,
//             group: data.group || "Single",
//             is_staff: data.is_staff ? "Yes" : "No",
//             is_session: data.is_session ? "Yes" : "No",
//             behaviour: data.behaviour ? "Compulsory" : "Optional",
//           });
//         })
//         .catch((err) => console.error("Error fetching feedback type:", err));
//     }
//   }, [id]);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...formData,
//       is_staff: formData.is_staff === "Yes",
//       is_session: formData.is_session === "Yes",
//       behaviour: formData.behaviour === "Compulsory",
//       questions: questions,
//     };

//     try {
//       if (id) {
//         // Update existing feedback type
//         await axios.put(
//           `https://localhost:7056/api/FeedbackType/UpdateFeedbackType/${id}`,
//           payload
//         );
//         alert("Feedback type updated successfully!");
//       } else {
//         // Add new feedback type
//         await axios.post(
//           `https://localhost:7056/api/FeedbackType/CreateFeedbackType`,
//           payload
//         );
//         alert("Feedback type added successfully!");
//       }
//       navigate("/app/feedback-type-list");
//     } catch (error) {
//       console.error("Error saving feedback type:", error);
//       alert("Failed to save feedback type.");
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="text-center mt-3 mb-3">
//         {id ? "Edit Feedback Type" : "Add Feedback Type"}
//       </h2>
//       <form
//         className="p-4 border shadow-sm bg-light"
//         onSubmit={handleSubmit}
//       >
//         <div className="row mb-3">
//           <div className="col-md-6 mb-2">
//             <label className="form-label">Title</label>
//             <input
//               type="text"
//               name="feedback_type_title"
//               className="form-control"
//               placeholder="Enter title"
//               value={formData.feedback_type_title}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-6 mb-2">
//             <label className="form-label">Module</label>
//             <select
//               name="module"
//               className="form-select"
//               value={formData.module}
//               onChange={handleChange}
//             >
//               <option value="" disabled hidden>
//                 Select Module
//               </option>
//               <option>Yes</option>
//               <option>No</option>
//             </select>
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6 mb-2">
//             <label className="form-label">Description</label>
//             <input
//               type="text"
//               name="feedback_type_description"
//               className="form-control"
//               placeholder="Enter description"
//               value={formData.feedback_type_description}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-6 mb-2">
//             <label className="form-label">Group</label>
//             <select
//               name="group"
//               className="form-select"
//               value={formData.group}
//               onChange={handleChange}
//             >
//               <option>Single</option>
//               <option>Multiple</option>
//             </select>
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6 mb-2">
//             <label className="form-label">Staff</label>
//             <select
//               name="is_staff"
//               className="form-select"
//               value={formData.is_staff}
//               onChange={handleChange}
//             >
//               <option value="" disabled hidden>
//                 Select Staff
//               </option>
//               <option>Yes</option>
//               <option>No</option>
//             </select>
//           </div>
//           <div className="col-md-3 mb-2">
//             <label className="form-label">Session</label>
//             <select
//               name="is_session"
//               className="form-select"
//               value={formData.is_session}
//               onChange={handleChange}
//             >
//               <option value="" disabled hidden>
//                 Select Session
//               </option>
//               <option>Yes</option>
//               <option>No</option>
//             </select>
//           </div>
//           <div className="col-md-3 mb-2">
//             <label className="form-label">Behaviour</label>
//             <select
//               name="behaviour"
//               className="form-select"
//               value={formData.behaviour}
//               onChange={handleChange}
//             >
//               <option>Compulsory</option>
//               <option>Optional</option>
//             </select>
//           </div>
//         </div>
//       </form>

//       <h5 className="mt-4">Questions</h5>
//       <button
//         className="btn btn-primary mb-3"
//         onClick={() => navigate("/app/add-question")}
//         type="button"
//       >
//         Add Questions
//       </button>

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Questions</th>
//             <th>Type</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {questions && questions.length > 0 ? (
//             questions.map((q, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{q.text}</td>
//                 <td>{q.type}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-danger"
//                     type="button"
//                     onClick={() =>
//                       setQuestions(questions.filter((_, i) => i !== index))
//                     }
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="text-center">
//                 No questions added yet
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div className="text-center mb-4">
//         <button className="btn btn-success" type="submit" onClick={handleSubmit}>
//           {id ? "Update" : "Submit"}
//         </button>
//         <button
//           className="btn btn-danger"
//           style={{ marginLeft: 10 }}
//           type="button"
//           onClick={() => navigate("/app/feedback-type-list")}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

// export default FeedbackTypeForm;

// // import React, {useState} from "react";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import { useNavigate } from "react-router-dom";


// // function FeedbackTypeForm({ questions, setQuestions }){
// //     //  const handleSubmit = (e) => {
// //     //                                e.preventDefault();
// //     //                                console.log("Form submitted");
// //     //                              };
// //       const navigate = useNavigate();

// //     return (
          
// //             <div className="container">
// //                 <h2 className="text-center mt-3 mb-3">Feedback Type Form</h2>
// //                 <form className="p-4 border shadow-sm bg-light">
// //                     <div className="row mb-3">
// //                         <div className="col-md-6 mb-2">
// //                             <label className="form-label">Title</label>
// //                             <input type="text" className="form-control" placeholder="Enter title" />
// //                         </div>
// //                         <div className="col-md-6 mb-2">
// //                             <label className="form-label">Module</label>
// //                             <select className="form-select" defaultValue="">
// //                                 <option value="" disabled hidden>Select Module</option>
// //                                 <option>Yes</option>
// //                                 <option>No</option>
// //                             </select>
// //                         </div>
// //                     </div>

// //                     <div className="row mb-3">
// //                         <div className="col-md-6 mb-2">
// //                             <label className="form-label">Description</label>
// //                             <input type="text" className="form-control" placeholder="Enter description" />
// //                         </div>
// //                         <div className="col-md-6 mb-2">
// //                             <label className="form-label">Group</label>
// //                             <select className="form-select">
// //                                 <option>Single</option>
// //                                 <option>Multiple</option>
// //                             </select>
// //                         </div>
// //                     </div>

// //                     <div className="row mb-3">
// //                         <div className="col-md-6 mb-2">
// //                             <label className="form-label">Staff</label>
// //                             <select className="form-select" defaultValue="">
// //                                 <option value="" disabled hidden>Select Staff</option>
// //                                 <option>Yes</option>
// //                                 <option>No</option>
// //                             </select>
// //                         </div>
// //                         <div className="col-md-3 mb-2">
// //                             <label className="form-label">Session</label>
// //                             <select className="form-select" defaultValue="">
// //                                 <option value="" disabled hidden>Select Session</option>
// //                                 <option>Yes</option>
// //                                 <option>No</option>
// //                             </select>
// //                         </div>
// //                         <div className="col-md-3 mb-2">
// //                             <label className="form-label">Behaviour</label>
// //                             <select className="form-select" defaultValue="">
// //                                 <option>Compulsory</option>
// //                                 <option>Optional</option>
// //                             </select>
// //                         </div>
// //                     </div>
// //                 </form>

// //                 <h5 className="mt-4">Questions</h5>
// //                   <button
// //                       className="btn btn-primary mb-3"
// //                       onClick={() => navigate("/app/add-question")}
// //                   >
// //                   Add Questions
// //                  </button>

// //         <table className="table table-bordered">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Questions</th>
// //             <th>Type</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {questions > 0 ? (
// //             questions.map((q, index) => (
// //               <tr key={index}>
// //                 <td>{index + 1}</td>
// //                 <td>{q.text}</td>
// //                 <td>{q.type}</td>
// //                 <td>
// //                   <button
// //                     className="btn btn-sm btn-danger"
// //                     onClick={() =>
// //                       setQuestions(questions.filter((_, i) => i !== index))
// //                     }
// //                   >
// //                     Delete
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="4" className="text-center">
// //                 No questions added yet
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>

// //       <div className="text-center mb-4">
// //         <button className="btn btn-success" >Submit</button>
// //         <button className="btn btn-danger"  style={{ marginLeft: 10 }}>Cancel</button>
// //       </div>
// //     </div>
    
            
        
    
// //     )
// // }
// // export default FeedbackTypeForm;
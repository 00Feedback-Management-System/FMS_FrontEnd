import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getCourses } from "../../services/course";
import { getModules } from "../../services/Module";
import { getStaff } from "../../services/staff";
import Api from "../../services/api";

function ScheduleFeedbackForm({ groups: initialGroups = [] }) {
  const { id } = useParams(); // 👈 get feedbackId from URL
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [feedbackTypes, setFeedbackTypes] = useState([]);
  const [selectedFeedbackType, setSelectedFeedbackType] = useState(null);
  const [groups, setGroups] = useState(initialGroups);
  const [courseId, setCourseId] = useState("");
  console.log("courseIdForm", courseId);
  
  
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    feedback_type_id: "",
    course_id: "",
    module_id: "",
    staff_id: "",
    session: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.state?.groups)
    {
      setGroups(location.state.groups);
    }

    if (location.state?.formData) {
      setFormData(location.state.formData);
    }

    if(location.state?.selectedFeedbackType) {
      setSelectedFeedbackType(location.state.selectedFeedbackType);
    }

    if(location.state?.CourseId)
    {
      setCourseId(location.state.courseId);
    }
  }, [location.state]);

  // Load dropdowns
  useEffect(() => {
    fetchCourses();
    fetchModules();
    fetchFaculties();
    fetchFeedbackTypes();
  }, []);

  // Load existing record if editing
  useEffect(() => {
    if (id) {
      Api.get(`Feedback/GetFeedback/${id}`)
        .then((res) => {
          const data = res.data;
          setFormData({
            start_date: data.start_date?.split("T")[0] || "",
            end_date: data.end_date?.split("T")[0] || "",
            feedback_type_id: data.feedback_type_id || "",
            course_id: data.course_id || "",
            module_id: data.module_id || "",
            staff_id: data.staff_id || "",
            session: data.session || 0,
          });

          // set selected feedback type
          const type = feedbackTypes.find(
            (t) => t.feedback_type_id === data.feedback_type_id
          );
          setSelectedFeedbackType(type || null);
        })
        .catch((err) => console.error("Failed to load feedback:", err));
    }
  }, [id, feedbackTypes]);

  // Fetch dropdown data
  const fetchFeedbackTypes = async () => {
    try {
      const response = await Api.get("FeedbackType/GetFeedbackType");
      setFeedbackTypes(response.data);
    } catch (error) {
      console.error("Failed to load feedback types:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Failed to load courses:", error);
    }
  };

  const fetchModules = async () => {
    try {
      const data = await getModules();
      setModules(data);
    } catch (error) {
      console.error("Failed to load modules:", error);
    }
  };

  const fetchFaculties = async () => {
    try {
      const data = await getStaff();
      setFaculties(data);
    } catch (error) {
      console.error("Failed to load faculties:", error);
    }
  };

  // Handlers
  // 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e) => {
    const typeId = parseInt(e.target.value, 10);
    const selected = feedbackTypes.find((t) => t.feedback_type_id === typeId);
    setSelectedFeedbackType(selected || null);
    setFormData((prev) => ({ ...prev, feedback_type_id: typeId }));
  };

  const handleDelete = (gid) => {
    setGroups(groups.filter((group) => group.id !== gid));
  };

  const addGroup = () => {
    navigate("/app/edit-group/new", 
      {state: {
        groups,
        courseId,
        isAddMode: true
      } 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await Api.put(`Feedback/UpdateFeedback/${id}`, formData);
        alert("Feedback updated successfully!");
      } else {
        await Api.post("Feedback/CreateFeedback", formData);
        alert("Feedback created successfully!");
      }
      navigate("/app/schedule-Feedback-List");
    } catch (error) {
      console.error("Error saving feedback:", error);
      alert("Failed to save feedback.");
    }
  };

  const handleCourseChange = (e) => {
    setCourseId(e.target.value);
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">
        {id ? "EDIT FEEDBACK" : "SCHEDULE FEEDBACK"}
      </h4>
      <form className="p-4 rounded shadow" onSubmit={handleSubmit}>
        {/* Dates */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">From Date:</label>
            <input
              type="date"
              name="start_date"
              className="form-control"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">To Date:</label>
            <input
              type="date"
              name="end_date"
              className="form-control"
              value={formData.end_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Type + Course */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Type:</label>
            <select
              name="feedback_type_id"
              className="form-select"
              value={formData.feedback_type_id}
              onChange={handleTypeChange}
              required
            >
              <option value="">Select Type</option>
              {feedbackTypes.map((type) => (
                <option
                  key={type.feedback_type_id}
                  value={type.feedback_type_id}
                >
                  {type.feedback_type_title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Course:</label>
            <select
              name="course_id"
              className="form-select"
              value={formData.course_id}
              onChange={handleCourseChange}
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Module + Faculty */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Module:</label>
            <select
              name="module_id"
              className="form-select"
              value={formData.module_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Module</option>
              {modules.map((mod) => (
                <option key={mod.module_id} value={mod.module_id}>
                  {mod.module_name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Staff:</label>
            <select
              name="staff_id"
              className="form-select"
              value={formData.staff_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Faculty</option>
              {faculties.map((fac) => (
                <option key={fac.faculty_id} value={fac.faculty_id}>
                  {fac.first_name} {fac.last_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Session */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Session:</label>
            <input
              type="number"
              name="session"
              className="form-control"
              value={formData.session}
              onChange={handleChange}
              min={0}
            />
          </div>
        </div>

        {/* Group List */}
        {selectedFeedbackType?.group?.toLowerCase() === "multiple" && (
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Group List</h4>
              <button
                type="button"
                onClick={addGroup}
                className="btn btn-success"
              >
                Add Group
              </button>
            </div>

            <table className="table table-bordered table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Group Name</th>
                  <th>Staff Member Name</th>
                  <th className="text-center" colSpan={2}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <tr key={group.id}>
                    <td>{group.groupName}</td>
                    <td>{group.staffName}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          navigate(`/app/edit-group/${group.id}`, 
                            {state: {
                              groups,
                              selectedFeedbackType,
                              courseId
                            }
                          })
                        }
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(group.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {groups.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Groups available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Buttons */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary me-3">
            SUBMIT
          </button>
          <button
            type="button"
            onClick={() => navigate("/app/schedule-Feedback-List")}
            className="btn btn-danger"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}

export default ScheduleFeedbackForm;


// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import { getCourses } from "../../services/course";
// import { getModules } from "../../services/Module";
// import { getStaff } from "../../services/staff";
// import Api from "../../services/api";

// function ScheduleFeedbackForm({ groups = [], setGroups }) {
//   const [courses, setCourses] = useState([]);
//   const [modules, setModules] = useState([]);
//   const [faculties, setFaculties] = useState([]);
//   const [feedbackTypes, setFeedbackTypes] = useState([]);
//   const [selectedFeedbackType, setSelectedFeedbackType] = useState(null); // 👈 track selected type

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCourses();
//     fetchModules();
//     fetchFaculties();
//     fetchFeedbackTypes();
//   }, []);

//   // Get Feedback Types
//   const fetchFeedbackTypes = async () => {
//     try {
//       const response = await Api.get("FeedbackType/GetFeedbackType");
//       setFeedbackTypes(response.data);
//     } catch (error) {
//       console.error("Failed to load feedback types:", error);
//     }
//   };

//   // Get Courses
//   const fetchCourses = async () => {
//     try {
//       const data = await getCourses();
//       setCourses(data);
//     } catch (error) {
//       console.error("Failed to load courses:", error);
//     }
//   };

//   // Get Modules
//   const fetchModules = async () => {
//     try {
//       const data = await getModules();
//       setModules(data);
//     } catch (error) {
//       console.error("Failed to load modules:", error);
//     }
//   };

//   // Get Faculties
//   const fetchFaculties = async () => {
//     try {
//       const data = await getStaff();
//       setFaculties(data);
//     } catch (error) {
//       console.error("Failed to load faculties:", error);
//     }
//   };

//   // Handle delete group
//   const handleDelete = (id) => {
//     setGroups(groups.filter((group) => group.id !== id));
//   };

//   // Handle add group
//   const addGroup = () => {
//     navigate("/app/edit-group/:id");
//   };

//   // Handle change in Type dropdown
//   const handleTypeChange = (e) => {
//     const typeId = parseInt(e.target.value, 10);
//     const selected = feedbackTypes.find((t) => t.feedback_type_id === typeId);
//     setSelectedFeedbackType(selected || null);
//   };

//   return (
//     <div className="container mt-4">
//       <h4 className="text-center mb-4">SCHEDULE FEEDBACK</h4>
//       <form className="p-4 rounded shadow">
//         {/* Dates */}
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">From Date:</label>
//             <input type="date" name="fromDate" className="form-control" required />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">To Date:</label>
//             <input type="date" name="toDate" className="form-control" required />
//           </div>
//         </div>

//         {/* Type + Course */}
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Type:</label>
//             <select
//               name="type"
//               className="form-select"
//               defaultValue=""
//               required
//               onChange={handleTypeChange} // 👈 track selected type
//             >
//               <option value="">Select Type</option>
//               {feedbackTypes.map((type) => (
//                 <option key={type.feedback_type_id} value={type.feedback_type_id}>
//                   {type.feedback_type_title}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Course:</label>
//             <select name="course" className="form-select" defaultValue="" required>
//               <option value="">Select Course</option>
//               {courses.map((course) => (
//                 <option key={course.course_id} value={course.course_id}>
//                   {course.course_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Module + Faculty */}
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Module:</label>
//             <select name="module" className="form-select" defaultValue="" required>
//               <option value="">Select Module</option>
//               {modules.map((mod) => (
//                 <option key={mod.module_id} value={mod.module_id}>
//                   {mod.module_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Staff:</label>
//             <select name="staff" className="form-select" defaultValue="" required>
//               <option value="">Select Faculty</option>
//               {faculties.map((fac) => (
//                 <option key={fac.faculty_id} value={fac.faculty_id}>
//                   {fac.first_name} {fac.last_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Session */}
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Session:</label>
//             <input type="number" name="session" className="form-control" defaultValue={0} min={0} />
//           </div>
//         </div>

//         {/* 👇 Group List - show only if type.group === "Multiple" */}
//         {selectedFeedbackType?.group?.toLowerCase() === "multiple" && (
//           <div className="container mt-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h4>Group List</h4>
//               <button type="button" onClick={addGroup} className="btn btn-success">
//                 Add Group
//               </button>
//             </div>

//             <table className="table table-bordered table-striped align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>Group Name</th>
//                   <th>Staff Member Name</th>
//                   <th className="text-center" colSpan={2}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {groups.map((group) => (
//                   <tr key={group.id}>
//                     <td>{group.groupName}</td>
//                     <td>{group.staffName}</td>
//                     <td>
//                       <button
//                         type="button"
//                         className="btn btn-warning btn-sm me-2"
//                         onClick={() => navigate(`/app/edit-group/${group.id}`)}
//                       >
//                         Edit
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         type="button"
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleDelete(group.id)}
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {groups.length === 0 && (
//                   <tr>
//                     <td colSpan="4" className="text-center">No Groups available</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Buttons */}
//         <div className="text-center">
//           <button type="submit" className="btn btn-primary me-3">SUBMIT</button>
//           <button type="button" onClick={() => navigate("/app/schedule-Feedback-List")} className="btn btn-danger">
//             CANCEL
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ScheduleFeedbackForm;

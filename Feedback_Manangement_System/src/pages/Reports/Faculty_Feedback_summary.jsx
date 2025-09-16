import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { getCourses } from "../../services/course";
import Api from "../../services/api";
import { getStaff } from "../../services/staff";

const FeedbackDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]); // modules for selected course
  const [faculties, setFaculties] = useState([]);
  const [feedbackTypes, setFeedbackTypes] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedFeedbackType, setSelectedFeedbackType] = useState("");

  const [rows, setRows] = useState([]);

  const columns = [
    { field: "id", headerName: "Sr.No", width: 90 },
    { field: "question", headerName: "Question", width: 450 },
    { field: "excellent", headerName: "Excellent", width: 130 },
    { field: "good", headerName: "Good", width: 130 },
    { field: "satisfactory", headerName: "Satisfactory", width: 150 },
    { field: "unsatisfactory", headerName: "Unsatisfactory", width: 170 },
  ];

  // Fetch on mount
  useEffect(() => {
    fetchCourses();
    fetchFaculties();
    // fetchFeedbacks();
    feedbackTypeList();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data || []);
      console.debug("fetchCourses -> courses", data);
    } catch (error) {
      console.error("Failed to load courses:", error);
    }
  };

  const fetchModulesByCourse = async (courseId) => {
    try {
      if (!courseId) {
        setModules([]);
        return;
      }
      const response = await Api.get(`Modules/ByCourse/${courseId}`);
      setModules(response.data || []);
      console.debug("fetchModulesByCourse -> modules", response.data);
    } catch (error) {
      console.error("Failed to load modules:", error);
      setModules([]);
    }
  };

  const fetchFaculties = async () => {
    try {
      const data = await getStaff();
      setFaculties(data || []);
      console.debug("fetchFaculties -> faculties", data);
    } catch (error) {
      console.error("Failed to load faculties:", error);
    }
  };

  // bind feedback type list
  const feedbackTypeList = async () => {
    try {
      const response = await Api.get("FeedbackType/GetFeedbackType");
      console.log("Feedback Type List", response.data);
      setFeedbackTypes(response.data || []);
    } catch (error) {
      console.error("Failed to load feedback types:", error);
    }
  };

  // Course select change
  const handleCourseChange = (e) => {
    const value = e.target.value;
    setSelectedCourse(value);
    setSelectedModule(""); // reset module when course changes
    if (value) fetchModulesByCourse(value);
    else setModules([]);
  };

  return (
    <div className="container">
      <h2 className="page-header text-center mt-3">Faculty Feedback Summary</h2>

      <Box p={3}>
        {/* Filter Section */}
        <div className="row mb-3 col-12">
          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={selectedFeedbackType}
              onChange={(e) => setSelectedFeedbackType(e.target.value)}
            >
              <option value="">Type</option>
              {feedbackTypes.map((ft) => (
                <option
                  key={ft.feedback_type_id}
                  value={String(ft.feedback_type_id)}
                >
                  {ft.feedback_type_title}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={selectedCourse}
              onChange={handleCourseChange}
            >
              <option value="">Course</option>
              {courses.map((course) => (
                <option key={course.course_id} value={String(course.course_id)}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
            >
              <option value="">Module</option>
              {modules.map((mod) => (
                <option key={mod.module_id} value={String(mod.module_id)}>
                  {mod.module_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
            >
              <option value="">Faculty</option>
              {faculties.map((fac) => (
                <option key={fac.staff_id} value={String(fac.staff_id)}>
                  {fac.first_name} {fac.last_name}
                </option>
              ))}
              <option>Jane</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <input
              type="text"
              value="12-03-2025 to 15-08-2025 "
              readOnly
              className="form-control"
            />
          </div>
        </div>
        <div className="align-self-end text-center mb-3 width-100">
          <button className="btn btn-success">Search</button>
        </div>

        <hr />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <div>Feedback Submitted: 5</div>
          <div>Feedback Remaining: 14</div>
          <div>Rating: 2.3</div>
          <Button variant="contained" color="primary">
            Export
          </Button>
        </Box>

        <div style={{ height: 300, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </Box>
    </div>
  );
};

export default FeedbackDashboard;

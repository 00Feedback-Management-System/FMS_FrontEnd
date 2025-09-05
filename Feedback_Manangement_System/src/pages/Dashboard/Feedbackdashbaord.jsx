import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Feedbackdashbaord.css"; 
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../services/course"; 
import { getModules } from "../../services/Module";  
import { getStaff } from "../../services/staff";  


function FeedbackDashboard() {
  const navigate = useNavigate();

  // State for dropdowns
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [faculties, setFaculties] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");

  // DataGrid columns
  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "course", headerName: "Course", flex: 1 },
    { field: "group", headerName: "Group", flex: 1 },
    { field: "module", headerName: "Module", flex: 1 },
    { field: "faculty", headerName: "Faculty", flex: 1 },
    { field: "session", headerName: "Session", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 1 },
    {
      field: "actions",
      headerName: "Action",
      flex: 2,
      renderCell: () => (
        <>
          <Button color="primary" size="small"><EditIcon /></Button>
          <Button color="error" size="small"><DeleteIcon /></Button>
        </>
      )
    }
  ];

  const rows = [
    { id: 1, date: "2025-08-13", course: "DAC", group: "D1", module: "React", faculty: "John Doe", session: "0", rating: 4 },
  ];

  // Fetch Courses on mount
  useEffect(() => {
    fetchCourses();
    fetchModules();
    fetchFaculties();
  }, []);


  //fetch all courses
      const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);  // ✅ courses from API
      } catch (error) {
        console.error("Failed to load courses:", error);
      }
    };

  // Fetch Modules on mount

  const fetchModules = async () => {
    try {
      const data = await getModules();
      setModules(data);  // placeholder
    } catch (error) {
      console.error("Failed to load modules:", error);
    }
  };

  //get all Faculty

  const fetchFaculties = async () => {
    try {
      const data = await getStaff();
      setFaculties(data);  // placeholder
    } catch (error) {
      console.error("Failed to load faculties:", error);
    }
  };

  const handleAddFeedbackclick = () => {
    navigate("/app/feedback-type-list");
  };

  return (
    <div className="container "> 
      <h2 className="page-header text-center mt-3">Feedback Dashboard</h2>
      <Box p={3} className="mb-5 ">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" gap={2}>
            
            {/* Courses Dropdown */}
            <select
              className="form-select form-select-lg"
              style={{ minWidth: "150px" }}
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>

            {/* Modules Dropdown (later will fetch from API) */}
            <select
              className="form-select form-select-lg"
              style={{ minWidth: "150px" }}
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
            >
              <option value="">Select Module</option>
              {modules.map((mod) => (
                <option key={mod.module_id} value={mod.module_id}>
                  {mod.module_name}
                </option>
              ))}
            </select>

            {/* Faculty Dropdown (later from API) */}
            <select
              className="form-select form-select-lg"
              style={{ minWidth: "150px" }}
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
            >
              <option value="">Select Faculty</option>
              {faculties.map((fac) => (
                <option key={fac.faculty_id} value={fac.faculty_id}>
                  {fac.first_name} {fac.last_name}
                </option>
              ))}
            </select>
          </Box>

          <div>
            <button
              className="btn btn-primary"
              onClick={handleAddFeedbackclick}
              style={{ marginLeft: "10px" }}
            >
              Add Feedback
            </button>
          </div>
        </Box>

        <hr className="mb-5 mt-5" />
        <div style={{ height: 400, background: "#fff" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </Box>
    </div>
  );
}

export default FeedbackDashboard;

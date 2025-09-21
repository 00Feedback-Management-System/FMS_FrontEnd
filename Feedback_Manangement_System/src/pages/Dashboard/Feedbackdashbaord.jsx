import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import "./Feedbackdashbaord.css";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../services/course";
import { getStaff } from "../../services/staff";
import Api from "../../services/api";

function FeedbackDashboard() {
  const navigate = useNavigate();

  // State
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]); // modules for selected course
  const [faculties, setFaculties] = useState([]);
  const [feedbackTypes, setFeedbackTypes] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedFeedbackType, setSelectedFeedbackType] = useState("");

  const [rows, setRows] = useState([]); // all rows (normalized included)

  // Columns
  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "course", headerName: "Course", flex: 1 },
    { field: "feedbacktype", headerName: "FeedbackType", flex: 1 },
    { field: "group", headerName: "Group", flex: 1 },
    { field: "module", headerName: "Module", flex: 1 },
    { field: "faculty", headerName: "Faculty", flex: 1 },
    { field: "session", headerName: "Session", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 1 },
    // {
    //   field: "actions",
    //   headerName: "Action",
    //   flex: 2,
    //   sortable: false,
    //   filterable: false,
    //   renderCell: () => (
    //     <>
    //       <Button color="primary" size="small">
    //         <EditIcon />
    //       </Button>
    //       <Button color="error" size="small">
    //         <DeleteIcon />
    //       </Button>
    //     </>
    //   ),
    // },
  ];

  // Fetch on mount
  useEffect(() => {
    fetchCourses();
    fetchFaculties();
    fetchFeedbacks();
    feedbackTypeList();
  }, []);

  // Fetch feedbacks and keep normalized fields on each row
  const fetchFeedbacks = async () => {
    try {
      const response = await Api.get("Feedback/FeedbackDashboard-Rating");
      const mapped = response.data.map((item, index) => {
        const start = item.startDate ? new Date(item.startDate) : null;
        const end = item.endDate ? new Date(item.endDate) : null;

        // Format function (DD-MM-YYYY)
        const format = (d) =>
          d
            ? `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${d.getFullYear()}`
            : "";

        const courseName = item.courseName || "";
        const moduleName = item.moduleName || "";
        const staffName = item.staffName || "";

        return {
          id: `${item.feedbackId}-${index}`, // unique key fix
          date:
            start && end
              ? `${format(start)} to ${format(end)}`
              : format(start) || "",
          course: courseName,
          courseNorm: courseName.toLowerCase().trim(),
          group: item.groupName || "",
          module: moduleName,
          moduleNorm: moduleName.toLowerCase().trim(),
          faculty: staffName,
          facultyNorm: staffName.toLowerCase().trim(),
          session: item.session ?? "",
          rating: item.averageStaffRating
            ? Number(item.averageStaffRating).toFixed(2)
            : "",
          feedbacktype: item.feedbackTypeName || "",
        };
      });

      setRows(mapped);
      console.debug("fetchFeedbacks -> rows", mapped);
    } catch (error) {
      console.error("Failed to load feedbacks:", error);
    }
  };

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

  const handleAddFeedbackclick = () => {
    navigate("/app/feedback-type-list");
  };

  // Course select change
  const handleCourseChange = (e) => {
    const value = e.target.value;
    setSelectedCourse(value);
    setSelectedModule(""); // reset module when course changes
    if (value) fetchModulesByCourse(value);
    else setModules([]);
  };

  // ---------- Filtering (normalized compare) ----------
  // derive normalized selected names (safe even if maps not loaded yet)
  const selectedCourseNameNorm = selectedCourse
    ? (
        courses.find((c) => String(c.course_id) === String(selectedCourse))
          ?.course_name || ""
      )
        .toLowerCase()
        .trim()
    : "";
  const selectedModuleNameNorm = selectedModule
    ? (
        modules.find((m) => String(m.module_id) === String(selectedModule))
          ?.module_name || ""
      )
        .toLowerCase()
        .trim()
    : "";
  const selectedFacultyNameNorm = selectedFaculty
    ? (() => {
        const f = faculties.find(
          (fa) => String(fa.staff_id) === String(selectedFaculty)
        );
        return f
          ? `${f.first_name || ""} ${f.last_name || ""}`.toLowerCase().trim()
          : "";
      })()
    : "";

  const selectedTypeNameNorm = selectedFeedbackType
    ? (
        feedbackTypes.find(
          (ft) => String(ft.feedback_type_id) === String(selectedFeedbackType)
        )?.feedback_type_title || ""
      )
        .toLowerCase()
        .trim()
    : "";

  const filteredRows = useMemo(() => {
    const out = rows.filter((row) => {
      const courseMatch =
        !selectedCourse || row.courseNorm === selectedCourseNameNorm;
      const moduleMatch =
        !selectedModule || row.moduleNorm === selectedModuleNameNorm;
      const facultyMatch =
        !selectedFaculty || row.facultyNorm === selectedFacultyNameNorm;
      const typeMatch =
        !selectedFeedbackType ||
        row.feedbacktype.toLowerCase().trim() === selectedTypeNameNorm;

      return courseMatch && moduleMatch && facultyMatch && typeMatch;
    });
    // DEBUG
    console.debug(
      "Filtering -> selectedCourse:",
      selectedCourse,
      "selectedCourseNameNorm:",
      selectedCourseNameNorm
    );
    console.debug(
      "Filtering -> selectedModule:",
      selectedModule,
      "selectedModuleNameNorm:",
      selectedModuleNameNorm
    );
    console.debug(
      "Filtering -> selectedFaculty:",
      selectedFaculty,
      "selectedFacultyNameNorm:",
      selectedFacultyNameNorm
    );
    console.debug(
      "Filtering -> rowsCount:",
      rows.length,
      "filteredCount:",
      out.length
    );
    console.debug("Filtering -> filteredRows (first few):", out.slice(0, 10));
    return out;
  }, [
    rows,
    selectedCourse,
    selectedModule,
    selectedFaculty,
    selectedCourseNameNorm,
    selectedModuleNameNorm,
    selectedFacultyNameNorm,
    selectedFeedbackType,
    selectedTypeNameNorm,
  ]);

  return (
    <div className="container ">
      <h2 className="page-header text-center mt-3">Feedback Dashboard</h2>
      <Box p={3} className="mb-5 ">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" gap={2}>
            {/* Courses */}
            <select
              name="courseId"
              className="form-select form-select-lg"
              style={{ minWidth: "150px" }}
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

            {/* Modules */}
            <select
              className="form-select form-select-lg"
              style={{ minWidth: "150px" }}
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

            {/* Type of Feedback */}
            <select
              className="form-select form-select-lg"
              style={{ minWidth: "150px" }}
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

            {/* Faculty */}
            <select
              className="form-select form-select-lg"
              style={{ minWidth: "150px" }}
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
            >
              <option value="">Faculty</option>
              {faculties.map((fac) => (
                <option key={fac.staff_id} value={String(fac.staff_id)}>
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
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            getRowId={(row) => row.id}
            disableSelectionOnClick
            autoHeight={false}
          />
        </div>
      </Box>
    </div>
  );
}

export default FeedbackDashboard;

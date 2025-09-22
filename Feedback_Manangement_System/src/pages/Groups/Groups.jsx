import React, { useState, useEffect } from "react";
import Api from "../../services/api"; // your axios instance
import "bootstrap/dist/css/bootstrap.min.css";

function CourseGroupManager() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [groups, setGroups] = useState([]); // holds both existing + new groups

  // Fetch courses on load
  useEffect(() => {
    Api.get("GetAllCourse").then((res) => {
      setCourses(res.data);
    });
  }, []);

  // When course is selected → fetch groups
  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    setGroups([]); // reset groups

    if (!courseId) return;

    try {
      const res = await Api.get(`Groups/ByCourse/${courseId}`);
      if (res.data && res.data.length > 0) {
        // groups exist → load them into input
        setGroups(res.data.map((g) => g.group_name || g)); // handle string or object
      } else {
        setGroups([]); // no groups → start with empty array
      }
    } catch (error) {
      console.error("Error fetching course groups", error);
    }
  };

  // Add new empty group input
  const handleAddGroup = () => {
    setGroups([...groups, ""]);
  };

  // Handle group name change
  const handleGroupChange = (index, value) => {
    const updated = [...groups];
    updated[index] = value;
    setGroups(updated);
  };

  // Remove group input
  const handleDeleteGroup = (index) => {
    const updated = [...groups];
    updated.splice(index, 1);
    setGroups(updated);
  };

  // Submit updated groups
  const handleSubmit = async () => {
    if (!selectedCourse || groups.length === 0) {
      alert("Select a course and add at least one group.");
      return;
    }

    const payload = {
      course_id: Number(selectedCourse),
      groups: groups.filter((g) => g.trim() !== ""), // remove empty strings
    };

    try {
      await Api.post("Groups/addGroups", payload);
      alert("Groups saved successfully!");
    } catch (error) {
      console.error("Error saving groups", error);
      alert("Failed to save groups.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Course Groups Management</h3>

      {/* Course Dropdown */}
      <div className="form-group mt-3">
        <label>Select Course:</label>
        <select
          className="form-control"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="">-- Select --</option>
          {courses.map((c) => (
            <option key={c.course_id} value={c.course_id}>
              {c.course_name}
            </option>
          ))}
        </select>
      </div>

      {/* Add Group Button → always show if a course selected */}
      {selectedCourse && (
        <button className="btn btn-primary mt-3" onClick={handleAddGroup}>
          Add Group
        </button>
      )}

      {/* Dynamic Group Inputs */}
      {groups.map((g, idx) => (
        <div key={idx} className="d-flex align-items-center mt-2">
          <input
            type="text"
            className="form-control"
            placeholder={`Group ${idx + 1}`}
            value={g}
            onChange={(e) => handleGroupChange(idx, e.target.value)}
          />
          <button
            className="btn btn-danger ms-2"
            onClick={() => handleDeleteGroup(idx)}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Submit */}
      {groups.length > 0 && (
        <button className="btn btn-success mt-3" onClick={handleSubmit}>
          Save Groups
        </button>
      )}
    </div>
  );
}

export default CourseGroupManager;

import React, { useEffect, useState } from "react";
import Api from "../../services/api";
import { getCourses } from "../../services/course";

const faculties = [
    { name: "Faculty1", value: 34 },
    { name: "Faculty2", value: 29 },
    { name: "Faculty3", value: 21 },
    { name: "Faculty4", value: 39 },
];

function FacultyFeedbackSummary() {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [courseTypes, setCourseTypes] = useState([]);
    const [courses, setCourses] = useState([]);
    const [courseCycle, setCourseCycle] = useState([]);
    const [feedbackTypes, setFeedbackTypes] = useState([]);
    const [selectedCourseType, setSelectedCourseType] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedCycle, setSelectedCycle] = useState("");

    const fetchCourseTypes = async () => {
        try{
            const response = await Api.get("GetCourseTypes");
            setCourseTypes(response.data || []);
        }catch(e){
            console.log("Failed to load course types:", e);
            setCourseTypes([]);
        }
    };

    const handleCourseTypeChange = async (value) => {
    setSelectedCourseType(value);

        if (value && value !== "Course Type") {
            try {
            const res = await Api.get(`GetCoursesByType/${value}`);
            setCourses(res.data || []);
            } catch (error) {
            console.error("Failed to load courses:", error);
            setCourses([]);
            }
        } else {
            setCourses([]); 
        }
    };
    
    const fetchFeedbackTypes = async () => {
        try{
            const response = await Api.get("FeedbackType/GetFeedbackType");
            setFeedbackTypes(response.data || []);
        }catch(e){
            console.log("Failed to load feedback types:", e);
            setFeedbackTypes([]);
        }
    };

    useEffect(() => {
        fetchCourseTypes();
        fetchFeedbackTypes();
    },[])

    const handleTypeChange = (id) => {
        setSelectedTypes((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        if(selectedCourseType == "CDAC") {
            setCourseCycle(["Mar-Aug", "Sep-Feb"]);
        } else if(selectedCourseType == "Modular Batch" || selectedCourseType == "Pre-CAT") {
            setCourseCycle(["1 Month"]);
        } else {
            setCourseCycle([]);
        }

        setSelectedCycle("");
    }, [selectedCourseType])

    return (
        <div className="container ">
            <h2 className="page-header text-center mt-3 ">Per Faculty Feedback Summary</h2>
            <div className="row mb-3 mt-3">
                <div className="col">
                    <select 
                        className="form-select"
                        value={selectedCourseType}
                        onChange={(e) => {handleCourseTypeChange(e.target.value)}}
                    >
                        <option>Course Type</option>
                        {courseTypes.map((ct, idx) => (
                            <option key={idx} value={ct}>
                                {ct}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <select 
                        className="form-select"
                        value={selectedCourse}
                        onChange={(e) => {setSelectedCourse(e.target.value)}}
                    >
                        <option value="">Course</option>
                        {courses.map((c) => (
                            <option key={c.course_id} value={c.course_id}>
                                {c.course_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <select 
                        className="form-select"
                        value={selectedCycle}
                        onChange={(e) => setSelectedCycle(e.target.value)}
                    >
                        <option>Course Cycle</option>
                        {courseCycle.map((cycle, idx) => (
                            <option key={idx} value={cycle}>
                                {cycle}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mb-3 fw-bold">Select Type(s):</div>
            <div className="row mb-3">
                {feedbackTypes.map((ft) => (
                    <div className="col-md-6 mb-2" key={ft.feedback_type_id}>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`type${ft.feedback_type_id}`}
                                checked={selectedTypes.includes(ft.feedback_type_id)}
                                onChange={() => handleTypeChange(ft.feedback_type_id)}
                            />
                            <label className="form-check-label" htmlFor={`type${ft.feedback_type_id}`}>
                                {ft.feedback_type_title}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mb-4">
                <button className="btn" style={{ background: "#00ff00", minWidth: 120 }}>
                    Generate
                </button>
            </div>
            <hr />
            <div className="mt-4">
                <div style={{ height: 220, position: "relative", background: "#fff", borderRadius: 8, padding: 20 }}>
                    <div style={{ position: "absolute", left: 30, top: 20, bottom: 40, width: 1, background: "#222" }} />
                    <div style={{ position: "absolute", left: 30, right: 20, bottom: 40, height: 1, background: "#222" }} />
                    <div style={{ display: "flex", alignItems: "flex-end", height: 140, marginLeft: 50, marginRight: 30 }}>
                        {faculties.map((f, i) => (
                            <div key={f.name} style={{ flex: 1, textAlign: "center", position: "relative" }}>
                                <div
                                    style={{
                                        height: `${f.value * 3}px`,
                                        background: "blue",
                                        margin: "0 10px",
                                        borderRadius: 4,
                                        transition: "height 0.3s",
                                    }}
                                    title={f.value}
                                />
                            </div>
                        ))}
                    </div>
                    <div style={{
                        display: "flex",
                        position: "absolute",
                        left: 80,
                        right: 30,
                        bottom: 10,
                        height: 20,
                        alignItems: "flex-start"
                    }}>
                        {faculties.map((f, i) => (
                            <div key={f.name} style={{ flex: 1, textAlign: "center", fontWeight: 500, fontSize: 14 }}>
                                {f.name}
                            </div>
                        ))}
                    </div>
                    <div style={{ position: "absolute", left: 0, bottom: 40, fontSize: 12 }}>
                        <div style={{ position: "absolute", bottom: 0 }}>0</div>
                        <div style={{ position: "absolute", bottom: 60 }}>20</div>
                        <div style={{ position: "absolute", bottom: 120 }}>40</div>
                    </div>
                    <div style={{ position: "absolute", right: 15, bottom: 35, fontSize: 24 }}>→</div>
                    <div style={{ position: "absolute", left: 20, top: 10, fontSize: 24 }}>↑</div>
                </div>
            </div>
        </div>
    );
}

export default FacultyFeedbackSummary;
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentFeedbackForm() {
    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState(0);
    const [q3, setQ3] = useState("");
    const [q4, setQ4] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!q1) newErrors.q1 = "Please select an option for Q1.";
        if (q2 === 0) newErrors.q2 = "Please rate for Q2.";
        if (!q3.trim()) newErrors.q3 = "Please answer Q3.";
        if (!q4.trim()) newErrors.q4 = "Please answer Q4.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            toast.success("Feedback submitted!");
        }
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh", background: "#f5f5f5" }}
        >
            <div className="container py-4">
                <ToastContainer position="top-right" />
                <div className="text-center mb-3">
                    <button className="btn btn-primary" disabled style={{ minWidth: 300 }}>
                        STUDENT FEEDBACK FORM
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-4 rounded" style={{ background: "#ddd", border: "1px solid #333" }}>
                        <div className="row mb-3">
                            <div className="col-md-4 mb-2">
                                <label className="form-label fw-bold">Type:</label>
                                <span> Mid Module</span>
                            </div>
                            <div className="col-md-4 mb-2">
                                <label className="form-label fw-bold">Course:</label>
                                <span> DAC</span>
                            </div>
                            <div className="col-md-4 mb-2">
                                <label className="form-label fw-bold">Module:</label>
                                <span> DotNet</span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-4 mb-2">
                                <label className="form-label fw-bold">Session:</label>
                                <span> 6</span>
                            </div>
                            <div className="col-md-5 mb-2">
                                <label className="form-label fw-bold">Staff Name:</label>
                                <span> Mahesh Panhale</span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="fw-bold">Q.1 How well did the teacher explain the concepts?</label>
                            <div className="bg-white rounded p-3" style={{ width: 180 }}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="q1"
                                        id="excellent"
                                        value="Excellent"
                                        checked={q1 === "Excellent"}
                                        onChange={() => setQ1("Excellent")}
                                    />
                                    <label className="form-check-label" htmlFor="excellent">
                                        Excellent
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="q1"
                                        id="good"
                                        value="Good"
                                        checked={q1 === "Good"}
                                        onChange={() => setQ1("Good")}
                                    />
                                    <label className="form-check-label" htmlFor="good">
                                        Good
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="q1"
                                        id="average"
                                        value="Average"
                                        checked={q1 === "Average"}
                                        onChange={() => setQ1("Average")}
                                    />
                                    <label className="form-check-label" htmlFor="average">
                                        Average
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="q1"
                                        id="poor"
                                        value="Poor"
                                        checked={q1 === "Poor"}
                                        onChange={() => setQ1("Poor")}
                                    />
                                    <label className="form-check-label" htmlFor="poor">
                                        Poor
                                    </label>
                                </div>
                            </div>
                            {errors.q1 && <div className="text-danger small mt-1">{errors.q1}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="fw-bold">Q.2 Rate the teacher's clarity of explanation.</label>
                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        style={{
                                            fontSize: 32,
                                            cursor: "pointer",
                                            color: q2 >= star ? "#f7c948" : "#ccc",
                                        }}
                                        onClick={() => setQ2(star)}
                                        role="button"
                                        aria-label={`Rate ${star} star`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            {errors.q2 && <div className="text-danger small mt-1">{errors.q2}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="fw-bold">
                                Q.3 What did you like most about the way the teacher taught this subject?
                            </label>
                            <textarea
                                className="form-control"
                                rows={2}
                                value={q3}
                                onChange={(e) => setQ3(e.target.value)}
                            />
                            {errors.q3 && <div className="text-danger small mt-1">{errors.q3}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="fw-bold">
                                Q.4 Do you have any suggestion for instructor?
                            </label>
                            <textarea
                                className="form-control"
                                rows={2}
                                value={q4}
                                onChange={(e) => setQ4(e.target.value)}
                            />
                            {errors.q4 && <div className="text-danger small mt-1">{errors.q4}</div>}
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary me-2">
                                Submit
                            </button>
                            <button type="button" className="btn btn-danger">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StudentFeedbackForm;
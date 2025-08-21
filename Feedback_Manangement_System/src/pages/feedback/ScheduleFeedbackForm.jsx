import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";

function ScheduleFeedbackForm({groups,setGroups}){
    
    const navigate=useNavigate();
    
    const handleDelete=(id)=>{
        setGroups(groups.filter((group)=>group.id!==id))
    };

    const addGroup = () => {
        navigate("/app/edit-group/:id")
    }

    
     return (
        <div className="container mt-4">
            <h4 className="text-center mb-4">SCHEDULE FEEDBACK</h4>
            <form className="p-4 rounded shadow">
             <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">From Date:</label>
                    <input type="date"
                           name="fromDate"
                           className="form-control"
                           
                           required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">To Date:</label>
                    <input type="date"
                           name="toDate"
                           className="form-control"
                           required 
                    />
                </div>
             </div>

             <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Type:</label>
                    <select name="type" 
                            className="form-select"
                            defaultValue=""
                            required
                    >
                        <option value="" disabled hidden>Select Type</option>
                        <option value="Mid Module Lab">Mid Module Lab</option>
                        <option value="Module End Theory">Module End Theory</option>
                        <option value="Mid Module Theory">Mid Module Theory</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Course:</label>
                    <select name="course" 
                            className="form-select"
                            defaultValue=""
                            required
                    >
                        <option value="" disabled hidden>Select Course</option>
                        <option value="PG-DAC">PG-DAC</option>
                        <option value="PG-DBDA">PG-DBDA</option>
                    </select>
                </div>
             </div>

             <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Module:</label>
                        <select name="module" 
                                className="form-select" 
                                defaultValue=""
                                required
                        >
                            <option value="" disabled hidden>Select Module</option>
                            <option value="CoreJava">Core Java</option>
                            <option value="C++">C++</option>
                            <option value="Javascript">Javascript</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Staff:</label>
                        <select name="staff" 
                                className="form-select" 
                                defaultValue=""
                                required
                        >
                            <option value="" disabled hidden>Select Staff</option>
                            <option value="Mahesh Panhale">Mahesh Panhale</option>
                            <option value="Amit Kulkarni">Amit Kulkarni</option>
                            <option value="Nilesh Ghule">Nilesh Ghule</option>
                        </select>
                    </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Session:</label>
                    <input type="number" name="session" className="form-control" defaultValue={0} min={0}/>
                </div>
              </div>

              <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>Group List</h4>
                     <button onClick={addGroup} className="btn btn-success">Add Group</button>
                </div>
                
                 <table className="table table-bordered table-striped align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th >Group Name</th>
                        <th>Staff Member Name</th>
                        <th className="text-center" colSpan={2}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groups.map((group)=>(
                        <tr key={group.id}>
                            <td>{group.groupName}</td>
                            <td>{group.staffName}</td>
                            <td><button type="button" className="btn btn-warning btn-sm me-2" onClick={()=>navigate(`/app/edit-group/${group.id}`)}>Edit</button></td>
                            <td><button  type="button" className="btn btn-danger btn-sm" onClick={()=>handleDelete(group.id)}>Remove</button></td>
                        </tr>
                    ))}
                    {groups.length==0 && (
                        <tr>
                            <td colSpan="3" className="text-center">No Groups available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
             </div>

             <div className="text-center">
                <button type="submit" className="btn btn-primary me-3">SUBMIT</button>
                <button type="button" onClick={() => navigate("/app/schedule-Feedback-List")} className="btn btn-danger">CANCEL</button>
             </div>
            </form>

             
        </div>
     )
}
export default ScheduleFeedbackForm;
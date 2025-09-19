import React, { useState, useEffect } from "react";
import axios from "axios";

function AddGroups() {
  const [groupName, setGroupName] = useState("");
  const [groupCount, setGroupCount] = useState("");
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      const res = await axios.get("https://localhost:7056/api/Groups"); 
      setGroups(res.data);
    } catch (err) {
      console.error(" Error fetching groups:", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGroup = {
      group_name: groupName.trim(),
      group_count: parseInt(groupCount, 10),
    };

    try {
      await axios.post("https://localhost:7056/api/Groups", newGroup, {
        headers: { "Content-Type": "application/json" },
      });
      alert("✅ Group added successfully!");
      setGroupName("");
      setGroupCount("");
      fetchGroups(); 
    } catch (error) {
      console.error("❌ Error adding group:", error.response?.data || error.message);
      alert("❌ Failed to add group");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Group</h2>

     
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
        <div className="mb-3">
          <label className="form-label">Group Name</label>
          <input
            type="text"
            className="form-control"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Group Count</label>
          <input
            type="number"
            className="form-control"
            value={groupCount}
            onChange={(e) => setGroupCount(e.target.value)}
            required
            min={1}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Group
        </button>
      </form>

     
      <h3 className="text-center mb-3">Groups List</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Group ID</th>
            <th>Group Name</th>
            <th>Group Count</th>
          </tr>
        </thead>
        <tbody>
          {groups.length > 0 ? (
            groups.map((g, i) => (
              <tr key={g.group_id}>
                <td>{i + 1}</td>
                <td>{g.group_id}</td>
                <td>{g.group_name}</td>
                <td>{g.group_count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No groups found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AddGroups;

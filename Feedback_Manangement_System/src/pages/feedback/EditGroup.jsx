import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EditGroup({ groups, setGroups }) {
  const { id } = useParams();
  const navigate = useNavigate();

 
  const isAddMode = id === "new";

  const [formData, setFormData] = useState({
    groupName: "",
    staffName: ""
  });

  useEffect(() => {
    if (!isAddMode) {
      const group = groups.find(g => g.id === parseInt(id));
      if (group) {
        setFormData({
          groupName: group.groupName,
          staffName: group.staffName
        });
      }
    }
  }, [id, isAddMode, groups]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isAddMode) {
      // Add new group
      const newGroup = {
        id: groups.length + 1,
        groupName: formData.groupName,
        staffName: formData.staffName
      };
      setGroups([...groups, newGroup]);
    } else {
      // Update existing group
      const updatedGroups = groups.map(g =>
        g.id === parseInt(id) ? { ...g, ...formData } : g
      );
      setGroups(updatedGroups);
    }
    navigate("/"); // go back to list
  };

  return (
    <div className="container mt-4">
      <h2>{isAddMode ? "Add Group" : "Edit Group"}</h2>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label className="form-label">Group Name</label>
          <input
            type="text"
            className="form-control"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Staff Name</label>
          <input
            type="text"
            className="form-control"
            name="staffName"
            value={formData.staffName}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isAddMode ? "Add Group" : "Save Changes"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/app/schedule-feedback-form")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditGroup;

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGroupsByCourse } from '../../services/group'

function EditGroup({ groups, setGroups }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { groups: locationGroups, selectedFeedbackType, courseId } = location.state || {};
  console.log("courseId", courseId);

  const isAddMode = id === "new";

  const [formData, setFormData] = useState({
    groupName: "",
    staffName: ""
  });

  const [groupOptions, setGroupOptions] = useState([]);

  //   useEffect(() => {
  //     const fetchGroups = async () => {
  //       try
  //       {
  //         const response = await getGroupsByCourse(courseId);
  //         if(response.status == 200)
  //         {
  //           setGroupOptions(response.data);
  //         }
  //         else
  //         {
  //           setGroupOptions([]);
  //         }
  //       }
  //       catch(err)
  //       {
  //         console.log("Error fetching groups", err)
  //         setGroupOptions([]);
  //       }
  //     };

  //   if(courseId)
  //   {
  //     fetchGroups()
  //   }
  // }, [courseId]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get(`getGroupsByCourse/${courseId}`);
        if (response.status === 200) {
          setGroupOptions(response.data);
        } else {
          setGroupOptions([]);
        }
      } catch (err) {
        console.log("Error fetching groups", err);
        setGroupOptions([]);
      }
    };

    if (courseId) {
      fetchGroups();
    }
  }, [courseId]);

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
  }, [id, isAddMode, locationGroups]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    let updatedGroups;
    if (isAddMode) {
      updatedGroups = [
        ...locationGroups,
        { id: locationGroups.length + 1, ...formData }
      ];
    } else {
      updatedGroups = locationGroups.map(g =>
        g.id === parseInt(id) ? { ...g, ...formData } : g
      );
    }
    setGroups(updatedGroups);
    navigate("/app/schedule-feedback-form", { 
      state: { 
        groups: updatedGroups, 
        formData: location.state.formData, 
        selectedFeedbackType: location.state.selectedFeedbackType 
      } 
    });
  };

  const handleCancel = () => {
    navigate("/app/schedule-feedback-form", { 
      state: 
      { 
        groups: locationGroups, 
        formData: location.state.formData, 
        selectedFeedbackType: location.state.selectedFeedbackType 
      } 
    });
  }

  return (
    <div className="container mt-4">
      <h2>{isAddMode ? "Add Group" : "Edit Group"}</h2>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label className="form-label">Group Name</label>
          {(isAddMode) ? (
            <select
              className="form-control"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              required
            >
              <option value="">Select a Group</option>
              {groupOptions.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              className="form-control"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              required
            />
          )}
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
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditGroup;

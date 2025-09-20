import React, { useState, useEffect } from "react";
import Api from "../../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function StaffForm() {
  const [staffroles, setStaffroles] = useState([]);
  const [showPassword, setShowPassword] = useState(false); //for toggle
  const [formData, setFormData] = useState({
    staffrole_id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    profileImage: null,
  });

  // Fetch staff roles on load
  useEffect(() => {
    Api.get("staff/GetStaffRoles")
      .then((res) => setStaffroles(res.data))
      .catch((err) => console.error("Error fetching staff roles:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { staffrole_id, first_name, last_name, email, password } = formData;
    if (!staffrole_id || !first_name || !last_name || !email || !password) {
      alert("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    data.append("staffrole_id", formData.staffrole_id);
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.profileImage) data.append("profileImage", formData.profileImage);

    try {
      const res = await Api.post("staff/addStaff", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Staff created successfully!");
      console.log(res.data);

      // Reset form
      setFormData({
        staffrole_id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        profileImage: null,
      });
    } catch (err) {
      console.error("Error creating staff:", err);
      alert("Error creating staff");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center mb-4">👨‍🏫 Create Staff</h3>
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Staff Role */}
          <div className="mb-3">
            <label className="form-label">Staff Role *</label>
            <select
              className="form-select"
              name="staffrole_id"
              value={formData.staffrole_id}
              onChange={handleChange}
            >
              <option value="">-- Select Role --</option>
              {staffroles.map((role) => (
                <option key={role.staffrole_id} value={role.staffrole_id}>
                  {role.staffrole_name}
                </option>
              ))}
            </select>
          </div>

          {/* First & Last Name */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
        
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
            
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email *</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              autoComplete="new-email" // 🔑 prevent browser autofill
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password *</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              autoComplete="new-password" // 🔑 prevent browser autofill
            />
             <span
               onClick={() => setShowPassword(!showPassword)}
                    style={{
                    position: "relative",
                    left:"950px",
                    bottom:"33px",
                    cursor: "pointer"
                    }}
                    >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Profile Image */}
          <div className="mb-3">
            <label className="form-label">Profile Image (optional)</label>
            <input
              type="file"
              className="form-control"
              name="profileImage"
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <div className="d-grid">
            <button type="submit" className="btn btn-success btn-lg">
              Create Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StaffForm;

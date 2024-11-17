import React, { useState, useEffect } from "react";

const StudentFormModal = ({ student, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: null,
    stuid: "",
    name: "",
    age: "",
    gender: "",
    major: "",
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.gender || !formData.major) {
      alert("Please fill out all required fields.");
      return;
    }
    onSave(formData); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5>{formData.id ? "Edit Student" : "Add New Student"}</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <input
              type="text"
              name="stuid"
              value={formData.stuid || ""}
              onChange={handleChange}
              placeholder="Student ID"
              className="form-control mb-3"
            />
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Name"
              className="form-control mb-3"
            />
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              placeholder="Age"
              className="form-control mb-3"
            />
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              className="form-select mb-3"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select
              name="major"
              value={formData.major || ""}
              onChange={handleChange}
              className="form-select mb-3"
            >
              <option value="">Select Major</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Life Science">Life Science</option>
              <option value="Management">Management</option>
              <option value="Law">Law</option>
              <option value="Economy">Economy</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;

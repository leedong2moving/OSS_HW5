import React from "react";

const StudentCard = ({ student, onEdit, onDelete }) => {
  const handleEditClick = () => {
    if (onEdit && typeof onEdit === "function") {
      onEdit(student); 
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      if (onDelete && typeof onDelete === "function") {
        onDelete(student.id); 
      }
    }
  };

  return (
    <div className="col">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">{student.name || "No Name"}</h5>
          <p>Age: {student.age || "N/A"}</p>
          <p>Major: {student.major || "N/A"}</p>
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-primary" onClick={handleEditClick}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;


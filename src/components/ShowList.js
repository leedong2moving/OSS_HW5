import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentCard from "./StudentCard";

const ShowList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get("https://672b298a976a834dd025df28.mockapi.io/students");
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const openPopup = (student = null) => {
    const width = 500;
    const height = 600;
  
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
  
    const popupWindow = window.open(
      "",
      "StudentForm",
      `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=no`
    );
  
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${student ? "Edit Student" : "Add New Student"}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #2d2d35;
            color: #fff;
          }
          form {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          input, select, button {
            padding: 10px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #ddd;
          }
          button {
            background-color: #007bff;
            color: white;
            cursor: pointer;
            border: none;
          }
          button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <h1>${student ? "Edit Student" : "Add New Student"}</h1>
        <form id="studentForm">
          <input type="hidden" name="id" value="${student?.id || ""}">
          <label>Student ID</label>
          <input type="text" name="stuid" value="${student?.stuid || ""}" required>
          <label>Name</label>
          <input type="text" name="name" value="${student?.name || ""}" required>
          <label>Age</label>
          <input type="number" name="age" value="${student?.age || ""}" required>
          <label>Gender</label>
          <select name="gender" required>
            <option value="">Select Gender</option>
            <option value="Male" ${student?.gender === "Male" ? "selected" : ""}>Male</option>
            <option value="Female" ${student?.gender === "Female" ? "selected" : ""}>Female</option>
          </select>
          <label>Major</label>
          <select name="major" required>
            <option value="">Select Major</option>
            <option value="Computer Science" ${
              student?.major === "Computer Science" ? "selected" : ""
            }>Computer Science</option>
            <option value="Life Science" ${
              student?.major === "Life Science" ? "selected" : ""
            }>Life Science</option>
            <option value="Management" ${
              student?.major === "Management" ? "selected" : ""
            }>Management</option>
            <option value="Law" ${student?.major === "Law" ? "selected" : ""}>Law</option>
            <option value="Economy" ${
              student?.major === "Economy" ? "selected" : ""
            }>Economy</option>
          </select>
          <button type="submit">Save</button>
        </form>
        <script>
          document.getElementById('studentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const studentData = {};
            formData.forEach((value, key) => {
              studentData[key] = value;
            });
            window.opener.handlePopupSubmit(studentData);
            window.close();
          });
        </script>
      </body>
      </html>
    `;
  
    popupWindow.document.open();
    popupWindow.document.write(htmlContent);
    popupWindow.document.close();
  };
  

  const handlePopupSubmit = async (student) => {
    try {
      if (student.id) {
        await axios.put(
          `https://672b298a976a834dd025df28.mockapi.io/students/${student.id}`,
          student
        );
      } else {
        await axios.post("https://672b298a976a834dd025df28.mockapi.io/students", student);
      }
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  window.handlePopupSubmit = handlePopupSubmit;

  return (
    <div>
      <h1 className="heading">Student Management</h1>
      <div className="text-center mb-4">
        <button
          className="btn btn-success"
          onClick={() => openPopup(null)}
        >
          Add New Student
        </button>
      </div>
      <div className="student-list row row-cols-1 row-cols-md-3 g-4">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onEdit={() => openPopup(student)}
            onDelete={async (id) => {
              await axios.delete(`https://672b298a976a834dd025df28.mockapi.io/students/${id}`);
              fetchStudents();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowList;

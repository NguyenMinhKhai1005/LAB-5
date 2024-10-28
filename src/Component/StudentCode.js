import React, { useState, useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const StudentCode = () => {
  // State variables
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Fetch students from API

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        "https://student-api-nestjs.onrender.com/students"
      );
      const studentData = await response.json();
      setStudents(studentData.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add new student
  const addStudent = async () => {
    const newStudent = { name, studentCode, isActive };
    try {
      const response = await fetch(
        "https://student-api-nestjs.onrender.com/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStudent),
        }
      );
      const data = await response.json();

      // Check if the addition was successful
      if (data && data._id) {
        // Update the students state directly with the new student
        setStudents((prevStudents) => [data, ...prevStudents]);
      } else {
        // Fetch the students again if the addition was not successful
        fetchStudents();
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }

    // Reset input fields
    setName("");
    setStudentCode("");
    setIsActive(false);
  };

  // Delete student
  const deleteStudent = async (studentId) => {
    try {
      await fetch(
        `https://student-api-nestjs.onrender.com/students/${studentId}`,
        {
          method: "DELETE",
        }
      );
      const updatedStudents = students.filter(
        (student) => student._id !== studentId
      );
      setStudents(updatedStudents);
      updateSelectedCount(updatedStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleSelectStudent = (index) => {
    const updatedSelectedStudents = [...selectedStudents];
    if (updatedSelectedStudents.includes(index)) {
      const updated = updatedSelectedStudents.filter((i) => i !== index);
      setSelectedStudents(updated);
    } else {
      updatedSelectedStudents.push(index);
      setSelectedStudents(updatedSelectedStudents);
    }
    setSelectedCount(updatedSelectedStudents.length);
  };

  const updateSelectedCount = (updatedStudents) => {
    const count = selectedStudents.filter(
      (i) => i < updatedStudents.length
    ).length;
    setSelectedCount(count);
    setSelectedStudents((prevSelected) =>
      prevSelected.filter((i) => i < updatedStudents.length)
    );
  };

  const clearStudents = () => {
    setStudents([]);
    setSelectedCount(0);
    setSelectedStudents([]);
  };

  return (
    <div className="container mt-5">
      <h3>Total Selected Student: {selectedCount}</h3>
      <Button variant="primary" className="mt-3" onClick={clearStudents}>
        Clear
      </Button>

      <Form className="mt-4">
        <Form.Group controlId="name">
          <Form.Label>Student Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="studentCode">
          <Form.Label>Student Code:</Form.Label>
          <Form.Control
            type="text"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="isActive">
          <Form.Check
            type="checkbox"
            label="Is Active"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </Form.Group>

        <Button variant="primary" className="mt-3" onClick={addStudent}>
          Add
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Select</th>
            <th>Student Name</th>
            <th>Student Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>
                <Form.Check
                  type="checkbox"
                  onChange={() => handleSelectStudent(index)}
                  checked={selectedStudents.includes(index)}
                />
              </td>
              <td>
                <Link to={`/student/${student._id}`}>{student.name}</Link>{" "}
                {/* Link to student detail */}
              </td>
              <td>{student.studentCode}</td>
              <td>
                {student.isActive ? (
                  <span className="badge bg-info text-white">Active</span>
                ) : (
                  <span className="badge bg-danger text-white">In-active</span>
                )}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteStudent(student._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentCode;

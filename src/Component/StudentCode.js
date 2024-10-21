import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
const StudentCode = () => {
  // Default students
  const defaultStudents = [
    { name: "Nguyen Van A", code: "CODE12345", isActive: true },
    { name: "Tran Van B", code: "CODE67890", isActive: false },
  ];

  // State variables
  const [students, setStudents] = useState(defaultStudents);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Add new student
  const addStudent = () => {
    const newStudent = { name, code, isActive };
    setStudents([newStudent, ...students]);
    setName("");
    setCode("");
    setIsActive(false);
  };

  // Delete student
  const deleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
    updateSelectedCount(updatedStudents);
  };

  // Handle checkbox selection
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

  // Update total selected count
  const updateSelectedCount = (updatedStudents) => {
    const count = selectedStudents.filter(
      (i) => i < updatedStudents.length
    ).length;
    setSelectedCount(count);
    setSelectedStudents((prevSelected) =>
      prevSelected.filter((i) => i < updatedStudents.length)
    );
  };

  // Clear all students
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
        <Form.Group controlId="formStudentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
          />
        </Form.Group>

        <Form.Group controlId="formStudentCode" className="mt-3">
          <Form.Label>Student Code</Form.Label>
          <Form.Control
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter student code"
          />
        </Form.Group>

        <Form.Group controlId="formActive" className="mt-3">
          <Form.Check
            type="checkbox"
            label="Still Active"
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
              <td>{student.name}</td>
              <td>{student.code}</td>
              <td>
                {student.isActive ? (
                  <span className="badge bg-info text-white">Active</span>
                ) : (
                  <span className="badge bg-danger text-white">In-active</span>
                )}
              </td>
              <td>
                <Button variant="danger" onClick={() => deleteStudent(index)}>
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

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [name, setName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch student details from API
  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://student-api-nestjs.onrender.com/students/${id}`
        );
        const studentDetail = await response.json();
        setStudent(studentDetail.data);
        setName(studentDetail.data.name);
        setStudentCode(studentDetail.data.studentCode);
        setIsActive(studentDetail.data.isActive);
      } catch (error) {
        setError("Error fetching student details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // Function to edit student and navigate back to home page
  const editStudent = async (e) => {
    e.preventDefault();
    const updatedStudent = { name, studentCode, isActive };

    try {
      const response = await fetch(
        `https://student-api-nestjs.onrender.com/students/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedStudent),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStudent(data); // Cập nhật lại state student với dữ liệu mới
        navigate("/"); // Điều hướng về trang chính
      } else {
        setError("Failed to update student details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      setError("Error updating student. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Student Details</h2>
      {isEditing ? (
        <Form onSubmit={editStudent}>
          <Form.Group controlId="name">
            <Form.Label>Student Name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="studentCode" className="mt-2">
            <Form.Label>Student Code:</Form.Label>
            <Form.Control
              type="text"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="isActive" className="mt-2">
            <Form.Check
              type="checkbox"
              label="Is Active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Save Changes
          </Button>
          <Button
            variant="secondary"
            className="ms-2 mt-3"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Code:</strong> {student.studentCode}
          </p>
          <p>
            <strong>Status:</strong> {student.isActive ? "Active" : "Inactive"}
          </p>
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </div>
      )}
      <Button variant="primary" className="mt-3" onClick={() => navigate("/")}>
        Go Back
      </Button>
    </div>
  );
};

export default StudentDetail;

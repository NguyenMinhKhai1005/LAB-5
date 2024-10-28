import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentCode from "./Component/StudentCode";
import StudentDetail from "./Component/StudentDetail"; // New component for student detail

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentCode />} />
        <Route path="/student/:id" element={<StudentDetail />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;

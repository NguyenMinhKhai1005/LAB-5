import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Đây là CSS của bạn, có thể để trống hoặc custom
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Đảm bảo import Bootstrap ở đây

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // Kiểm tra rằng có element với id='root' trong file public/index.html
);

import React from "react";
import { Spin } from "antd";
function Spinner() {
  return (
    <div className="spinner">
      <Spin size="large" style={{ color: "grey" }} />
    </div>
  );
}

export default Spinner;

import { Spin } from "antd";
import React from "react";

export default function KLoader() {
  return (
    <div
      style={{ textAlign: "center", transform: "scale(3)", margin: "50px 0" }}
    >
      <Spin size="large" />
    </div>
  );
}

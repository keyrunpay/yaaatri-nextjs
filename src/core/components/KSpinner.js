import { Spin } from "antd";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function KSpinner({ spinning, children }) {
  return (
    <Spin
      spinning={spinning}
      indicator={<AiOutlineLoading3Quarters className="rotate" />}
    >
      {children}
    </Spin>
  );
}

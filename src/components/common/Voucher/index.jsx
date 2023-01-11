import React from "react";
import "./style.scss";
export default function Voucher(props) {
  const { active, value, code, date } = props;
  return (
    <div className={`voucher art-text ${active && "active"}`}>
      <div className="voucher-side">
        <p>{value || 5}%</p>
      </div>
      <div className="voucher-content ">
        <p>{code || "NEW2023"}</p>
        <p className="nor-text">HSD: {date || "31/1/2023"}</p>
      </div>
    </div>
  );
}

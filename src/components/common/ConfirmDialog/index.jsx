import { IconButton } from "@mui/material";
import React from "react";
import { BsXLg } from "react-icons/bs";
import ArtBtn from "../ArtBtn";
import "./style.scss";

export default function ConfirmDialog(props) {
  const { handleClose, dialogContent, submit } = props;
  return (
    <div className="confirm-dialog" onClick={handleClose}>
      <div
        className="confirm-dialog-box"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="confirm-dialog-box-header">
          <h3 className="art-text">{dialogContent.title}</h3>
          <IconButton onClick={handleClose}>
            <BsXLg />
          </IconButton>
        </div>
        <div className="confirm-dialog-box-content">
          <p>{dialogContent.message}</p>
        </div>
        <div className="confirm-dialog-box-action">
          <ArtBtn content="Đóng" style="btn2" handleClick={handleClose} />
          {submit && <ArtBtn content="Xác nhận" type="submit" />}
        </div>
      </div>
    </div>
  );
}

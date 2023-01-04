import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import ArtBtn from "../ArtBtn";
import "./style.scss";
function NotiDialog(props) {
  const { dialogContent, open, handleClose, type } = props;
  return (
    <Dialog
      fullScreen={false}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      className="dialog-container"
    >
      <DialogTitle
        id="responsive-dialog-title"
        className="dialog-title art-text"
      >
        {dialogContent?.title}
      </DialogTitle>
      <DialogContent className="dialog-content">
        <DialogContentText className="dialog-content-text">
          {dialogContent?.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ArtBtn type="button" content="Đóng" handleClick={handleClose} />
      </DialogActions>
    </Dialog>
  );
}

export default NotiDialog;

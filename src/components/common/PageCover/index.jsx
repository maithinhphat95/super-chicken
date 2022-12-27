import React from "react";
import images from "../../../assets/images";
function PageCover(props) {
  const { id, className, children } = props;
  return (
    <div
      id={`${id ? id : ""}`}
      className={`${className}`}
      style={{ backgroundImage: `url(${images.serviceBg})` }}
    >
      {children}
    </div>
  );
}

export default PageCover;

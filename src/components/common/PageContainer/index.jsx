import React from "react";
import "./style.scss";
function PageContainer(props) {
  const { id, className, children } = props;
  return (
    <div id={`${id ? id : ""}`} className={`${className} page-container`}>
      {children}
    </div>
  );
}

export default PageContainer;

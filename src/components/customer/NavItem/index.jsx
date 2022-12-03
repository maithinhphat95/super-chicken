import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/material";

NavItem.propTypes = {};

function NavItem(props) {
  const { content, url } = props;
  const params = useParams();

  return (
    <li className="nav-item">
      <Link
        className={`art-text ${params?.page === url && "active"}`}
        to={url || ""}
      >
        {content}
      </Link>
    </li>
  );
}

export default NavItem;

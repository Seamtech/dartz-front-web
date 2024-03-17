import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import "./Breadcrumb.scss";

// Utility function to capitalize the first letter of each word and replace hyphens with spaces
// Enhanced to handle special cases
const formatBreadcrumbLabel = (pathString, pathname) => {
  let formattedString = pathString
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Handle special cases with regex checks for numeric IDs in the path
  if (pathname.includes('/tournaments/') && /^\d+$/.test(pathString)) {
    formattedString = `Tournament ${pathString}`;
  } else if (pathname.includes('/players/playerProfile') && /^\d+$/.test(pathString)) {
    formattedString = `Player ${pathString}`;
  }

  return formattedString;
};

const CustomBreadcrumb = () => {
  const history = useSelector(state => state.breadcrumb.history) || [];
  const location = useLocation();

  return (
    <Breadcrumb className="custom-breadcrumb">
      {history.map((path, index) => {
        const isActive = index === history.length - 1; // Determine if this is the active (last) breadcrumb
        let pathLabel = path.split("/").pop(); // Extract the display label for the breadcrumb

        // Pass the current pathname for special formatting cases
        pathLabel = formatBreadcrumbLabel(pathLabel, location.pathname);

        return (
          <Breadcrumb.Item key={index} active={isActive}>
            {isActive ? (
              // For the active (last) breadcrumb, just display the label without a link
              pathLabel
            ) : (
              // For all other breadcrumbs, wrap the label in a Link component
              <Link to={path}>{pathLabel}</Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;

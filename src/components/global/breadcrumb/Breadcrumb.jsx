import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { pushToHistory, setBreadcrumbHistory } from '../../../redux/slices/navigationSlice'; // Adjust the import path
import "./Breadcrumb.css";

// Utility function to format breadcrumb labels
const formatBreadcrumbLabel = (path, pathname) => {
  if (path === '') {
    return 'Home';
  }

  let formattedString = path
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (pathname.includes('/tournaments/') && /^\d+$/.test(path)) {
    formattedString = `Tourney ${path}`;
  } else if (pathname.includes('/players/playerProfile') && /^\d+$/.test(path)) {
    formattedString = `Player ${path}`;
  }

  return formattedString;
};

// List of paths to exclude from the breadcrumb history
const excludedPaths = ['/error'];

const CustomBreadcrumb = () => {
  const dispatch = useDispatch();
  const history = useSelector(state => state.breadcrumb?.history) || [];
  const location = useLocation();

  useEffect(() => {
    if (!history.includes(location.pathname) && !excludedPaths.includes(location.pathname)) {
      dispatch(pushToHistory(location.pathname));
    }
  }, [location.pathname, history, dispatch]);

  const handleBreadcrumbClick = (path) => {
    if (history[history.length - 1] !== path) {
      const newHistory = history.filter(item => item !== path).concat(path);
      dispatch(setBreadcrumbHistory(newHistory));
    }
  };

  return (
    <Breadcrumb className="custom-breadcrumb">
      {history.map((path, index) => {
        const isActive = path === location.pathname;
        const pathSegments = path.split("/");
        let pathLabel = pathSegments.pop();

        // Format the pathLabel using the formatBreadcrumbLabel function
        pathLabel = formatBreadcrumbLabel(pathLabel, path);

        return (
          <Breadcrumb.Item key={path} active={isActive}>
            {isActive ? (
              // For the active (last) breadcrumb, just display the label without a link
              pathLabel
            ) : (
              // For all other breadcrumbs, wrap the label in a Link component
              <Link to={path} onClick={() => handleBreadcrumbClick(path)}>{pathLabel}</Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;

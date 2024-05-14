import React, { useState } from "react";  // Corrected to include useState
import { useSelector } from "react-redux";
import CollapsiblePanel from "../../global/three-column-layout/CollapsiblePanel";

const LeftSideComponent = () => {
  const isLoggedIn = useSelector((state) => Boolean(state.user.token));
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage collapse status

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed); // Toggle function to change panel visibility
  };

  return (
    <div className="left-side-content">
      <button className="collapsible-panels-button" onClick={toggleCollapse}>
        {isCollapsed ? 'Show Panels' : 'Hide Panels'}
      </button>

      {isLoggedIn && !isCollapsed ? (
        <>
          <CollapsiblePanel title="My Tournaments" panelId='my-tournaments'>
            <div className="main-content-box">
              <ul>
                <li>Tournament 1 - Upcoming</li>
                <li>Tournament 2 - Ongoing</li>
              </ul>
            </div>
          </CollapsiblePanel>
          <CollapsiblePanel title="Quick Links" panelId='quick-links'>
            <div className="main-content-box">
              <ul>
                <li>Register New Tournament</li>
                <li>View Leaderboard</li>
              </ul>
            </div>
          </CollapsiblePanel>
          <CollapsiblePanel title="Achievements" panelId='achievements'>
            <div className="main-content-box">
              <p>Recently earned: Sharpshooter Badge</p>
            </div>
          </CollapsiblePanel>
          <CollapsiblePanel title="Notifications" panelId='notifications'>
            <div className="main-content-box">
              <p>You have new match invitations!</p>
            </div>
          </CollapsiblePanel>
          <CollapsiblePanel title="Other" panelId='other'>
            <div className="main-content-box">
              <p>You have new match invitations!</p>
            </div>
          </CollapsiblePanel>
          <CollapsiblePanel title="Other2" panelId='other2'>
            <div className="main-content-box">
              <p>You have new match invitations!</p>
            </div>
          </CollapsiblePanel>
        </>
      ) : null}
    </div>
  );
};

export default LeftSideComponent;

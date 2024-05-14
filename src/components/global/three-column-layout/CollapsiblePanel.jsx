import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePanelState } from '../../../redux/slices/userPreferencesSlice';

const CollapsiblePanel = ({ children, title, panelId }) => {
  const dispatch = useDispatch();
  // Select the open state for the panel, defaulting to true if undefined
  const isOpen = useSelector(state => state.preferences.panelStates[panelId] ?? true);

  // Effect to set initial state in Redux if not already set
  useEffect(() => {
    // No need to initialize here as the toggle function in the slice takes care of defaults
  }, [panelId]); // Dependency array simplified

  const handleToggle = () => {
    dispatch(togglePanelState({ panelId }));
  };

  return (
    <div className="collapsible-panel">
      <button className="collapsible-content-button" onClick={handleToggle}>
        {title}
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
      </button>
      {isOpen && (
        <div className="panel-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsiblePanel;

import React from 'react';
import { useSelector } from 'react-redux';
import CollapsiblePanel from './CollapsiblePanel';

const RightSideComponent = () => {
  const isLoggedIn = useSelector(state => Boolean(state.user.token));

  return (
    <div className="right-side-content">
      <CollapsiblePanel title='Live Matches' panelId='live-matches'>
        <div className='main-content-box'>
          <ul>
            <li>Match A vs. B - Live</li>
            <li>Match C vs. D - Starting Soon</li>
          </ul>
        </div>
      </CollapsiblePanel>
      {isLoggedIn ? (
        <CollapsiblePanel title='Sponsor Highlights' panelId='sponsor-highlights'>
          <div className='main-content-box'>
            <p>Special offers from our sponsors!</p>
          </div>
        </CollapsiblePanel>
      ) : (
        <CollapsiblePanel title='Featured Matches' panelId='featured-matches'>
          <div className='main-content-box'>
            <ul>
              <li>Featured Match E vs. F</li>
              <li>Featured Match G vs. H</li>
            </ul>
          </div>
        </CollapsiblePanel>
      )}
    </div>
  );
};

export default RightSideComponent;
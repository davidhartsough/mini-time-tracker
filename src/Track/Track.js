import React from 'react';
import { List, Button } from 'antd';
import ActivityListItem from './ActivityListItem';
import './Track.css';

const Track = props => {
  const {
    activities,
    play,
    pause,
    handleTagChange,
    action,
    actionTitle,
  } = props;
  return (
    <div id="track">
      {!!activities.length && (
        <List
          id="activity-list"
          dataSource={activities}
          renderItem={(activity, index) => (
            <ActivityListItem
              activity={activity}
              index={index}
              play={play}
              pause={pause}
              handleTagChange={handleTagChange}
            />
          )}
        />
      )}
      <Button type="primary" onClick={action} id="primary-action">
        {actionTitle}
      </Button>
    </div>
  );
};

export default Track;

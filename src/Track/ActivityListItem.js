import React, { Component } from 'react';
import { List, Button, Select } from 'antd';
import formatDuration from '../formatDuration';
import './ActivityListItem.css';

class ActivityListItem extends Component {
  handleTagChange = tags => {
    this.props.handleTagChange(tags, this.props.index);
  };
  handleClick = () => {
    if (this.props.activity.active) {
      this.props.pause();
    } else {
      this.props.play(this.props.index);
    }
    document.activeElement.blur();
  };
  render() {
    const { activity } = this.props;
    return (
      <List.Item className={activity.active ? 'active' : ''}>
        <List.Item.Meta
          avatar={
            <Button
              shape="circle"
              icon={activity.active ? 'pause-circle-o' : 'play-circle-o'}
              onClick={this.handleClick}
            />
          }
          title={
            <Select
              mode="tags"
              notFoundContent={null}
              tokenSeparators={[',']}
              value={activity.tags}
              autoFocus={activity.active}
              onChange={this.handleTagChange}
              placeholder="Add tags"
            >
              {activity.tags.map(tag => (
                <Select.Option key={tag}>{tag}</Select.Option>
              ))}
            </Select>
          }
        />
        <div className="duration">
          {activity.duration ? formatDuration(activity.duration) : '0s'}
        </div>
      </List.Item>
    );
  }
}

export default ActivityListItem;

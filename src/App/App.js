import React, { Component } from 'react';
import { Tabs } from 'antd';
import Track from '../Track';
import Review from '../Review';
import formatDuration from '../formatDuration';
import './App.css';

const createNewActivity = () => {
  return {
    duration: 0,
    tags: [],
    active: true,
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTime: 0,
      currentActivityIndex: null,
      activities: [],
    };
    this.timer = null;
  }

  startTimer = () => {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.state.currentActivityIndex !== null) {
        const totalTime = 1 + this.state.totalTime;
        const activities = this.state.activities.slice();
        activities[this.state.currentActivityIndex].duration++;
        this.setState({
          totalTime,
          activities,
        });
      }
    }, 1000);
  };

  start = () => {
    const activities = this.state.activities.slice();
    const currentActivityIndex = activities.length;
    activities.push(createNewActivity());
    this.setState({
      activities,
      currentActivityIndex,
    });
    this.startTimer();
  };

  startNew = () => {
    const activities = this.state.activities.slice();
    if (this.state.currentActivityIndex !== null) {
      activities[this.state.currentActivityIndex].active = false;
    }
    const currentActivityIndex = activities.length;
    activities.push(createNewActivity());
    this.setState({
      activities,
      currentActivityIndex,
    });
    this.startTimer();
  };

  pause = () => {
    clearInterval(this.timer);
    const activities = this.state.activities.slice();
    if (this.state.currentActivityIndex !== null) {
      activities[this.state.currentActivityIndex].active = false;
    }
    this.setState({
      activities,
      currentActivityIndex: null,
    });
  };

  play = activityIndex => {
    clearInterval(this.timer);
    const activities = this.state.activities.slice();
    if (this.state.currentActivityIndex !== null) {
      activities[this.state.currentActivityIndex].active = false;
    }
    activities[activityIndex].active = true;
    this.setState({
      activities,
      currentActivityIndex: activityIndex,
    });
    this.startTimer();
  };

  handleTagChange = (tags, activityIndex) => {
    const activities = this.state.activities.slice();
    activities[activityIndex].tags = tags;
    this.setState({
      activities,
    });
  };

  render() {
    const { totalTime, activities } = this.state;
    const action = !!activities.length ? this.startNew : this.start;
    const actionTitle = !!activities.length ? 'New' : 'Start';
    return (
      <div id="dh-mini-app">
        <div id="today-header">
          <div id="today-title">Today</div>
          <div id="today-total">{formatDuration(totalTime)}</div>
        </div>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Track" key="1">
            <Track
              activities={activities}
              play={this.play}
              pause={this.pause}
              handleTagChange={this.handleTagChange}
              action={action}
              actionTitle={actionTitle}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Review" key="2">
            <Review activities={activities} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}

export default App;

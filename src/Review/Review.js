import React from 'react';
import { Table } from 'antd';
import formatDuration from '../formatDuration';
import './Review.css';

const getTagData = activities => {
  const tagData = [];
  for (const activity of activities) {
    activity.tags.forEach(tag => {
      const index = tagData.findIndex(item => item.tag === tag);
      if (index === -1) {
        tagData.push({
          key: tag,
          tag,
          duration: activity.duration,
          activities: [activity],
        });
      } else {
        tagData[index].duration += activity.duration;
        tagData[index].activities.push(activity);
      }
    });
  }
  return tagData;
};

const strip = string => string.toLowerCase().replace(/ /g, '');

const tagColumns = [
  {
    title: 'Tag',
    dataIndex: 'tag',
    key: 'tag',
    sorter: (a, b) => strip(a.tag).localeCompare(strip(b.tag)),
    defaultSortOrder: 'ascend',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
    sorter: (a, b) => a.duration - b.duration,
    align: 'right',
    width: 112,
    render: text => formatDuration(text),
  },
];

const Review = ({ activities }) => {
  return (
    <Table
      id="review"
      columns={tagColumns}
      dataSource={getTagData(activities)}
      pagination={false}
      size="middle"
      indentSize={0}
      locale={{
        filterConfirm: 'Ok',
        filterReset: 'Reset',
        emptyText: 'No tagged time to review',
      }}
    />
  );
};

export default Review;

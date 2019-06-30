import React from 'react';
import ArticleList from '../ArticleList';
import TabList from '../common/TabList';
import { ITab } from '../../reducers/articleList';

export default function MainView() {
  const tabsData: Array<ITab> = [
    { type: 'FEED', label: 'Your Feed' },
    { type: 'ALL', label: 'Global Feed' },
  ];

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <TabList data={tabsData} />
      </div>
      <ArticleList />
    </div>
  );
}

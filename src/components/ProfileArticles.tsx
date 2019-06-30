import React from 'react';
import { ITab } from '../reducers/articleList';
import { ArticlesProvider } from '../context/articles';
import TabList from './common/TabList';
import ArticleList from './ArticleList';

function ProfileArticles({ username }: { username: string }) {
  const tabsData: Array<ITab> = [
    { type: 'AUTHORED', label: 'My Articles', username },
    {
      type: 'FAVORITES',
      label: 'Favorited Articles',
      username,
    },
    { type: 'ALL', label: 'Global Feed' },
  ];

  return (
    <ArticlesProvider>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <TabList data={tabsData} />
            </div>
            <ArticleList />
          </div>
        </div>
      </div>
    </ArticlesProvider>
  );
}

export default React.memo(ProfileArticles);

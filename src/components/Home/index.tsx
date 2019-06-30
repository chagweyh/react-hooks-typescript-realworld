import React from 'react';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';
import { ArticlesProvider } from '../../context/articles';
import { RouteComponentProps } from '@reach/router';

export default function Home(_: RouteComponentProps) {
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <ArticlesProvider>
            <MainView />
            <Tags />
          </ArticlesProvider>
        </div>
      </div>
    </div>
  );
}

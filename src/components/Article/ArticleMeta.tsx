import React from 'react';
import ArticleActions from './ArticleActions';
import { IArticle } from '../../types';
import { ArticleAction } from '../../reducers/article';
import ArticleAvatar from '../common/ArticleAvatar';

type ArticleMetaProps = {
  article: IArticle;
  dispatch: React.Dispatch<ArticleAction>;
};

function ArticleMeta({ article, dispatch }: ArticleMetaProps) {
  return (
    <div className="article-meta">
      <ArticleAvatar article={article} />
      <ArticleActions article={article} dispatch={dispatch} />
    </div>
  );
}

export default React.memo(ArticleMeta);

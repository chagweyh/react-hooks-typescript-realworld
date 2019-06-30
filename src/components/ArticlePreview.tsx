import React from 'react';
import { Link } from '@reach/router';
import ArticleAvatar from './common/ArticleAvatar';
import ArticleTags from './common/ArticleTags';
import FavoriteButton from './common/FavoriteButton';
import { IArticle } from '../types';
import { ArticleListAction } from '../reducers/articleList';

type ArticlePreviewProps = {
  article: IArticle;
  dispatch: React.Dispatch<ArticleListAction>;
};

export default function ArticlePreview({
  article,
  dispatch,
}: ArticlePreviewProps) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <ArticleAvatar article={article} />
        <div className="pull-xs-right">
          <FavoriteButton article={article} dispatch={dispatch}>
            {article.favoritesCount}
          </FavoriteButton>
        </div>
      </div>

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ArticleTags tagList={article.tagList} />
      </Link>
    </div>
  );
}

import React from 'react';
import { IArticle } from '../../types';
import { ArticleAction } from '../../reducers/article';
import { ArticleListAction } from '../../reducers/articleList';
import { favoriteArticle, unfavoriteArticle } from '../../api/ArticlesAPI';

type FavoriteButtonProps = {
  article: IArticle;
  dispatch: React.Dispatch<ArticleAction & ArticleListAction>;
  children: React.ReactNode;
};

export default function FavoriteButton({
  article,
  dispatch,
  children,
}: FavoriteButtonProps) {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    if (article.favorited) {
      const payload = await unfavoriteArticle(article.slug);
      dispatch({
        type: 'ARTICLE_UNFAVORITED',
        payload: payload.data,
      });
    } else {
      const payload = await favoriteArticle(article.slug);
      dispatch({
        type: 'ARTICLE_FAVORITED',
        payload: payload.data,
      });
    }
    setLoading(false);
  };

  const classNames = ['btn', 'btn-sm'];

  if (article.favorited) {
    classNames.push('btn-primary');
  } else {
    classNames.push('btn-outline-primary');
  }

  return (
    <button
      className={classNames.join(' ')}
      onClick={handleClick}
      disabled={loading}
    >
      <i className="ion-heart" />
      &nbsp;
      {children}
    </button>
  );
}

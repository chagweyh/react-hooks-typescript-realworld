import React from 'react';
import { Link } from '@reach/router';
import { followProfile, unfollowProfile } from '../../api/ProfileAPI';
import { IArticle } from '../../types';
import { ArticleAction } from '../../reducers/article';
import DeleteButton from './DeleteButton';
import FollowUserButton from '../common/FollowUserButton';
import FavoriteButton from '../common/FavoriteButton';
import useAuth from '../../context/auth';

type ArticleActionsProps = {
  article: IArticle;
  dispatch: React.Dispatch<ArticleAction>;
};

export default function ArticleActions({
  article,
  dispatch,
}: ArticleActionsProps) {
  const [loading, setLoading] = React.useState(false);
  const {
    state: { user },
  } = useAuth();

  const canModifyArticle = user && user.username === article.author.username;

  const handleFollowButtonClick = async () => {
    setLoading(true);
    if (article.author.following) {
      await followProfile(article.author.username);
      dispatch({ type: 'UNFOLLOW_AUTHOR' });
    } else {
      await unfollowProfile(article.author.username);
      dispatch({ type: 'FOLLOW_AUTHOR' });
    }
    setLoading(false);
  };

  return canModifyArticle ? (
    <React.Fragment>
      <Link
        to={`/editor/${article.slug}`}
        className="btn btn-outline-secondary btn-sm"
      >
        <i className="ion-edit" /> Edit Article
      </Link>
      <DeleteButton article={article} />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <FollowUserButton
        onClick={handleFollowButtonClick}
        profile={article.author}
        loading={loading}
      />
      <FavoriteButton article={article} dispatch={dispatch}>
        {article.favorited ? 'Unfavorite Article' : 'Favorite Article'}
        <span className="counter">({article.favoritesCount})</span>
      </FavoriteButton>
    </React.Fragment>
  );
}

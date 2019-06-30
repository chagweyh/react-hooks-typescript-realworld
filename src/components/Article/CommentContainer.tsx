import React from 'react';
import { Link } from '@reach/router';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { IComment } from '../../types';
import { ArticleAction } from '../../reducers/article';
import useAuth from '../../context/auth';

type CommentContainerProps = {
  comments: Array<IComment>;
  slug: string;
  dispatch: React.Dispatch<ArticleAction>;
};

function CommentContainer({ comments, slug, dispatch }: CommentContainerProps) {
  const {
    state: { user },
  } = useAuth();

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        {user ? (
          <CommentInput user={user} slug={slug} dispatch={dispatch} />
        ) : (
          <p>
            <Link to="/login">Sign in</Link>
            &nbsp;or&nbsp;
            <Link to="/register">Sign up</Link>
            &nbsp;to add comments on this article.
          </p>
        )}

        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            slug={slug}
            user={user}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(CommentContainer);

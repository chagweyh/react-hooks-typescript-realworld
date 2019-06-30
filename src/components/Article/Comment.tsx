import React from 'react';
import { Link } from '@reach/router';
import { IComment, IUser } from '../../types';
import { ArticleAction } from '../../reducers/article';
import { deleteComment } from '../../api/CommentsAPI';

type CommentProps = {
  comment: IComment;
  slug: string;
  user: IUser | null;
  dispatch: React.Dispatch<ArticleAction>;
};

function Comment({ comment, slug, user, dispatch }: CommentProps) {
  const showDeleteButton = user && user.username === comment.author.username;

  const handleDelete = async () => {
    try {
      await deleteComment(slug, comment.id);
      dispatch({ type: 'DELETE_COMMENT', commentId: comment.id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/@${comment.author.username}`} className="comment-author">
          <img
            src={comment.author.image}
            className="comment-author-img"
            alt={comment.author.username}
          />
          &nbsp;
          {comment.author.username}
        </Link>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        {showDeleteButton && (
          <span className="mod-options">
            <i className="ion-trash-a" onClick={handleDelete} />
          </span>
        )}
      </div>
    </div>
  );
}

export default Comment;

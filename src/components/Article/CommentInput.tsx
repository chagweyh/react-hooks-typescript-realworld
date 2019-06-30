import React from 'react';
import { IUser } from '../../types';
import { ArticleAction } from '../../reducers/article';
import { createComment } from '../../api/CommentsAPI';

type CommentInputProps = {
  user: IUser;
  slug: string;
  dispatch: React.Dispatch<ArticleAction>;
};

export default function CommentInput({
  user,
  slug,
  dispatch,
}: CommentInputProps) {
  const [body, setBody] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = await createComment(slug, { body });
      dispatch({ type: 'ADD_COMMENT', payload: payload.data });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setBody('');
  };

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={3}
        />
      </div>
      <div className="card-footer">
        <img
          src={user.image}
          className="comment-author-img"
          alt={user.username}
        />
        <button
          className="btn btn-sm btn-primary"
          type="submit"
          disabled={loading}
        >
          Post Comment
        </button>
      </div>
    </form>
  );
}

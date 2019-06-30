import React from 'react';
import { Link } from '@reach/router';
import { IArticle } from '../../types';
import { ALT_IMAGE_URL } from '../../utils';

type ArticleAvatarProps = {
  article: IArticle;
};

export default function ArticleAvatar({
  article: { author, createdAt },
}: ArticleAvatarProps) {
  return (
    <React.Fragment>
      <Link to={`/${author.username}`}>
        <img src={author.image || ALT_IMAGE_URL} alt={author.username} />
      </Link>

      <div className="info">
        <Link className="author" to={`/${author.username}`}>
          {author.username}
        </Link>
        <span className="date">{new Date(createdAt).toDateString()}</span>
      </div>
    </React.Fragment>
  );
}

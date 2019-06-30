import React from 'react';
import { navigate } from '@reach/router';
import { IArticle } from '../../types';
import { deleteArticle } from '../../api/ArticlesAPI';

export default function DeleteButton({ article }: { article: IArticle }) {
  const handleDelete = async () => {
    try {
      await deleteArticle(article.slug);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
      <i className="ion-trash-a" /> Delete Article
    </button>
  );
}

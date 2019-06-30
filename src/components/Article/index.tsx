import React from 'react';
import marked from 'marked';
import ArticleMeta from './ArticleMeta';
import ArticleTags from '../common/ArticleTags';
import CommentContainer from './CommentContainer';
import { RouteComponentProps } from '@reach/router';
import { articleReducer, initialState } from '../../reducers/article';
import { getArticleComments } from '../../api/CommentsAPI';
import { getArticle } from '../../api/ArticlesAPI';

export default function Article({
  slug = '',
}: RouteComponentProps<{ slug: string }>) {
  const [{ article, comments, loading, error }, dispatch] = React.useReducer(
    articleReducer,
    initialState,
  );

  React.useEffect(() => {
    dispatch({ type: 'FETCH_ARTICLE_BEGIN' });
    let ignore = false;

    const fetchArticle = async () => {
      try {
        const [articlePayload, commentsPayload] = await Promise.all([
          getArticle(slug),
          getArticleComments(slug),
        ]);
        if (!ignore) {
          dispatch({
            type: 'FETCH_ARTICLE_SUCCESS',
            payload: {
              article: articlePayload.data.article,
              comments: commentsPayload.data.comments,
            },
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: 'FETCH_ARTICLE_ERROR',
          error,
        });
      }
    };

    fetchArticle();
    return () => {
      ignore = true;
    };
  }, [dispatch, slug]);

  const convertToMarkdown = (text: string) => ({
    __html: marked(text, { sanitize: true }),
  });

  return (
    article && (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>
            <ArticleMeta article={article} dispatch={dispatch} />
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p dangerouslySetInnerHTML={convertToMarkdown(article.body)} />
              <ArticleTags tagList={article.tagList} />
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <ArticleMeta article={article} dispatch={dispatch} />
          </div>

          <CommentContainer
            comments={comments}
            slug={slug}
            dispatch={dispatch}
          />
        </div>
      </div>
    )
  );
}

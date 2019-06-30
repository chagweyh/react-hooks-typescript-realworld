import React from 'react';
import {
  articlesReducer,
  initialState,
  ArticleListAction,
  ArticleListState,
} from '../reducers/articleList';

type ArticleListContextProps = {
  state: ArticleListState;
  dispatch: React.Dispatch<ArticleListAction>;
};

const ArticlesContext = React.createContext<ArticleListContextProps>({
  state: initialState,
  dispatch: () => initialState,
});

export function ArticlesProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer(articlesReducer, initialState);
  return <ArticlesContext.Provider value={{ state, dispatch }} {...props} />;
}

export default function useArticles() {
  const context = React.useContext(ArticlesContext);
  if (!context) {
    throw new Error(`useArticles must be used within an ArticlesProvider`);
  }
  return context;
}

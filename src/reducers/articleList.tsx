import { IArticle } from '../types';

export type ArticleListAction =
  | { type: 'FETCH_ARTICLES_BEGIN' }
  | {
      type: 'FETCH_ARTICLES_SUCCESS';
      payload: { articles: Array<IArticle>; articlesCount: number };
    }
  | { type: 'FETCH_ARTICLES_ERROR'; error: string }
  | { type: 'ARTICLE_FAVORITED'; payload: { article: IArticle } }
  | { type: 'ARTICLE_UNFAVORITED'; payload: { article: IArticle } }
  | { type: 'SET_TAB'; tab: ITab }
  | { type: 'SET_PAGE'; page: number };

export type ITab =
  | { type: 'ALL'; label: string }
  | { type: 'FEED'; label: string }
  | { type: 'TAG'; label: string }
  | { type: 'AUTHORED'; label: string; username: string }
  | { type: 'FAVORITES'; label: string; username: string };

export interface ArticleListState {
  articles: Array<IArticle>;
  loading: boolean;
  error: string | null;
  articlesCount: number;
  selectedTab: ITab;
  page: number;
}

export const initialState: ArticleListState = {
  articles: [],
  loading: false,
  error: null,
  articlesCount: 0,
  selectedTab: { type: 'ALL', label: 'Global Feed' },
  page: 0,
};

export function articlesReducer(
  state: ArticleListState,
  action: ArticleListAction,
): ArticleListState {
  switch (action.type) {
    case 'FETCH_ARTICLES_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_ARTICLES_SUCCESS':
      return {
        ...state,
        loading: false,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
      };
    case 'FETCH_ARTICLES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
        articles: [],
      };
    case 'ARTICLE_FAVORITED':
    case 'ARTICLE_UNFAVORITED':
      return {
        ...state,
        articles: state.articles.map((article) =>
          article.slug === action.payload.article.slug
            ? {
                ...article,
                favorited: action.payload.article.favorited,
                favoritesCount: action.payload.article.favoritesCount,
              }
            : article,
        ),
      };
    case 'SET_TAB':
      return {
        ...state,
        selectedTab: action.tab,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
}

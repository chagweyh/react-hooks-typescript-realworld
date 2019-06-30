import API from './APIUtils';
import { IArticle } from '../types';

const encode = encodeURIComponent;

type Articles = {
  articles: Array<IArticle>;
} & {
  articlesCount: number;
};

type Article = {
  article: IArticle;
};

function limit(count: number, p: number) {
  return `limit=${count}&offset=${p ? p * count : 0}`;
}

function omitSlug(article: {
  slug: string;
  title?: string;
  description?: string;
  body?: string;
}) {
  return Object.assign({}, article, { slug: undefined });
}

export function getArticles(page: number) {
  return API.get<Articles>(`/articles?${limit(10, page)}`);
}

export function getArticlesByAuthor(username: string, page: number) {
  return API.get<Articles>(
    `/articles?author=${encode(username)}&${limit(5, page)}`,
  );
}

export function getArticlesByTag(tag: string, page: number) {
  return API.get<Articles>(`/articles?tag=${encode(tag)}&${limit(10, page)}`);
}

export function deleteArticle(slug: string) {
  return API.delete<null>(`/articles/${slug}`);
}

export function favoriteArticle(slug: string) {
  return API.post<Article>(`/articles/${slug}/favorite`);
}

export function getArticlesFavoritedBy(username: string, page: number) {
  return API.get<Articles>(
    `/articles?favorited=${encode(username)}&${limit(5, page)}`,
  );
}

export function getFeedArticles() {
  return API.get<Articles>('/articles/feed?limit=10&offset=0');
}

export function getArticle(slug: string) {
  return API.get<Article>(`/articles/${slug}`);
}

export function unfavoriteArticle(slug: string) {
  return API.delete<Article>(`/articles/${slug}/favorite`);
}
export function updateArticle(article: {
  slug: string;
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
}) {
  return API.put<Article>(`/articles/${article.slug}`, {
    article: omitSlug(article),
  });
}

export function createArticle(article: {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}) {
  return API.post<Article>('/articles', { article });
}

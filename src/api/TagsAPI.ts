import API from './APIUtils';

type Tags = {
  tags: string[];
};

export function getTags() {
  return API.get<Tags>('/tags');
}

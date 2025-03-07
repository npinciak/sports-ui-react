import { IClientArticleType } from './article-type.model';

export interface IClientPlayerNewsFeed {
  timestamp: string;
  resultsOffset: number;
  status: string;
  resultsLimit: number;
  resultsCount: number;
  feed: IClientPlayerNewsFeedEntity[];
}

export interface IClientPlayerNewsFeedEntity {
  id: number;
  lastModified: string;
  headline: string;
  story: string;
  published: string;
  type: IClientArticleType;
  byline?: string | null;
  images?: IClientPlayerNewsFeedImage[] | null;
  links: {
    mobile?: {
      href: string;
    };
    web?: {
      href: string;
    };
  };
}

export interface IClientPlayerNewsFeedImage {
  name: string;
  width: number;
  alt?: string | null;
  caption?: string | null;
  id: number;
  credit: string;
  type: string;
  url: string;
  height: number;
}

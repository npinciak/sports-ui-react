import { IClientArticleType } from '@sdk/espn-client-models/article-type.model';

export interface FantasyPlayerNewsEntity {
  id: string;
  headline: string | null;
  story: string | null;
  byline: string | null;
  image: string | null;
  link: string | null;
  type: IClientArticleType;
}

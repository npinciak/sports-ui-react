export const ARTICLE_TYPE = {
  Default: 'Default',
  Rotowire: 'Rotowire',
  Story: 'Story',
  Media: 'Media',
} as const;

export type IClientArticleType = (typeof ARTICLE_TYPE)[keyof typeof ARTICLE_TYPE];

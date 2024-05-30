export const FangraphsClientTag = {
  FangraphsProjections: 'FangraphsProjections',
  FangraphsStats: 'FangraphsStats',
  FangraphsConstants: 'FangraphsConstants',
} as const;

export const FangraphsClientTagList = [
  FangraphsClientTag.FangraphsProjections,
  FangraphsClientTag.FangraphsStats,
  FangraphsClientTag.FangraphsConstants,
];

export const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_PAGE_NUMBER = 1;

export const DEFAULT_META_DATA = {
  pageitems: DEFAULT_PAGE_SIZE,
  pagenum: DEFAULT_PAGE_NUMBER,
};

const buildQueryString = (query: {
  readonly [key: string]: string | undefined;
  readonly hl?: string;
  readonly gl?: string;
  readonly ceid?: string;
}): string => {
  if (!query || typeof query !== 'object' || Object.keys(query).length === 0) {
    return '';
  }
  return Object.keys(query)
    .map((key) => {
      const value: string | undefined = query[key];
      return `${key}=${value}`;
    })
    .join('&');
};

export { buildQueryString };

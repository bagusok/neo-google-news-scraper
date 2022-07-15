declare const buildQueryString: (query: {
  readonly hl?: string;
  readonly gl?: string;
  readonly ceid?: string;
}) => string;
export { buildQueryString };

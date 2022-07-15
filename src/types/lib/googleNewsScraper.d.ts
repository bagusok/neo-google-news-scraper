declare const googleNewsScraper: (config: {
  readonly searchTerm: string;
  readonly shouldFetchPrettyUrls?: boolean;
  readonly shouldFetchOGData?: boolean;
  readonly queryVars?: {
    readonly hl?: string;
    readonly gl?: string;
    readonly ceid?: string;
  };
  readonly timeFrame?: string;
}) => Promise<
  ReadonlyArray<{
    readonly title: string;
    readonly link: string;
    readonly image: string;
    readonly source: string;
    readonly datetime: string | Date;
    readonly time: string;
    readonly prettyUrl?: string;
    readonly ogData?: {
      readonly link: string;
      readonly image: string;
      readonly description: string;
    };
  }>
>;
export { googleNewsScraper };

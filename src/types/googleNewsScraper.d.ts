declare module 'neo-google-news-scraper' {
  export type QueryVarsArgs = {
    readonly hl?: string;
    readonly gl?: string;
    readonly ceid?: string;
  };

  export type GoogleNewsScraperConfig = {
    readonly searchTerm: string;
    readonly shouldFetchPrettyUrls?: boolean;
    readonly shouldFetchOGData?: boolean;
    readonly queryVars?: QueryVarsArgs;
    readonly timeFrame?: string;
  };

  export type OGDataType = {
    readonly link: string;
    readonly image: string;
  };

  export type NeoGoogleNewsScraperResult = {
    readonly title: string;
    readonly link: string;
    readonly image: string;
    readonly source: string;
    readonly datetime: string | Date;
    readonly time: string;
    readonly prettyUrl?: string;
    readonly ogData?: OGDataType;
  };
}

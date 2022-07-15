export declare const fetchPrettyUrlForLink: (
  sourceUrl: string
) => Promise<string>;
export declare const fetchPrettyUrl: (
  articles: ReadonlyArray<{
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
) => Promise<
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

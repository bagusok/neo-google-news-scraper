export declare const fetchOGDataForLink: (sourceUrl: string) => Promise<{
  readonly link: string;
  readonly image: string;
}>;
export declare const fetchOGData: (
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
    };
  }>
>;

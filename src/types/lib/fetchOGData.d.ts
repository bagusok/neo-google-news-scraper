import { NeoGoogleNewsScraperResult } from '../../types/googleNewsScraperTypes';
export declare const fetchOGDataForLink: (sourceUrl: string) => Promise<{
  readonly link: string;
  readonly image: string;
}>;
export declare const fetchOGData: (
  articles: ReadonlyArray<NeoGoogleNewsScraperResult>
) => Promise<ReadonlyArray<NeoGoogleNewsScraperResult>>;

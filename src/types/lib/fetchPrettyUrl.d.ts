import { NeoGoogleNewsScraperResult } from '../../types/googleNewsScraperTypes';
export declare const fetchPrettyUrlForLink: (
  sourceUrl: string
) => Promise<string>;
export declare const fetchPrettyUrl: (
  articles: ReadonlyArray<NeoGoogleNewsScraperResult>
) => Promise<ReadonlyArray<NeoGoogleNewsScraperResult>>;

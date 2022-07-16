/* eslint-disable functional/prefer-readonly-type */
import axios from 'axios';
import { load } from 'cheerio';

export const fetchPrettyUrlForLink = async (sourceUrl: string) => {
  try {
    const response = await axios.get(sourceUrl, {
      maxRedirects: 5,
      timeout: 5000,
    });
    if (response.data) {
      // Get pretty link
      const $ = load(response.data);
      const prettyLink = $("a[rel='nofollow']").attr('href');
      if (prettyLink) {
        return prettyLink;
      }
    }
  } catch (error: unknown) {
    console.error('ERROR: fetchPrettyUrlForLink', sourceUrl);
    if (axios.isAxiosError(error)) {
      // Access to config, request, and response
      console.error(error.message);
    } else {
      // Just a stock error
      console.error(error);
    }
  }
  return '';
};

export const fetchPrettyUrl = async (
  articles: Array<{
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
): Promise<
  Array<{
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
> => {
  const articleWithMetaDataPromises = await Promise.allSettled(
    articles.map(async (article) => ({
      ...article,
      prettyUrl: await fetchPrettyUrlForLink(article.link),
    }))
  );
  const articleWithMetaDataList = articleWithMetaDataPromises.map(
    (articleWithMetaDataPromise) =>
      articleWithMetaDataPromise.status === 'fulfilled'
        ? articleWithMetaDataPromise.value
        : {
            title: '',
            link: '',
            image: '',
            source: '',
            datetime: new Date(),
            time: '',
            prettyUrl: '',
          }
  );
  return articleWithMetaDataList;
};

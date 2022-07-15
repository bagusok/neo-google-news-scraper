/* eslint-disable functional/prefer-readonly-type */
import axios from 'axios';
import { load } from 'cheerio';

export const fetchPrettyUrlForLink = async (sourceUrl: string) => {
  try {
    const response = await axios.get(sourceUrl);
    if (response.data) {
      // Get pretty link
      const $ = load(response.data);
      const prettyLink = $("a[rel='nofollow']").attr('href');
      if (prettyLink) {
        return prettyLink;
      }
    }
  } catch (error) {
    console.error('ERROR: fetchPrettyUrlForLink', sourceUrl);
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

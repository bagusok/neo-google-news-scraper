/* eslint-disable functional/prefer-readonly-type */
import axios from 'axios';
import { load } from 'cheerio';
import { NeoGoogleNewsScraperResult } from 'neo-scraper-google-news';

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
  articles: Array<NeoGoogleNewsScraperResult>
): Promise<Array<NeoGoogleNewsScraperResult>> => {
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

# Google News Scraper in Typescript

A lightweight typescript package that scrapes article data from Google News. Simply pass a keyword or phrase, and the results are returned as an array of JSON objects.

- [Installation](#installation)
- [Usage](#usage)
- [Output](#output)
- [Contribute](#contribute)
- [Issues](#issues)

## Installation

```bash
# Install via NPM
npm i neo-scraper-google-news

# Install via Yarn
yarn add neo-scraper-google-news
```

## Usage

```javascript
// Require the package
import { googleNewsScraper } from 'neo-scraper-google-news';

// Execute within an async function, pass a config object (further documentation below)
const articles = await googleNewsScraper({
  searchTerm: 'The Oscars',
  shouldFetchPrettyUrls: false,
  shouldFetchOGData: true,
  queryVars: {
    hl: 'en-US',
    gl: 'US',
    ceid: 'US:en',
  },
  timeframe: '7d',
});
```

## Output

The output is an array of JSON objects, with each article following the structure below:

```json
[
  {
    "title": "Article title",
    "subtitle": "Article subtitle",
    "link": "http://url-to-website.com/path/to/article",
    "image": "http://url-to-website.com/path/to/image.jpg",
    "source": "Name of publication",
    "time": "Time/date published (human-readable)"
  }
]
```

## Upkeep

Please note that this is a web-scraper, which relies on DOM selectors, so any fundamental changes in the markup on the Google News site will probably break this tool. I'll try my best to keep it up-to-date, but changes to the markup on Google News will be silent and therefore difficult to keep track of. Feel free to submit an issue if the tool stops working.

## Issues

Please report bugs via the [issue tracker](https://github.com/adarshsingh1407/neo-google-news-scraper/issues).

## Contribute

Feel free to [submit a PR](https://github.com/adarshsingh1407/neo-google-news-scraper/pulls) if you've fixed an open issue. Thank you.

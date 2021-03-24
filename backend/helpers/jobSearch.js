const states = require('./states');
const axios = require('axios');
const jsdom = require('jsdom');
const $ = require('jquery')(new jsdom.JSDOM().window);

async function findDescription(link) {
  const description = [];

  const res = await axios.get(link)
    .catch(err => {
      console.error(err);
    });

  try {
    const page = $(res.data);
    const raw = page.find('div.show-more-less-html__markup.show-more-less-html__markup--clamp-after-5');

    for (let child of raw.children()) {
      description.push($(child).text());
    }

    return description;
  }
  catch (err) {
    return [];
  }
}

async function parseJobCard(card) {
  const title = card.find('h3.result-card__title.job-result-card__title').text();
  const company = card.find('a.result-card__subtitle-link.job-result-card__subtitle-link').text();
  const location = card.find('span.job-result-card__location').text();
  const link = card.find('a.result-card__full-card-link').attr('href');
  const description = await findDescription(link);

  return {
    title, company, location, link, description
  }
}

async function parseHTML(response) {
  const pageJobs = []
  const html = $(response.data);
  const jobCards = html.find('.result-card');

  for (let card of jobCards) {
    const job = parseJobCard($(card));
    pageJobs.push(job);
  }
  return await Promise.all(pageJobs);
}

async function findJobs(term, city, stateCode, exp, numResults) {
  const state = states.find(state => state.code === stateCode).name;
  const BASE_URL = 'https://www.linkedin.com/jobs/search'
  const jobs = []
  const pages = []

  for (let start = 0; start < numResults; start += 25) {
    const url = `${BASE_URL}/?f_E=${exp}&keywords=${term}&location=${city} ${state} United States&start=${start}`
    const response = await axios.get(url);
    pages.push(parseHTML(response));
  }
  const resolved = [...await Promise.all(pages)];

  for (let page of resolved) {
    jobs.push(...page);
  }

  return jobs
}

module.exports = findJobs;
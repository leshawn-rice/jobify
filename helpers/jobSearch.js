const states = require('./states');
const axios = require('axios');
const jsdom = require('jsdom');
const $ = require('jquery')(new jsdom.JSDOM().window);

async function findDescription(link) {
  const res = await axios.get(link);

  const page = $(res.data);

  const raw = page.find('div.show-more-less-html__markup.show-more-less-html__markup--clamp-after-5');

  const description = raw.text().trim();
  return description;
}

async function parseJobCard(card) {

  // Need to get a description

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
    const job = await parseJobCard($(card));
    pageJobs.push(job);
  }
  return pageJobs;
}

async function findJobs(term, city, stateCode, exp, numResults) {
  const state = states.find(state => state.code === stateCode).name;
  const BASE_URL = 'https://www.linkedin.com/jobs/search'
  const jobs = []

  let start = 0;

  while (start < numResults) {
    const url = `${BASE_URL}/?f_E=${exp}&keywords=${term}&location=${city} ${state} United States&start=${start}`
    const response = await axios.get(url);

    const pageOfJobs = await parseHTML(response);

    jobs.push(...pageOfJobs);

    start += 25;
  }
  return jobs
}

module.exports = findJobs;
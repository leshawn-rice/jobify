import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  // static token;

  static async request(endpoint, token = undefined, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle, token) {
    let res = await this.request(`companies/${handle}`, token);
    return res.company;
  }

  static async getCompanies(token) {
    let res = await this.request(`companies/`, token);
    return res.companies;
  }

  static async searchCompanies(query, token) {
    let res = await this.request(`companies?name=${query}`, token)
    return res.companies
  }

  static async getJobs(token) {
    let res = await this.request('jobs/', token);
    return res.jobs;
  }

  static async applyToJob(token, username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, token, {}, 'post');
    return res.applied;
  }

  static async getUser(token, username) {
    let res = await this.request(`users/${username}`, token);
    return res.user;
  }

  static async patchUser(token, username, userData) {
    let res = await this.request(`users/${username}`, token, userData, 'patch');
    return res.user;
  }

  static async login(loginData) {
    let res = await this.request('auth/token', undefined, loginData, 'post');
    return res.token;
  }

  static async register(registerData) {
    let res = await this.request('auth/register', undefined, registerData, 'post');
    return res.token;
  }

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi;
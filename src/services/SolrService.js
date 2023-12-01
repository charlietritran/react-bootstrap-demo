import axios from "axios";
import * as contants from "../common/Constants";

class SolrService {
  constructor() {}

  /**
   *
   * GET PERSON
   * RETURN: json data
   * @param {*} url
   */
  async getDocuments() {
    console.log("GET DOCUMENTS SERVICE STARTS - URL:" + contants.BASE_URL);

    try {
      let res = await axios.get(
        contants.BASE_URL +
          "/solr/historySearch/select?indent=true&q.op=OR&q=*%3A*"
      );
      return res;
    } catch (error) {
      console.log("Get DOCUMENTS ERROR:" + error.message);
      throw error;
    }
  }
}

export default SolrService;

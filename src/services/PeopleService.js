import axios from "axios";
import * as http from "./HttpService";

class PeopleService {
  constructor() {}

  /**
   * SAVE PERSON
   * RETURN:
   * @param {*} person
   */
  async savePerson(person) {
    console.log("@@@ =>>> SAVE PERSON SERVICE STARTS - URL:" + http.BASE_URL);
    console.log(
      "@@@ =>>> SAVE PERSON SERVICE JSON - URL:" + JSON.stringify(person)
    );

    try {
      let res = await axios({
        method: "post", //put
        url: http.BASE_URL,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(person),
      });
      return res;
    } catch (error) {
      console.log("SAVE PERSON ERROR:" + error.message);

      throw error;
    } finally {
      console.log("DONE SAVE PERSON");
    }
  }

  /**
   * SAVE PERSON
   * RETURN:
   * @param {*} person
   */
  async savePersonMultipart(person, files) {
    console.log("@@@ =>>> SAVE PERSON SERVICE STARTS - URL:" + http.BASE_URL);
    console.log(
      "@@@ =>>> SAVE PERSON SERVICE JSON - URL:" + JSON.stringify(person)
    );

    try {
      // Form Data
      const formData = new FormData();

      // files
      files.map((file) => {
        formData.append("documents", file);
      });

      // person fields
      formData.append("firstname", person.firstname);
      formData.append("lastname", person.lastname);
      formData.append("gender", person.gender);
      formData.append("birthdate", person.birthdate);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      let res = await axios({
        method: "post", //put
        url: http.BASE_URL + "/api/person/multipart",
        headers: { "content-type": "multipart/form-data" },
        data: formData,
      });

      return res;
    } catch (error) {
      console.log("SAVE PERSON ERROR:" + error.message);

      throw error;
    } finally {
      console.log("DONE SAVE PERSON WITH FILES ");
    }
  }

  /**
   * UPDATE PERSON
   * RETURN:
   * @param {*} person
   */
  async updatePersonMultipart(person, files) {
    console.log("@@@ =>>> UPDATE PERSON SERVICE STARTS - URL:" + http.BASE_URL);
    console.log(
      "@@@ =>>> UPDATE PERSON SERVICE JSON - PERSON:" + JSON.stringify(person)
    );
    console.log("@@@ =>>> UPDATE PERSON SERVICE STARTS - FILES:" + files);

    try {
      // Form Data
      const formData = new FormData();

      // upload files
      files.map((file) => {
        formData.append("documents", file);
      });

      // deleted files
      let deletedFiles = "";
      person.deletedFiles.map((file) => {
        //deletedFiles += "," + file.name;
        formData.append("deletedFiles", file.name);
      });

      //formData.append("deletedFiles", deletedFiles.substring(1));

      // person formdata
      formData.append("firstname", person.firstname);
      formData.append("lastname", person.lastname);
      formData.append("gender", person.gender);
      formData.append("birthdate", person.birthdate);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      let res = await axios({
        method: "post", //put
        url: http.BASE_URL + "/api/person/multipart/" + person.id,
        headers: { "content-type": "multipart/form-data" },
        data: formData,
      });

      return res;
    } catch (error) {
      console.log("UPDATE PERSON ERROR:" + error.message);

      throw error;
    } finally {
      console.log("DONE UPDATE PERSON WITH FILES ");
    }
  }

  /**
   * DELETE PERSON
   * RETURN: res
   * @param {*}
   */
  async deletePerson(id) {
    console.log("@@@ =>>> DELETE PERSON SERVICE STARTS - URL:" + http.BASE_URL);

    try {
      let res = await axios.delete(http.BASE_URL + "/api/person/" + id);
      return res;
    } catch (error) {
      console.log("DELETE PERSON ERROR:" + error.message);
      throw error;
    }
  }

  async getDocs(id) {
    console.log("GET DOCS SERVICE STARTS - URL:" + http.BASE_URL);

    try {
      let res = await axios.get(http.BASE_URL + "/api/docs/" + id);
      return res;
    } catch (error) {
      console.log("Get DOCS ERROR:" + error.message);
      throw error;
    }
  }

  /**
   *
   * GET PERSON
   * RETURN: json data
   * @param {*} url
   */
  async getPeople() {
    console.log("GET PEOPLE SERVICE STARTS - URL:" + http.BASE_URL);

    try {
      let res = await axios.get(http.BASE_URL + "/api/people");
      return res;
    } catch (error) {
      console.log("Get PEOPLE ERROR:" + error.message);
      throw error;
    }
  }

  /**
   *
   * GET PERSON
   * RETURN: json data
   * @param {*} url
   */
  async getPersonById(id) {
    console.log(
      "GET PERSON BY ID SERVICE STARTS - URL:" + http.BASE_URL + " | id:" + id
    );

    try {
      let res = await axios.get(http.BASE_URL + "/api/person/" + id);
      return res;
    } catch (error) {
      console.log("Get ERSON BY ID ERROR:" + error.message);
      throw error;
    }
  }
}

export default PeopleService;

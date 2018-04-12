import axios from "axios";

export default {
  saveEmail: (data) => {
    return axios.post("/nonauth/saving/email", data)
    .then(res => {
      return res;
    }).catch(err => {
      return err;
    });
  }
};


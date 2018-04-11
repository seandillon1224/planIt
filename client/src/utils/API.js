import axios from "axios";

export default {
  saveEmail: (data) => {
    return axios.post("/api/saving/email", data)
    .then(res => {
      return res;
    }).catch(err => {
      return err;
    });
  }
};


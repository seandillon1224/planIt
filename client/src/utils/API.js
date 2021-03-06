import axios from "axios";

export default {
  saveEmail: (data) => {
    return axios.post("/nonauth/saving/email", data)
    .then(res => {
      return res;
    }).catch(err => {
      return err;
    });
  },
  
// Export an object with a "search" method that searches the Giphy API for the passed query

getGuestEvents: (id)=> {
  return axios.get("/api/guests/" + id)
},
// Gets user list
getUserEvents: (id) => {
  return axios.get("/api/events/" + id);
},
deleteGuest: (id) => {
  return axios.delete("/api/guests/" + id)
},

getUsers: function() {
  return axios.get("/api/users/");
},
getEvents: function() {
  return axios.get("/api/events/");
},
// Deletes the book with the given id
deleteEvents: function(id) {
  return axios.delete("/api/events/" + id);
},
// Saves a book to the database
saveEvent: function(eventData) {
  return axios.post("/api/events", eventData);
},
getNewEvents: function() {
  return axios.get("/api/events")
}

};


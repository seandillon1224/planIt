var api_key = 'key-818b154a2b5584c231dfd3e6f1e3ba0e';
var domain = 'sandbox60f3b1c5653340f6b3edf7e67a935db0.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

// Connect to Mongo
    const MongoClient = require('mongodb').MongoClient; 
    const assert = require('assert');
    
    // Connection URL
    const url = 'mongodb://localhost:27017';
    
    // Database Name
    const dbName = 'planIt';
    
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    
    const db = client.db(dbName);
    
    client.close();
});

// end of mongo connect
 


//distict should find all the values for a specified field arross a single collection
// the db names are just placeholders 
var emailList = db.planIt.distinct("emails");
var emailSubject = db.planIt.distinct("subject");
var emailEventName = db.planIt.distinct("eventname"); 
var emailDetails = db.planIt.distinct("details")

// Make the email details into a string. 
// Because I am expecting it to be an object
emailDetails = JSON.stringify(emailDetails);
    console.log(emailDetails);


// make a mongo request to get the 'subject'
    //make a get request in a function and run the func in the object
    // set function to a variable
// make an object with the event details and use stringify to add it?


var data = {
  from: 'Excited User <adimanohar93@gmail.com>',
  // loop to run through each email in an event
  to: emailList,
  // Use props to create a subject
  subject: ('Hello' + emailsubject + 'You have been invited to' + emailEventName + '!' ),
  text: emaildetails,
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
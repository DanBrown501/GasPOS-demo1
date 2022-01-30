const path = require("path");
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const public = path.join(__dirname, "client", "dist");
app.use(express.static(public));
app.use(bodyParser.json());

// api call to verify against Alloy
app.post("/api/onboard", (req, res) => {
  function output(data) {
    if (data.hasOwnProperty("summary")) { //check if the call was succesful 
      res.send(JSON.stringify({ result: data.summary.outcome }))
    } else {
      res.send(JSON.stringify({ result: "ERROR" }))
    }
  }
  let result = JSON.stringify({
    name_first: req.body.name_first,
    name_last: req.body.name_last,
    email_address: req.body.email_address,
    birth_date: req.body.birth_date,
    address_line_1: req.body.address_line_1,
    address_line_2: req.body.address_line_2,
    address_city: req.body.address_city, address_state: req.body.address_state,
    document_ssn: req.body.document_ssn, phone_number: req.body.phone_number, address_postal_code: req.body.address_postal_code, address_country_code: "US"
  })
  if (req.body.address_line_2 != '') {
    delete result.address_line_2;
  }

  fetch("https://sandbox.alloy.co/v1/evaluations", {
    method: "POST",
    headers: {
      Authorization: "Basic " + new Buffer(process.env.WorkflowToken + ':' + process.env.WorkflowSecret).toString('base64'),
      "Content-Type": "application/json"
    },
    body: result,
  }).then(res => res.json()).then(data => output(data))

});
// set react app as entry point
app.get("*", (req, res) => {
  res.sendFile(path.join(public, "index.html"));
});
const PORT = process.env.PORT || 3000
app.listen(
  PORT,
  '0.0.0.0',
  function () {
    console.log("Server started.......");
  }
);

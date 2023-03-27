//jshint esversion:6
//This specific code won't work here because of the api key but I received a new one and the newsletter it's live at https://newsletter-signup-page.glitch.me/


const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
    apiKey: "e997063030805e2c9fa83ffbfede1de5-us13",
    server: "us13"
});

app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const listId = "de09735788";

    const subscriberData = {
        firstName: firstName,
        lastName: lastName,
        email: email
    }

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscriberData.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscriberData.firstName,
                LNAME: subscriberData.lastName
            }
        });
        res.sendFile(__dirname + "/succes.html")
        console.log(
            `Successfully created an audience. The audience id is ${response.id}.`
        );
        
    }
      run();
    run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure", function (req, res) {
    res.redirect("/");
})

//The code below this is for running locally the server, this is for running it on Glitch
app.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);

//app.listen(3000, function (req, res) {
   // console.log("Server is running on port 3000.")
//});


//API Key
//e997063030805e2c9fa83ffbfede1de5-us13

//list id
////de09735788

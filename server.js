const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
app.use(cors());
app.get("/api/sendRSVP", function (req, res) {
    var apiKeyAnDomain = require('./config/api_key_and_domain')();
    var mailgun = require('mailgun-js')(apiKeyAnDomain);
    var emails = require('./config/emails');
    var guestName = req.query.guestName;
    var numOfAdditionalGuests = req.query.numOfAdditionalGuests;
    var data = {
        from: `${emails.senderName} <${emails.sender}>`,
        to: emails.recipient,
        subject: `${guestName} has RSVP'd for your wedding.`,
        text: `Get excited! ${guestName} is bringing ${numOfAdditionalGuests} guest to your wedding!`
    };
    mailgun.messages().send(data, function (error, body) {
        if (error) {
            res.send(error);
        } else {
            res.send(body);
        }
    });
})

app.get('/', (req, res) => {
    console.log("Welcome to Tu Lynn Wedding!");
});


app.listen(port, () => {
    console.log('server listening on port ' + port);
});

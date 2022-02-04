"use strict";

// -----------------
// Dependencies
// -----------------

const nodemailer = require("nodemailer"),
    express = require('express'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    path = require('path');

const app = express();

// -----------------
// Middleware
// -----------------

app.use('/public', express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// -----------------
// Routes
// -----------------

app.get('/', (req, res) => {
    res.render('contact');
});

app.post('/send', (req, res) => {
    const output = `
    <h2>New Contact Request</h2>
    <h3>Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    // -----------------
    // Nodemailer
    // -----------------

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // Write your valid original gmail ID and password
            user: '<EMAIL>@gmail.com',
            pass: '<PASSWORD>'
        },
        rejectUnauthorized: false
    });

    let info = transporter.sendMail({
        from: '"Robot Emailer" <username@gmail.com>',
        to: "spiyush.0212@gmail.com",
        subject: "Subject of Email",
        html: output,
    });

    console.log("Message sent");

    res.render('contact', { msg: 'Email sent successfully!' });
})

// -----------------
// Port
// -----------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server started at PORT ' + PORT);
});
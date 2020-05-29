const functions = require('firebase-functions');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');


const app = express();
dotenv.config();
const config = functions.config();
const USERNAME = config.user.name;
const PASSWORD = config.pass.word;

// const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// app.listen(port, () => {
//     console.log(`The app is listening on ${port}`);
// });

app.post('/email', (req, res) => {
    const { email, subject, name, message } = req.body;
    const transporter = nodemailer.createTransport({
        host: 'mail.valuableantiquecollections.com',
        port: 465,
        auth: {
            // configure your own credentials here 
            user: USERNAME,
            pass: PASSWORD,
        }
    });

    const mailOptions = {
        from: email,
        to: 'info@valuableantiquecollections.com',
        subject: subject,
        html: `<h1>${name}</h1>
        <p>${message}</p>`
    };

    transporter.sendMail(mailOptions,
        (error, response) => {
            if (error) {
                res.status(400).send({ error })
            } else {
                res.status(200).send({ message: `Message received, we'll get back to you` })
            }
            transporter.close();
        });

});

exports.vcoinsMail = functions.https.onRequest(app);

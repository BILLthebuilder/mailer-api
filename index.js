const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const Joi = require('@hapi/joi');
const schema = require('./validations.js');

const app = express();
dotenv.config();

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
    console.log(`The app is listening on ${port}`);
});

// app.get('/', (req, res) => {
//     res.json({ message: 'welcome to mailer-api' })
// })
app.post('/email', (req, res) => {
    // const { error } = Joi.validate(req.body, schema);
    // if (error) {
    //     return res.status(400).json({
    //         error: error.details[0].message
    //     });
    // }
    const {email,subject,name,message} = req.body;
    const transporter = nodemailer.createTransport({
        host: 'mail.valuableantiquecollections.com',
        port: 465,
        auth: {
            // configure your own mailtrap credentials or any other smtp host you would like to use
            user: process.env.USERNAME,
            pass: process.env.PASSWORD,
        }
    });

    const mailOptions = {
        from: email,
        to: 'admin@mailer.com',
        subject: subject,
        html: `<p>${name}</p>
          <p>${email}</p>
          <p>${message}</p>`
    };

    transporter.sendMail(mailOptions,
        (error, response) => {
            if (error) {
                res.send({ error })
            } else {
                res.send({ message: `Message received, we'll get back to you` })
            }
            transporter.close();
        });

});

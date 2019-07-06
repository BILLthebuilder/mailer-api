const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const Joi = require('@hapi/joi');
const schema = require('./validations.js');

const app = express();

const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
    console.log(`The app is listening on ${port}`);
});

app.post('/email', (req, res) => {
    const data = req.body;
    // Joi.validate(data, schema, { abortEarly: false })
    //     .then(validatedRes => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '3e1e214eb19222',
            pass: '89107021c50090'
        }
    });

    const mailOptions = {
        from: data.email,
        to: 'admin@mailer.com',
        subject: 'A Test email message',
        html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.message}</p>`
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
    // })
    // .catch(validationError => {
    //     const errorMessage = validationError.details[0].message
    //     return res.status(400).send({
    //         status: 400,
    //         error: errorMessage
    //     });
    // })

});

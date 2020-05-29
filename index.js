const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');


const app = express();
dotenv.config();

// const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// app.listen(port, () => {
//     console.log(`The app is listening on ${port}`);
// });

app.post('/email', (req, res) => {
    const {email,subject,name,message} = req.body;
    const transporter = nodemailer.createTransport({
        host: 'mail.valuableantiquecollections.com',
        port: 465,
        auth: {
            // configure your own credentials here 
            user: process.env.USERNAME,
            pass: process.env.PASSWORD,
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
                res.send({ error })
            } else {
                res.send({ message: `Message received, we'll get back to you` })
            }
            transporter.close();
        });

});


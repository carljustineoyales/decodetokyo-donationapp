const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const path = require('path');
const axios = require('axios');
const app = express();



app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/form',(req,res)=> {
  //NODEMAILER TO SEND EMAILS
  nodemailer.createTestAccount((err,account)=>{
    const htmlEmail = `
      <h3>Contact Details</h3>
      <ul>
      <li>Name: ${req.body.name}</li>
      <li>Link: ${req.body.fb}</li>
      </ul>
      <p>${req.body.message}</p>
    `

    let transporter = nodemailer.createTransport({
      host:'smtp.ethereal.email',
      port:587,
      auth:{
        user:'joey76@ethereal.email',
        pass:'ugDvFjR5CpxPA58q2R'
      }
    })

    let mailOptions = {
      from:`${req.body.email}`,
      to:'joey76@ethereal.email',
      replyTo:'test@testaccount.com',
      subject:'New Message',
      text:req.body.message,
      html:htmlEmail
    }

    transporter.sendMail(mailOptions, (err,info)=>{
      if(err){
        return console.log(err)
      }

      console.log('Message sent: %s',info.message);
      console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
    })
  })
});

const port = process.env.PORT || 5000;


app.listen(port, () =>{console.log(`Server Started on port ${port}`)}) 
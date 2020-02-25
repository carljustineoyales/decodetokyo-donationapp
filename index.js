const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const path = require('path');
const axios = require('axios');
const  cookieParser = require('cookie-parser');
const jwtDecoder = require('jwt-decode');
const app = express();

let decoded = '';
let token = '';
const strapi = 'http://localhost:1337'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


//Nodemailer Custom Send mail
//Fix this!!!
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

//Logout
app.post('/logout',(req,res)=>{
  res.clearCookie('access_token')
  res.status(200).send('logged out')
});

//Login
app.use('/auth/login', async (req,res,next)=>{
  const data ={
    identifier:'',
    password:'',
  };
  let error = '';
  
  
  data.identifier = req.body.identifier
  data.password = req.body.password
  

  await axios.post(`http://localhost:1337/auth/local`,data)
    .then(response=>{
      token = response.data.jwt
      return token
    })
    .catch(err=>{
      error = err.response.data.message[0].messages;
      return error
    })
  

    decoded = jwtDecoder(token)
    

  if(error){
    res.status(400).send(error)
  }else{
    res.cookie('access_token',token,{
      httpOnly:true
    })
    res.status(200).json(decoded.id)
  }
  return decoded
}); 

//Users TABLE
app.use('/getusers', (req,res)=>{
  axios({
    url:`${strapi}/users`,
    method:'get',
    withCredentials:true
  })
    .then(response=>{
      
      res.status(200).send(response.data)
    })
    .catch(err=>{
      console.log(err)
      
    })
})

//Campaign TABLE
app.use('/getusercampaign',(req,res)=>{
  
  axios({
    url:`${strapi}/campaigns/?username=${req.body.username}`,
    method:'get',
    withCredentials:true
  })
  .then(response=>{res.status(200).send(response.data)})
  .catch(err=>{console.log(err.response)})
})

app.use('/getcampaign',(req,res)=>{
  
  // axios.get(`${strapi}/campaigns?verified=false&deleted=false`)
  axios({
    url:`${strapi}/campaigns`,
    method:'get',
    params:{
      verified:false,
      deleted:false
    },
    withCredentials:true
  })
  .then(response=>{
    // console.log(response.data)
    res.status(200).send(response.data)
  })
  .catch(err=>{console.log(err.response)})
})


//Deleted TABLE
app.use('/getdeletedcampaign',(req,res)=>{
  
  // axios.get(`${strapi}/campaigns?verified=false&deleted=false`)
  axios({
    url:`${strapi}/campaigns`,
    method:'get',
    params:{
      deleted:true
    },
    withCredentials:true
  })
  .then(response=>{
    // console.log(response.data)
    res.status(200).send(response.data)
  })
  .catch(err=>{console.log(err.response)})
})

//Supporter TABLE
app.use('/getsupporters',(req,res)=>{
  
  // axios.get(`${strapi}/campaigns?verified=false&deleted=false`)
  axios({
    url:`${strapi}/supporters`,
    method:'get',
    withCredentials:true
  })
  .then(response=>{
    
    res.status(200).send(response.data)
  })
  .catch(err=>{console.log(err.response)})
})

//FIX THIS!!!!
app.use('/deletesupporters', (req,res)=>{
  console.log(req.query.id)
  axios.delete(`${strapi}/supporters/${req.query.id}`)
  // axios({
  //   url:`${strapi}/supporters/?id=${req.query.id}`,
  //   method:'delete',
  //   withCredentials:true
  // })
  .then(response=>{
    
    res.status(200).send(response.data)
  })
  .catch(err=>{
    console.log(err)
  })
})


//Home
app.use('/',(req,res)=>{
    const token = req.cookies
    
    
    if(token !== undefined){
      decoded = jwtDecoder(token.access_token)
      res.status(200).send(decoded)
    }
})





const port = process.env.PORT || 5000;


app.listen(port, () =>{console.log(`Server Started on port ${port}`)}) 
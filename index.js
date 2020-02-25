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
});
app.use('/getusercampaign',(req,res)=>{
  
  axios({
    url:`${strapi}/campaigns/?username=${req.body.username}`,
    method:'get',
    withCredentials:true
  })
  .then(response=>{res.status(200).send(response.data)})
  .catch(err=>{console.log(err.response)})
});

//Incoming TABLE
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
});
app.use('/approvecampaign',(req,res)=>{
  
  axios({
    url:`${strapi}/campaigns/${req.body.id}`,
    method:'put',
    withCredentials:true,
    data:{
      verified:req.body.verified
    }
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{console.log(err.response)})
});
app.use('/declinecampaign',(req,res)=>{
  axios({
    url:`${strapi}/campaigns/${req.body.id}`,
    method:'put',
    withCredentials:true,
    data:{
      deleted:req.body.deleted
    }
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{console.log(err.response)})
});



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
});
app.use('/restorecampaign',(req,res)=>{
  axios({
    url:`${strapi}/campaigns/${req.body.id}`,
    method:'put',
    withCredentials:true,
    data:{
      deleted:req.body.deleted
    }
  })
  .then(response=>{console.log(response.data)})
  .catch(err=>{console.log(err.data)})
});
app.use('/destroycampaign',(req,res)=>{
  axios({
    url:`${strapi}/campaigns/${req.body.id}`,
    method:'delete',
    withCredentials:true
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{console.log(err.response)})
});



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
});
app.use('/deletesupporters', (req,res)=>{
  console.log(req.query.id)
  // axios.delete(`${strapi}/supporters/${req.query.id}`)
  axios({
    url:`${strapi}/supporters/${req.query.id}`,
    method:'delete',
    withCredentials:true
  })
  .then(response=>{
    
    res.status(200).send(response.data)
  })
  .catch(err=>{
    console.log(err)
  })
});


//Checkout Table
app.use('/getcheckoutrequest',(req,res)=>{
  axios({
    url:`${strapi}/checkout-requests`,
    method:'get',
    withCredentials:true
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{console.log(err.response)})
});
app.use('/declinecheckout',(req,res)=>{
  axios({
    url:`${strapi}/campaigns/${req.body.id}`,
    method:'put',
    data:{
      requested:req.body.requested
    },
    withCredentials:true
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{console.log(err.response)})
});
//ADD APPROVE CHECKOUT
app.use('/approvecheckout',(req,res)=>{
  console.log(req)
});

//Single Campaign
app.use('/getsinglecampaign',(req,res)=>{
  axios({
    url:`${strapi}/campaigns/${req.body.id}`,
    method:'get',
    withCredentials:true,
    
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{console.log(err)})
});
app.use('/savesinglecampaign', (req,res)=>{
  axios({
    url:`${strapi}/campaigns/${req.body.id}`,
    method:'put',
    withCredentials:true,
    data:{
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      verified: req.body.verified
    }
  })
  .then(response=>{console.log(response.data)})
  .catch(err=>{console.log(err.response)})
});
app.use('/deletesinglecampaign',(req,res)=>{
  axios({
    url:`${strapi}/campaigns/${req.body.id}`,
    method:'put',
    withCredentials:true,
    data:{
      verified: req.body.verified,
      deleted: req.body.deleted
  }
})
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{console.log(err)})
});


//Profile Page
app.use('/getuserprofile',(req,res)=>{
  axios({
    url:`${strapi}/users/?username=${req.body.username}`,
    method:'get',
    withCredentials:true
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{console.log(err.response)})
});

//Edit Profile Page
app.use('/editprofile',(req,res)=>{
  axios({
    url:`${strapi}/users/?username=${req.body.username}`,
    method:'get',
    withCredentials:true
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{console.log(err.response)})
});
//Think of a way for the save method

//Donation Page
app.use('/supporters', async (req,res)=>{
  
  await axios({
    url:`${strapi}/supporters`,
    method:'post',
    withCredentials:true,
    data:{
      name:req.body.name,
      payerID:req.body.payerID,
      orderID:req.body.orderID,
      donation:req.body.donation,
      email:req.body.email,
      campaigns:req.body.campaigns,
    }
  })
  .then(response=>{res.status(200).send(response.data)})
  .catch(err=>{return err.response})
});
app.use('/updatecampaign', async (req,res)=>{
  await axios({
    url:`${strapi}/campaigns/${req.body.id}`,
    method:'put',
    data:{
      raised:req.body.raised
    },
    withCredentials:true
  })
  .then(response=>{res.status(200).send(response.data)})
  .catch(err=>{return err.response})
})


//Home
app.use('/',(req,res)=>{
    const token = req.cookies
    
    
    if(token !== undefined){
      decoded = jwtDecoder(token.access_token)
      res.status(200).send(decoded)
    }
});





const port = process.env.PORT || 5000;


app.listen(port, () =>{console.log(`Server Started on port ${port}`)}) 
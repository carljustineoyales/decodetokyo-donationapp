const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const path = require('path');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const  cookieParser = require('cookie-parser');
const jwtDecoder = require('jwt-decode');
const validator = require('validator');
const app = express();

let decoded = '';
let token = '';
// const strapi = 'https://limitless-brushlands-81295.herokuapp.com'
const strapi = 'http://localhost:1337'
app.use(express.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


/**
 * 
 * 
 * Nodemailer test custom mail
 * 
 */
/**
 * change real email
 */
app.post('/api/form',(req,res)=> {
  //NODEMAILER TO SEND EMAILS
  console.log(req.body)
  let error = [];
  let emptyName = validator.isEmpty(req.body.name);
  let emptyEmail = validator.isEmpty(req.body.email);
  let invalidEmail = validator.isEmail(req.body.email);
  let emptyMessage = validator.isEmpty(req.body.message);

  // if(emptyName){
  //   error.push('Empty Name')
  // }
  if(emptyEmail){
    error.push('Empty Email')
  }else if(!invalidEmail){
    error.push('Invalid Email')
  }
  if(emptyMessage){
    error.push('Empty Message')
  }

  if(error.length <= 0){
    nodemailer.createTestAccount((err,account)=>{
      const htmlEmail = `
        <h3>Contact Details</h3>
        <ul>
        
        <li>Facebook or Email: ${req.body.email}</li>
        </ul>
        <p>${req.body.message}</p>
      `
  
      let transporter = nodemailer.createTransport({
        host:'smtp.ethereal.email',
        port:587,
        auth:{
          user:'brandt99@ethereal.email',
          pass:'1juUTawmPHVeSAWjM8'
        }
      })
  
      let mailOptions = {
        from:`${req.body.email}`,
        to:'brandt99@ethereal.email',
        replyTo:'brandt99@ethereal.email',
        subject:'New Message',
        text:req.body.message,
        html:htmlEmail
      }
  
      transporter.sendMail(mailOptions, (err,info)=>{
        if(err){
          return console.log(err)
        }
  
        // console.log('Message sent: %s',info.message);
        res.status(200).send('Message Sent')
        console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
      })
    })
  }else{
    res.status(400).send(error)
  }
  
});



/**
 * 
 * 
 * Logout Function
 * 
 */
app.post('/logout',(req,res)=>{
  res.clearCookie('access_token')
  res.status(200).send('logged out')
});



/**
 * 
 * 
 * Login Function
 * 
 */
//CLEAN THIS
app.use('/auth/login', async (req,res,next)=>{
  const data ={
    identifier:req.body.identifier,
    password:req.body.password,
  };
  let error = '';
  
  
  // data.identifier = req.body.identifier
  // data.password = req.body.password
  

  await axios.post(`${strapi}/auth/local`,data)
    .then(response=>{
      token = response.data.jwt
      decoded = jwtDecoder(token)
    res.cookie('access_token',token,{
      httpOnly:true
    })
    res.status(200).json(decoded.id)
    })
    .catch(err=>{
      error = err.response.data;
      console.log('error',error)
      res.status(400).send(error)
      // return error
    })
  
  return decoded
}); 

/**
 * 
 * 
 * Users List  Table
 * 
 */
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
      res.send(err.response)
      
    })
});
app.use('/getusercampaign',(req,res)=>{
  
  axios({
    url:`${strapi}/campaigns/?username=${req.body.username}`,
    method:'get',
    withCredentials:true
  })
  .then(response=>{res.status(200).send(response.data)})
  .catch(err=>{res.send(err.response)})
});

/**
 * 
 * 
 * Incoming Table
 * 
 */
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
  .catch(err=>{res.send(err.response)})
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
  .catch(err=>{res.send(err.response)})
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
  .catch(err=>{res.send(err.response)})
});

/**
 * 
 * Deleted Table
 * 
 */
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
  .catch(err=>{res.send(err.response)})
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
  .catch(err=>{res.send(err.response)})
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
  .catch(err=>{res.send(err.response)})
});



/**
 * 
 * 
 * Supporter Table
 * 
 */
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
  .catch(err=>{res.send(err.response)})
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
    res.send(err.response)
  })
});


/**
 * 
 * Checkout Table
 * 
 */
app.use('/getcheckoutrequest',(req,res)=>{
  axios({
    url:`${strapi}/checkout-requests`,
    method:'get',
    withCredentials:true
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{res.send(err.response)})
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
  .catch(err=>{res.send(err.response)})
});
//ADD APPROVE CHECKOUT
app.use('/approvecheckout',(req,res)=>{
  console.log(req)
});

/**
 * 
 * Single Page Campaign
 * 
 */

app.use('/getsinglecampaign',(req,res)=>{
  axios({
    url:`${strapi}/campaigns/${req.body.id}`,
    method:'get',
    withCredentials:true,
    
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{res.send(err.response)})
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
  .then(response=>{res.status(200).send(response.data)})
  .catch(err=>{res.send(err.response)})
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
  .catch(err=>{res.send(err.response)})
});

/**
 * 
 * Profile Page
 * 
 */
app.use('/getuserprofile',(req,res)=>{
  axios({
    url:`${strapi}/users/?username=${req.body.username}`,
    method:'get',
    withCredentials:true
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{res.send(err.response)})
});

/**
 * 
 * Edit Profile Page
 * 
 */

app.use('/editprofile',(req,res)=>{
  axios({
    url:`${strapi}/users/?username=${req.body.username}`,
    method:'get',
    withCredentials:true
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{res.send(err.response)})
});
//Think of a way for the save method

/*
 * 
 * Donation Page
 * 
 */
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
  .catch(err=>{res.send(err.response)})
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
  .catch(err=>{res.send(err.response)})
});


/**
 * 
 * 
 * Password Reset
 * 
 */
app.use('/resetpassword',(req,res)=>{
  axios({
    url:`${strapi}/auth/reset-password`,
    method:'post',
    data:{
      code:req.body.code,
      password:req.body.password,
      passwordConfirmation:req.body.passwordConfirmation
    }
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{
    res.send(err.response)
  })
});


/**
 * 
 * 
 * Create Campaign
 * 
 */
//FIX THIS from file:CreateCampaign.js
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
});
let upload = multer({ storage: storage }).single('file')

app.use('/createcampaign',  (req,res)=>{
  
  

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err)
        return res.status(500).json(err)
    } else if (err) {
      console.log(err)
        return res.status(500).json(err)
    }
    const bodyFormData = new FormData();
    const body = JSON.parse(req.body.data.toString())
    
    const data ={
      title:body.title,
      description:body.description,
      author:{
        id:body.author.id
      },
      reference:body.reference,
      goal:body.goal,
      verified:body.verified,
      deleted:body.deleted,
      requested:body.requested,
      raised:body.raised,
      username:body.username,
      currency:body.currency
    }
    
    bodyFormData.append('files.image', fs.createReadStream(req.file.path), req.file.filename);
    bodyFormData.append('data', JSON.stringify(data));
    console.log(bodyFormData)
    
    axios({
        url:`${strapi}/campaigns`,
        method:'post',
        data:bodyFormData,
        withCredentials:true,
        
      })
      .then(response=>{
        // console.log(response.data)
        return res.status(200).send(response.data)
      })
      .catch(err=>{
        res.status(400).send(err)
      })
  })
  
  
  //   bodyFormData.append('data', JSON.stringify(data));
  // console.log(bodyFormData)
  // axios({
  //   url:`${strapi}/campaigns`,
  //   method:'post',
  //   data:bodyFormData,
  //   withCredentials:true,
  //   // config: { headers: bodyFormData.getHeaders() }
  // })
  // .then(response=>{
  //   console.log(response.data)
  //   // return res.status(200).send(response.data)
  // })
  // .catch(err=>{
  //   res.status(400).send(err)
  // })
})

/**
 * 
 * Reset Password
 * 
 */
app.use('/changepassword', (req,res)=>{
  
  axios({
    url:`${strapi}/auth/forgot-password`,
    method:'post',
    data:{
      email:req.body.email,
      url:`${strapi}/reset-password`
    }
  })
  .then(response=>{
    res.status(200).send(response.data)
  })
  .catch(err=>{res.send(err.response)})
})

/**
 * 
 * 
 * Register User
 * 
 */
app.use('/registeruser',(req,res)=>{
  console.log(req.body)
  let error = [];
  let emptyEmail = validator.isEmpty(req.body.email)
  let invalidEmail = validator.isEmail(req.body.email)
  let emptyUsername = validator.isEmpty(req.body.username)
  let emptyPassword = validator.isEmpty(req.body.password)
  // let emptyCountry = validator.isEmpty(req.body.country)
 
  if(emptyEmail && emptyUsername){
    error.push('Empty Email.')
  } else if(!invalidEmail){
    error.push('Invalid Email.')
  }

  // if(req.body.country === 'Philippines'){
  //   let emptyGcash = validator.isEmpty(req.body.gcash_number)
  //   if(emptyGcash){
  //     error.push('Empty Gcash.')
  //   }
  // }else{
  //   let emptyPaypal = validator.isEmpty(req.body.paypal_email)
  //   if(emptyPaypal){
  //     error.push('Empty Paypal.')
  //   }
  // }
  
  if(emptyPassword){
    error.push('Empty Password.')
  }
  
  // if(emptyCountry){
  //   error.push('Empty Country.')
  // }
  if(error.length <= 0){
    axios({
        url:`${strapi}/users`,
        method:'post',
        data:req.body
      })
      .then(response=>{
        axios({
          url:`${strapi}/auth/send-email-confirmation`,
          method:'post',
          data:{
            email:req.body.email
          }
        })
        .then(response=>{res.status(200).send(response.data)})
        .catch(err=>{console.log(err)})
      })
      .catch(err=>{
        console.log(err.response.data.message)
        res.status(400).send(err.response.data.message)
      })
  }else{
    res.status(400).send(error)
  }
  
  // axios.post(`${strapi}/users`, data)
  //axios.post(`${strapi}/auth/send-email-confirmation`,{email:this.state.email})
  // 
})

/**
 * 
 * 
 * Resend Email Verification
 * 
 */

app.use('/resendverification',(req,res)=>{
  axios({
    url:`${strapi}/auth/send-email-confirmation`,
    method:'post',
    data:{
      email:req.body.email
    }
  })
  .then(response=>{res.status(200).send(response.data)})
  .catch(err=>{
    console.log(err.response.data)
    if(err.response.data.statusCode === 500){
      res.status(500).send(err.response.data)
    }else if (err.response.data.statusCode === 400){
      res.status(400).send(err.response.data)
    }
  
  })
})


/**
 * 
 * Personal Info
 * 
 */
app.use('/finishsignup',(req,res)=>{
  console.log(req.body)
  let error = [];
  let emptyFirstName = validator.isEmpty(req.body.first_name);
  let emptyLastName = validator.isEmpty(req.body.last_name);
  let emptyAddress = validator.isEmpty(req.body.address);
  let emptyCity = validator.isEmpty(req.body.city);
  let emptyZipCode = validator.isEmpty(req.body.zipcode);
  if(emptyFirstName){
    error.push('empty First Name')
  }
  if(emptyLastName){
    error.push('empty Last Name')
  }
  if(emptyAddress){
    error.push('empty address')
  }
  if(emptyCity){
    error.push('empty city')
  }
  if(emptyZipCode){
    error.push('empty zipcode')
  }
  if(error.length <= 0){
axios({
    url:`${strapi}/users/${ req.body.id }`,
    method:'put',
    data:{
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
    city: req.body.city,
    zipcode: req.body.zipcode,
    bank_account: req.body.bank_account,
    bank_name: req.body.bank_name,
    
    address_state:req.body.addressState,
paypal_email:req.body.paypal_email,
gcash_number:req.body.gcash_number,
account_name:req.body.account_name,
    done: req.body.done
    }
  })
  .then(response=>{res.status(200).send(response.data)})
  .catch(err=>{res.status(400).send(err.response)})
  }else{
    res.status(400).send(error)
  }
  
})

/**
 * 
 * 
 * Cardlist Context
 * 
 */
app.use('/getcards',(req,res)=>{
  axios({
    url:`${strapi}/campaigns?verified=true&requested=false`,
    method:'get'
  })
  .then(response=>{res.send(response.data)})
  .catch(err=>{
    
    res.send(err.response)
  })
})
/**
 * 
 * Logged In Context
 * 
 */

app.use('/getlogin',(req,res)=>{
  //`${strapi}/users/${data}`
  axios({
    url:`${strapi}/users/${req.body.id}`,
    method:'get'
  })
  .then(response=>{res.send(response.data)})
  .catch(err=>{res.send(err.response)})
})



/**
 * 
 * Home Page 
 * 
 * 
 */

app.use('/',(req,res)=>{
    const token = req.cookies
    
    
    if(token !== undefined){
      decoded = jwtDecoder(token.access_token)
      res.status(200).send(decoded)
    }
});





const port = process.env.PORT || 5000;


app.listen(port, () =>{console.log(`Server Started on port ${port}`)}) 
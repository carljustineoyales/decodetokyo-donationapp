import express from 'express';
import axios from 'axios';
import path from 'path';
// import fs from 'fs';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
const __dirname = path.resolve();
// import App from './client/src/App'

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, './client/public')));

//production mode
if(process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, './client/build'))); 
  //  
  app.get('*', (req, res) => {    
    res.sendfile(path.join(__dirname = './client/build/index.html'));  
  })
}
app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'./client/public/index.html'));})

app.get('/name',(req,res) => {
  const data = {
    username:'test',
    age:5
  };
  res.json(data);
});

app.post('/pay',(req,res) => {
  console.log('Body:',req.body);
  res.json({
    msg:'request recieved',
    request:req.body
  });
  

  const {first_name,last_name,email,amount,donation_ref,anonymous,campaign} = req.body.props.data;

  const data = {
    name:first_name + ' ' +last_name,
    email:email,
    donation:amount,
    donation_ref:donation_ref,
    anonymous:anonymous,
    campaigns:{
      id:campaign
    }
  }
  axios.post('https://limitless-brushlands-81295.herokuapp.com/supporters',data
  )
  .then(res=>{
    console.log(data);
    console.log(res.data);
  })
  .catch(err=>{
    console.log(`Error: ${err.response.data.message}`);
  })

});

app.listen(port, () =>{console.log(`Server Started on port ${port}`)}) 
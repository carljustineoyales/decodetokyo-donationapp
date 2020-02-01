import path from 'path'
import fs from 'fs'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import App from '../src/App'

const PORT = 8080
const app = express()

// const router = express.Router()

app.use('^/$', (req,res,next)=>{
  fs.readFile(path.resolve('./build/index.html'),'utf-8',(err,data)=> {
    if(err){
      console.log(err)
      return res.status(500).send("Some error happened")
    }
    return res.send(data.replace('<div id="root"></div>',`<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`))
  })
})

app.use(express.static(path.resolve(__dirname,'..','build')))

app.listen(PORT, () =>{console.log(`Server Started on port ${PORT}`)})

// import express from 'express';
// import axios from 'axios';
// import path from 'path';
// import fs from 'fs';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// const __dirname = path.resolve();
// import App from '../App'

// const app = express();
// const port = process.env.PORT || 5000;


// app.use(express.static(path.join(__dirname, '/client/public')));

// //production mode
// if(process.env.NODE_ENV === 'production') {  
//   app.use(express.static(path.join(__dirname, '/client/build'))); 
//   //  
//   app.get('*', (req, res) => {    
//     res.sendfile(path.join(__dirname = '/client/build/index.html'));  
//   })
// }
// app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})

// app.get('/name',(req,res) => {
//   const data = {
//     username:'test',
//     age:5
//   };
//   res.json(data);
// });

// app.post('/pay',(req,res) => {
//   console.log('Body:',req.body);
//   res.json({
//     msg:'request recieved',
//     request:req.body
//   });
  

//   const {first_name,last_name,email,amount,donation_ref,anonymous,campaign} = req.body.props.data;

//   const data = {
//     name:first_name + ' ' +last_name,
//     email:email,
//     donation:amount,
//     donation_ref:donation_ref,
//     anonymous:anonymous,
//     campaigns:{
//       id:campaign
//     }
//   }
//   axios.post('https://limitless-brushlands-81295.herokuapp.com/supporters',data
//   )
//   .then(res=>{
//     console.log(data);
//     console.log(res.data);
//   })
//   .catch(err=>{
//     console.log(`Error: ${err.response.data.message}`);
//   })

// });

// app.listen(port, () =>{console.log(`Server Started on port ${port}`)}) 
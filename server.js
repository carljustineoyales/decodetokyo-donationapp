const express = require('express');
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

const port = process.env.PORT || 5000;
app.get('/name',(req,res) => {
  const data = {
    username:'test',
    age:5
  };
  res.json(data);
});

app.post('/pay',(req,res) => {
  console.log('hey');
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
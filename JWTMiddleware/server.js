const express = require('express');
const fs = require("fs"); 

const users = require('./data.mock');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwtService = require('./jwt');
const axios = require("axios");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Login user via username and password
 */
app.post('/login', function (req, res) {
  const loginData = req.body;

  if (!loginData || !loginData.username || !loginData.username) {
    return res.status(400).send('Please enter valid data!');
  }

  const user = users.find(user => user.username === loginData.username);

  if (!user) {
    return res.status(400).send('Username or password is wrong!');
  }

  if (user && user.password !== loginData.password) {
    return res.status(400).send('Username or password is wrong!');
  }

  const payload = {
    id : user.id,
    email: user.email,
    username: user.username,
    role:user.role
  };

  const accessToken = jwtService.getAccessToken(payload);
 // const refreshToken = jwtService.getRefreshToken(payload);

  res.send({
    user,
    accessToken,
 //   refreshToken
  });
});


app.post('/register', function (req, res) {
  console.log('inside register');
  const loginData = req.body;
  users.push({
    first_name: loginData.firstName,
       last_name: loginData.lastName,
       username:loginData.username,
      password: loginData.password,
       role: loginData.type  
  });

  let final ="users ="+JSON.stringify(users)+"\n\r module.exports=users";
fs.writeFile("data.mock.js",final, err => { 
	
	// Checking for errors 
	if (err)  return res.status(400).send('Registration not sucess!'); 

	console.log("Done writing"); // Success 
}); 
  const user = users.find(user => user.username === loginData.username);

  if (!user) {
    return res.status(400).send('Registration not sucess!');
  }

  return res.status(201).send('Registration  sucess!');
});



/**
 * Get job list for current user
 */
app.get('/cpu', jwtMiddleware, function (req, res) {
  try{
    axios.get("http://localhost:8777/")
           .then((data) => res.send(data.data))
           .catch(err => res.send(err));
 }
 catch(err){
    console.error("error", err);
 }
});

app.get('/hw', jwtMiddleware, function (req, res) {
  try{
    axios.get("http://localhost:8888/")
           .then((data) => res.json(data.data))
           .catch(err => res.send(err));
 }
 catch(err){
    console.error("GG", err);
 }
});
app.get('/tree', jwtMiddleware, function (req, res) {
  try{
    axios.get("http://localhost:8885/")
           .then((data) => res.send(data))
           .catch(err => res.send(err));
 }
 catch(err){
    console.error("GG", err);
 }
});

app.get('/fileContent', jwtMiddleware, function (req, res) {
  console.log('inside get file content ')
  try{
    axios.get("http://localhost:8098/")
           .then((data) => res.json(data.data))
           .catch(err => res.send(err));
 }
 catch(err){
    console.error("GG", err);
 }
});

app.post('/writeFile', jwtMiddleware, function (req, res) {
  try{
    axios.post("http://localhost:8098/edit/",{'data':req.body.data})
           .then((data) => res.json(data.data))
           .catch(err => res.send(err));
 }
 catch(err){
    console.error("GG", err);
 }
});

app.post('/executeCommand', jwtMiddleware, function (req, res) {
  console.log('inside execute command')
  try{
    axios.post("http://localhost:8095/executeCommand",{'data':req.body.data})
           .then((data) => res.json(data.data))
           .catch(err => res.send(err));
 }
 catch(err){
    console.error("GG", err);
 }
});

/**
 * Get current user data
 */
app.get('/current-user', jwtMiddleware, function (req, res) {
  const currentUser = users.find(user => user.id === req.user.id);

  res.send(currentUser);
});

app.post('/refresh-token', function (req, res) {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(403).send('Access is forbidden');
  }

  try {
    const newTokens = jwtService.refreshToken(refreshToken, res);

    res.send(newTokens);
  } catch (err) {
    const message = (err && err.message) || err;
    res.status(403).send(message);
  }
});

app.listen(8000, function () {
  console.log('Server listening on port 8000!');
});

function jwtMiddleware(req, res, next) {
  // get token from headers object
  const token = req.get('Authorization');
  // check token
  if (!token) {
    return res.status(401).send('Token is invalid');
  }

  jwtService.verifyJWTToken(token)
    .then(user => {
      // put user's information to req object
      req.user = user;
      // call next to finish this middleware function
      next();
    }).catch(err => {
    res.status(401).send(err);
  });
}

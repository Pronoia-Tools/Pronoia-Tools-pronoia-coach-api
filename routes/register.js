const express = require('express');
const register = express.Router();
const Users = require('../models/user');
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");



register.get('/', async function(req, res, next) {
  await Users.findAll()
  .then(user => {
    res.json(user);
  })
  .catch(err => console.log(err))
})

/* register.get('/add', async function(req,res) {
  await Users.create({
    firstname: "Pepito",
    lastname: "Giovenco",
    email: "pepito@gmail.com",
    password: "pepito123",
    country: "Suiza",
  })
  .then(user => res.redirect('/'))
  .catch(err => console.log(err))
}) */

/* Post Register. */
register.post('/', async function(req, res, next) {
  let body = req.body;
  let { firstname, lastname, email, password, country } = body;
  const auth = getAuth();
  const userPass = []
  await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    userPass.push(user.providerData[0].uid) 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage)
    // ..
  });
  await Users.create({
    id:userPass[0],
    firstname,
    lastname,
    email,
    password,
    country, 
  })
  .then(user =>{
    res.status(200).json({
      "Created At":user.dataValues.createdAt,
      "id":userPass[0],
    })
  })
  .catch(err => console.log(err)) 
  
})

module.exports = register;
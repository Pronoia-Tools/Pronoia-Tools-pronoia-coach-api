/** Node Modules */
const httpStatus = require('http-status');
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");


/** Custom Modules */
const admin = require('../config/firebaseAdmin').firebase_admin_connect();
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

/** Schemas */
const User = require('../models/user');

const register = catchAsync(async (req, res) => {
  let body = req.body;
  let { firstname, lastname, email, password, country } = body;

  const userPass = [];
  await admin.auth().createUser({
    email: email,
    password: password,
    displayName: firstname + ' ' + lastname,
    disabled: false,
  }).then((userCredential) => {
    // Signed in
    userPass.push(userCredential.providerData[0].uid) 
    userPass.push(userCredential.uid)
  })
  .catch((error) => {
    if (error.code === "auth/email-already-in-use") {
      code = httpStatus.BAD_REQUEST;
      message = error.message;
    } else if (error.code === "auth/invalid-email"){
      code = httpStatus.BAD_REQUEST;
      message = error.message;
    } else if (error.code === "auth/operation-not-allowed") {
      code = httpStatus.FORBIDDEN;
      message = error.message;
    } else if (error.code === "auth/weak-password") {
      code = httpStatus.BAD_REQUEST;
      message = error.message;
    } else {
      code = httpStatus.INTERNAL_SERVER_ERROR;
      message = error.message;
    }
    throw new ApiError(code, error.message);
  });
  
  await User.create({
    id: userPass[0],
    uuid: userPass[1],
    firstname,
    lastname,
    email,
    country, 
  })
  .then((user) => {
    res.status(httpStatus.OK).json({
      "Created At": user.dataValues.createdAt,
      id: userPass[0],
    });
  })
  .catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  let token = '';
  await signInWithEmailAndPassword(getAuth(), email, password)
  .then((userCredential) => {
    token = userCredential.user.accessToken
  })
  .catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  if(token === '') throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not retrieve token.');

  User.getTableName()
  let user = await User.findByPk(email).catch((error) => {throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error)});
  
  if(user === null) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not retrieve user data.');

  user = pick(user.dataValues, ['firstname', 'lastname', 'email', 'country'])
  res.status(httpStatus.OK).json({
    user: user,
    token, token
  });
});

// const logout = catchAsync(async (req, res) => {
//   await authService.logout(req.body.refreshToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const refreshTokens = catchAsync(async (req, res) => {
//   const tokens = await authService.refreshAuth(req.body.refreshToken);
//   res.send({ ...tokens });
// });

// const forgotPassword = catchAsync(async (req, res) => {
//   const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
//   await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const resetPassword = catchAsync(async (req, res) => {
//   await authService.resetPassword(req.query.token, req.body.password);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const sendVerificationEmail = catchAsync(async (req, res) => {
//   const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
//   await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const verifyEmail = catchAsync(async (req, res) => {
//   await authService.verifyEmail(req.query.token);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  register,
  login,
  // logout,
  // refreshTokens,
  // forgotPassword,
  // resetPassword,
  // sendVerificationEmail,
  // verifyEmail,
};